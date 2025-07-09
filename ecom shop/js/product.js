document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const productDetails = document.getElementById('product-details');
  const langSwitch = document.getElementById('lang-switch');
  const currencySwitch = document.getElementById('currency-switch');

  // Get product id from URL
  function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
  }

  // Find product by id
  function getProductById(id) {
    return products.find(p => p.id === id);
  }

  // Placeholder specs/description
  const descriptions = {
    en: 'A premium smartphone with advanced features, stunning display, and top-tier performance. Perfect for tech enthusiasts.',
    ar: 'هاتف ذكي فاخر بميزات متقدمة، شاشة مذهلة، وأداء عالي. مثالي لعشاق التقنية.'
  };
  const specs = {
    en: [
      '6.1-inch OLED Display',
      'A16 Bionic Chip',
      'Triple 48MP Camera',
      '128GB Storage',
      '5G Support'
    ],
    ar: [
      'شاشة OLED مقاس 6.1 بوصة',
      'معالج A16 Bionic',
      'كاميرا ثلاثية 48 ميجابكسل',
      'سعة تخزين 128 جيجابايت',
      'دعم 5G'
    ]
  };

  function renderRatingsAndComments(productId) {
    const lang = window.currentLang || 'en';
    const section = document.getElementById('ratings-comments-section');
    if (!section) return;
    // Load from localStorage
    const data = JSON.parse(localStorage.getItem('productFeedback') || '{}');
    const feedback = data[productId] || { ratings: [], comments: [] };
    // Average rating
    const avg = feedback.ratings.length ? (feedback.ratings.reduce((a,b)=>a+b,0)/feedback.ratings.length) : 0;
    // Render stars
    function renderStars(rating, clickable, cb) {
      let html = '';
      for (let i=1; i<=5; i++) {
        html += `<span class="star${i<=rating?' filled':''}" data-star="${i}">★</span>`;
      }
      return `<div class="stars"${clickable?' style="cursor:pointer"':''}>${html}</div>`;
    }
    // Comments list
    const commentsHtml = feedback.comments.length ? feedback.comments.map(c => `
      <div class="comment">
        <div class="comment-name">${c.name}</div>
        <div class="comment-text">${c.text}</div>
      </div>
    `).join('') : `<div class="no-comments">${lang==='ar'?'لا توجد تعليقات بعد.':'No comments yet.'}</div>`;
    // Main HTML
    section.innerHTML = `
      <div class="ratings-block">
        <div class="avg-rating">
          <span class="avg-label">${lang==='ar'?'التقييم العام':'Average Rating'}:</span>
          <span class="avg-stars">${renderStars(Math.round(avg), false)}</span>
          <span class="avg-value">${avg?avg.toFixed(1):'-'} / 5</span>
          <span class="ratings-count">(${feedback.ratings.length} ${lang==='ar'?'تقييمات':'ratings'})</span>
        </div>
        <div class="your-rating">
          <span>${lang==='ar'?'قيم هذا المنتج':'Your rating'}:</span>
          <span id="your-stars">${renderStars(0, true)}</span>
        </div>
      </div>
      <div class="comments-block">
        <h3>${lang==='ar'?'التعليقات':'Comments'}</h3>
        <div class="comments-list">${commentsHtml}</div>
        <form id="comment-form">
          <input type="text" id="comment-name" placeholder="${lang==='ar'?'اسمك':'Your Name'}" required>
          <textarea id="comment-text" placeholder="${lang==='ar'?'اكتب تعليقك هنا':'Write your comment here'}" required></textarea>
          <button type="submit">${lang==='ar'?'إرسال':'Submit'}</button>
        </form>
      </div>
    `;
    // Star rating logic
    const yourStars = section.querySelector('#your-stars');
    let selected = 0;
    if (yourStars) {
      yourStars.addEventListener('mouseover', e => {
        if (e.target.classList.contains('star')) {
          const n = +e.target.dataset.star;
          yourStars.querySelectorAll('.star').forEach((s,i)=>{
            s.classList.toggle('filled',i<n);
          });
        }
      });
      yourStars.addEventListener('mouseout', () => {
        yourStars.querySelectorAll('.star').forEach((s,i)=>{
          s.classList.toggle('filled',i<selected);
        });
      });
      yourStars.addEventListener('click', e => {
        if (e.target.classList.contains('star')) {
          selected = +e.target.dataset.star;
          // Save rating
          feedback.ratings.push(selected);
          data[productId] = feedback;
          localStorage.setItem('productFeedback', JSON.stringify(data));
          renderRatingsAndComments(productId);
        }
      });
    }
    // Comment form logic
    const form = section.querySelector('#comment-form');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const name = form.querySelector('#comment-name').value.trim();
        const text = form.querySelector('#comment-text').value.trim();
        if (!name || !text) return;
        feedback.comments.push({ name, text });
        data[productId] = feedback;
        localStorage.setItem('productFeedback', JSON.stringify(data));
        renderRatingsAndComments(productId);
      });
    }
  }

  function renderProduct() {
    const lang = window.currentLang || 'en';
    const id = getProductIdFromUrl();
    let product = getProductById(id);
    if (!product) product = products[0];
    const price = isLYD ? `${(product.price * 7.7).toFixed(0)} LYD` : `$${product.price}`;
    productDetails.innerHTML = `
      <div class="product-details-card">
        <img src="${product.image}" alt="${product.name[lang]}" class="product-details-img">
        <div class="product-details-info">
          <h2 class="product-details-title">${product.name[lang]}</h2>
          <div class="product-details-price">${price}</div>
          <p class="product-details-desc">${descriptions[lang]}</p>
          <ul class="product-details-specs">
            ${specs[lang].map(s => `<li>${s}</li>`).join('')}
          </ul>
          <button class="product-details-add add-to-cart-btn">${lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}</button>
        </div>
      </div>
    `;
    renderRatingsAndComments(product.id);
    // Add to Cart button logic
    const addBtn = productDetails.querySelector('.add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(product.id);
      });
    }
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
    // Update lang/currency switcher labels
    if (langSwitch) {
      langSwitch.innerHTML = `<span role="img" aria-label="Language">🌐</span> ${lang === 'en' ? 'AR' : 'EN'}`;
    }
    if (currencySwitch) {
      currencySwitch.innerHTML = `<span role="img" aria-label="Currency">💱</span> ${isLYD ? 'LYD' : 'USD'}`;
    }
    renderProduct();
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
  if (currencySwitch) {
    currencySwitch.addEventListener('click', () => {
      isLYD = !isLYD;
      window.isLYD = isLYD;
      updateFromGlobal();
    });
  }

  // Initial render
  updateFromGlobal();
}); 