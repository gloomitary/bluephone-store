const translations = {
  en: {
    home: 'Home', catalog: 'Catalog', cart: 'Cart', terms: 'Terms',
    contact: 'Contact', faq: 'FAQ',
    welcome: 'Welcome to Blue Phone',
    tagline: 'Your destination for the latest tech gadgets and accessories in Libya!',
    search: 'Search for products...',
    categories: 'Categories',
    featured: 'Featured Products',
    support: 'Support',
    contactSupport: 'Contact Support',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    help: 'How can we help?',
    send: 'Send',
    close: 'Close',
    categoriesList: ['Phones', 'Accessories', 'Laptops', 'Audio', 'Power Banks', 'Chargers', 'Cables']
  },
  ar: {
    home: 'الرئيسية', catalog: 'المنتجات', cart: 'السلة', terms: 'الشروط',
    contact: 'اتصل بنا', faq: 'الأسئلة',
    welcome: 'مرحبًا بكم في بلوفون',
    tagline: 'وجهتك لأحدث الأجهزة والإكسسوارات التقنية في ليبيا!',
    search: '...ابحث عن المنتجات',
    categories: 'الفئات',
    featured: 'منتجات مميزة',
    support: 'الدعم',
    contactSupport: 'تواصل مع الدعم',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    help: 'كيف يمكننا مساعدتك؟',
    send: 'إرسال',
    close: 'إغلاق',
    categoriesList: ['الهواتف', 'إكسسوارات', 'لابتوبات', 'الصوتيات', 'باور بانك', 'شواحن', 'كوابل']
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // --- State ---
  window.isLYD = true;
  let currentLang = 'en';

  // --- Elements ---
  const langSwitch = document.getElementById('lang-switch');
  const currencySwitch = document.getElementById('currency-switch');
  const supportBtn = document.getElementById('support-btn');
  const supportPopup = document.getElementById('support-popup');
  const closeSupport = document.getElementById('close-support');
  const searchInput = document.querySelector('.search-bar input');

  // --- Update UI Functions ---
  function updateLanguage(lang) {
    currentLang = lang;
    window.currentLang = lang;
    const t = translations[lang];
    // Header
    document.querySelector('.nav a[href="index.html"]').textContent = t.home;
    document.querySelector('.nav a[href="catalog.html"]').textContent = t.catalog;
    document.querySelector('.nav a[href="cart.html"]').textContent = t.cart;
    document.querySelector('.nav a[href="terms.html"]').textContent = t.terms;
    document.querySelector('.nav a[href="contact.html"]').textContent = t.contact;
    document.querySelector('.nav a[href="faq.html"]').textContent = t.faq;
    // Hero
    document.querySelector('.hero h1').textContent = t.welcome;
    document.querySelector('.hero p').textContent = t.tagline;
    searchInput.placeholder = t.search;
    // Categories
    document.querySelector('.categories h2').textContent = t.categories;
    document.querySelectorAll('.category-card').forEach((el, i) => {
      el.textContent = t.categoriesList[i];
    });
    // Featured
    document.querySelector('.featured h2').textContent = t.featured;
    // Support
    supportBtn.innerHTML = '<span role="img" aria-label="Support">💬</span> ' + t.support;
    document.querySelector('.support-popup h3').textContent = t.contactSupport;
    document.querySelector('.support-popup input[type="text"]').placeholder = t.yourName;
    document.querySelector('.support-popup input[type="email"]').placeholder = t.yourEmail;
    document.querySelector('.support-popup textarea').placeholder = t.help;
    document.querySelector('.support-popup button[type="submit"]').textContent = t.send;
    closeSupport.textContent = t.close;
    // Direction
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    window.dispatchEvent(new Event('languagechange'));
  }

  function updateSwitchers() {
    langSwitch.innerHTML = `<span role="img" aria-label="Language">🌐</span> ${currentLang === 'en' ? 'AR' : 'EN'}`;
    currencySwitch.innerHTML = `<span role="img" aria-label="Currency">💱</span> ${window.isLYD ? 'LYD' : 'USD'}`;
  }

  // --- Event Listeners ---
  langSwitch.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    updateLanguage(newLang);
    updateSwitchers();
    if (window.updatePrices) window.updatePrices(window.isLYD, newLang);
  });

  currencySwitch.addEventListener('click', () => {
    window.isLYD = !window.isLYD;
    updateSwitchers();
    if (window.updatePrices) window.updatePrices(window.isLYD, currentLang);
  });

  supportBtn.addEventListener('click', (e) => {
    e.preventDefault();
    supportPopup.classList.toggle('active');
  });
  closeSupport.addEventListener('click', () => {
    supportPopup.classList.remove('active');
  });

  // Enable and handle search
  searchInput.disabled = false;
  searchInput.addEventListener('input', (e) => {
    if (window.filterFeaturedProducts) window.filterFeaturedProducts(e.target.value, window.isLYD, currentLang);
  });

  // --- Initial Render ---
  // If on the catalog page and a category is in the URL, set it
  if (window.location.pathname.includes('catalog.html')) {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && window.setInitialCategory) {
      window.setInitialCategory(cat);
    }
  }
  updateLanguage(currentLang);
  updateSwitchers();
  if (window.updatePrices) window.updatePrices(window.isLYD, currentLang);
});

window.filterFeaturedProducts = function (query, isLYD, lang) {
  const grid = document.getElementById('featured-products');
  if (!grid) return;
  query = query.trim().toLowerCase();
  const filtered = products.filter(p => p.featured && p.name[lang].toLowerCase().includes(query));
  grid.innerHTML = '';
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
    grid.appendChild(card);
  });
}; 