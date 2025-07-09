document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const cartSection = document.getElementById('cart-section');
  const langSwitch = document.getElementById('lang-switch');
  const currencySwitch = document.getElementById('currency-switch');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');

  // Cart helpers
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = count;
  }

  // Find product by id
  function getProductById(id) {
    return products.find(p => p.id === id);
  }

  // Render cart
  function renderCart() {
    const lang = window.currentLang || 'en';
    const cart = getCart();
    let total = 0;
    let cartHtml = `<h2 class="cart-title">${lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}</h2>`;
    if (cart.length === 0) {
      cartHtml += `<div class="cart-empty">${lang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty.'}</div>`;
    } else {
      cartHtml += `<div class="cart-list">`;
      cart.forEach(item => {
        const product = getProductById(item.id);
        if (!product) return;
        const price = isLYD ? (product.price * 7.7) : product.price;
        const subtotal = price * item.qty;
        total += subtotal;
        cartHtml += `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name[lang]}" class="cart-item-img">
            <div class="cart-item-info">
              <div class="cart-item-name">${product.name[lang]}</div>
              <div class="cart-item-price">${isLYD ? `${price.toFixed(0)} LYD` : `$${price}`}</div>
              <div class="cart-item-qty">
                <button class="cart-qty-btn" data-action="dec" data-id="${item.id}">-</button>
                <span>${item.qty}</span>
                <button class="cart-qty-btn" data-action="inc" data-id="${item.id}">+</button>
              </div>
              <div class="cart-item-subtotal">${isLYD ? `${subtotal.toFixed(0)} LYD` : `$${subtotal}`}</div>
              <button class="cart-remove-btn" data-id="${item.id}">${lang === 'ar' ? 'حذف' : 'Remove'}</button>
            </div>
          </div>
        `;
      });
      cartHtml += `</div>`;
      cartHtml += `<div class="cart-total-row">
        <span class="cart-total-label">${lang === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
        <span class="cart-total-value">${isLYD ? `${total.toFixed(0)} LYD` : `$${total}`}</span>
      </div>`;
      cartHtml += `<button class="cart-checkout-btn">${lang === 'ar' ? 'إتمام الشراء' : 'Proceed to Checkout'}</button>`;
    }
    cartSection.innerHTML = cartHtml;

    // Add event listeners for qty and remove
    cartSection.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const action = btn.getAttribute('data-action');
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (!item) return;
        if (action === 'inc') item.qty++;
        if (action === 'dec' && item.qty > 1) item.qty--;
        setCart(cart);
        renderCart();
      });
    });
    cartSection.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        let cart = getCart();
        cart = cart.filter(i => i.id !== id);
        setCart(cart);
        renderCart();
      });
    });
    // Checkout button
    const checkoutBtn = cartSection.querySelector('.cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
      });
    }
  }

  // Add language/currency switcher logic (independent)
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = (window.currentLang === 'en') ? 'ar' : 'en';
      window.currentLang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      renderCart();
      if (langSwitch) {
        langSwitch.innerHTML = `<span role="img" aria-label="Language">🌐</span> ${newLang === 'en' ? 'AR' : 'EN'}`;
      }
    });
  }
  if (currencySwitch) {
    currencySwitch.addEventListener('click', () => {
      isLYD = !isLYD;
      window.isLYD = isLYD;
      renderCart();
      if (currencySwitch) {
        currencySwitch.innerHTML = `<span role="img" aria-label="Currency">💱</span> ${isLYD ? 'LYD' : 'USD'}`;
      }
    });
  }

  // Floating cart button links to cart.html
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'cart.html';
    });
  }

  // Initial render
  renderCart();
  updateCartCount();
}); 