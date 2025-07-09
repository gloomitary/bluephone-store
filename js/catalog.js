document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;
  let selectedCategory = null;

  // Elements
  const catalogTitle = document.getElementById('catalog-title');
  const searchInput = document.getElementById('catalog-search');
  const productsGrid = document.getElementById('catalog-products');
  const categoryFilter = document.getElementById('category-filter');
  const langSwitch = document.getElementById('lang-switch');

  // Category mapping for translation
  const categoryMap = {
    'Phones': 0,
    'Accessories': 1,
    'Laptops': 2,
    'Audio': 3,
    'Power Banks': 4,
    'Chargers': 5,
    'Cables': 6
  };

  // Helper: get unique categories
  function getCategories() {
    const cats = new Set();
    products.forEach(p => cats.add(p.category));
    return Array.from(cats);
  }

  // Helper: get translated category name
  function getCategoryLabel(cat, lang) {
    const idx = categoryMap[cat];
    if (typeof idx === 'number') {
      return translations[lang].categoriesList[idx];
    }
    return cat;
  }

  // Render category filter
  function renderCategoryFilter() {
    categoryFilter.innerHTML = '';
    const lang = window.currentLang || 'en';
    const t = translations[lang];
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn';
    allBtn.textContent = lang === 'ar' ? 'الكل' : 'All';
    allBtn.classList.toggle('active', !selectedCategory);
    allBtn.onclick = () => { selectedCategory = null; renderProducts(); renderCategoryFilter(); };
    categoryFilter.appendChild(allBtn);
    getCategories().forEach((cat) => {
      const btn = document.createElement('button');
      btn.className = 'category-btn';
      btn.textContent = getCategoryLabel(cat, lang);
      btn.classList.toggle('active', selectedCategory === cat);
      btn.onclick = () => { selectedCategory = cat; renderProducts(); renderCategoryFilter(); };
      categoryFilter.appendChild(btn);
    });
  }

  // Render products
  function renderProducts() {
    const lang = window.currentLang || 'en';
    const t = translations[lang];
    let filtered = products.filter(p =>
      (!selectedCategory || p.category === selectedCategory) &&
      p.name[lang].toLowerCase().includes(searchInput.value.toLowerCase())
    );
    productsGrid.innerHTML = '';
    filtered.forEach(product => {
      const price = isLYD ? `${(product.price * 7.7).toFixed(0)} LYD` : `$${product.price}`;
      const card = document.createElement('div');
      card.className = 'product-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name[lang]}">
        <h3>${product.name[lang]}</h3>
        <div class="price">${price}</div>
        <button class="add-to-cart-btn">${lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}</button>
      `;
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
          e.stopPropagation();
          addToCart(product.id);
        } else {
          window.location.href = `product.html?id=${product.id}`;
        }
      });
      productsGrid.appendChild(card);
    });
  }

  // Add to Cart logic
  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === productId);
    if (item) {
      item.qty++;
    } else {
      cart.push({ id: productId, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Added to cart!');
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'show';
    setTimeout(() => {
      toast.className = toast.className.replace('show', '');
    }, 2000);
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
  }

  // Update cart count on load
  updateCartCount();

  // Update UI on language/currency change
  function updateFromGlobal() {
    const lang = window.currentLang || 'en';
    isLYD = window.isLYD;
    catalogTitle.textContent = lang === 'ar' ? 'كتالوج المنتجات' : 'Product Catalog';
    searchInput.placeholder = translations[lang].search;
    renderCategoryFilter();
    renderProducts();
    // Update langSwitch button label
    if (langSwitch) {
      langSwitch.innerHTML = `<span role="img" aria-label="Language">🌐</span> ${lang === 'en' ? 'AR' : 'EN'}`;
    }
  }

  // Add language switcher logic (independent)
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = (window.currentLang === 'en') ? 'ar' : 'en';
      window.currentLang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      updateFromGlobal();
    });
  }

  // Event listeners
  searchInput.addEventListener('input', renderProducts);
  window.updatePrices = updateFromGlobal;

  // Initial render (ensure correct language)
  updateFromGlobal();
});

window.setInitialCategory = function(cat) {
  selectedCategory = cat;
  renderCategoryFilter();
  renderProducts();
}; 