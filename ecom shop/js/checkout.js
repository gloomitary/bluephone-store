document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const checkoutSection = document.getElementById('checkout-section');
  const langSwitch = document.getElementById('lang-switch');
  const currencySwitch = document.getElementById('currency-switch');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');

  // Cart helpers
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function getProductById(id) {
    return products.find(p => p.id === id);
  }
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = count;
  }

  // Render checkout form and summary
  function renderCheckout() {
    const lang = window.currentLang || 'en';
    const cart = getCart();
    let total = 0;
    let summaryHtml = `<div class="checkout-summary">
      <div class="checkout-summary-title">${lang === 'ar' ? 'ملخص السلة' : 'Cart Summary'}</div>
      <div class="checkout-summary-list">`;
    if (cart.length === 0) {
      summaryHtml += `<div class="cart-empty">${lang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty.'}</div>`;
    } else {
      cart.forEach(item => {
        const product = getProductById(item.id);
        if (!product) return;
        const price = isLYD ? (product.price * 7.7) : product.price;
        const subtotal = price * item.qty;
        total += subtotal;
        summaryHtml += `<div class="checkout-summary-item">
          <span>${product.name[lang]} x${item.qty}</span>
          <span>${isLYD ? `${subtotal.toFixed(0)} LYD` : `$${subtotal}`}</span>
        </div>`;
      });
    }
    summaryHtml += `</div>
      <div class="checkout-summary-total">
        <span>${lang === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
        <span>${isLYD ? `${total.toFixed(0)} LYD` : `$${total}`}</span>
      </div>
    </div>`;

    let formHtml = `<form class="checkout-form" id="checkout-form">
      <div class="checkout-title">${lang === 'ar' ? 'معلومات الدفع والتوصيل' : 'Payment & Delivery Info'}</div>
      <label class="checkout-label">${lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
      <input class="checkout-input" type="text" required>
      <label class="checkout-label">${lang === 'ar' ? 'العنوان' : 'Address'}</label>
      <input class="checkout-input" type="text" required>
      <label class="checkout-label">${lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
      <input class="checkout-input" type="tel" required>
      <label class="checkout-label">${lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
      <input class="checkout-input" type="email" required>
      <label class="checkout-label">${lang === 'ar' ? 'رقم البطاقة' : 'Card Number'}</label>
      <input class="checkout-input" type="text" maxlength="19" required>
      <label class="checkout-label">${lang === 'ar' ? 'طريقة التوصيل' : 'Delivery Method'}</label>
      <div class="checkout-radio-group">
        <label class="checkout-radio-label"><input class="checkout-radio" type="radio" name="delivery" value="standard" checked> ${lang === 'ar' ? 'عادي' : 'Standard'}</label>
        <label class="checkout-radio-label"><input class="checkout-radio" type="radio" name="delivery" value="express"> ${lang === 'ar' ? 'سريع' : 'Express'}</label>
      </div>
      <button class="checkout-submit-btn" type="submit">${lang === 'ar' ? 'إتمام الدفع' : 'Proceed to Payment'}</button>
    </form>`;

    checkoutSection.innerHTML = `<div class="checkout-form-col">${formHtml}</div>${summaryHtml}`;

    // Form submit
    const form = document.getElementById('checkout-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        showToast(lang === 'ar' ? 'تم إرسال الطلب! (وهمي)' : 'Order submitted! (dummy)');
        form.reset();
      };
    }
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

  // Add language/currency switcher logic (independent)
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = (window.currentLang === 'en') ? 'ar' : 'en';
      window.currentLang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      renderCheckout();
      if (langSwitch) {
        langSwitch.innerHTML = `<span role="img" aria-label="Language">🌐</span> ${newLang === 'en' ? 'AR' : 'EN'}`;
      }
    });
  }
  if (currencySwitch) {
    currencySwitch.addEventListener('click', () => {
      isLYD = !isLYD;
      window.isLYD = isLYD;
      renderCheckout();
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
  renderCheckout();
  updateCartCount();
}); 