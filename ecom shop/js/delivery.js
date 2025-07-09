document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const deliverySection = document.getElementById('delivery-section');
  const langSwitch = document.getElementById('lang-switch');
  const currencySwitch = document.getElementById('currency-switch');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');

  // Cart helpers
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = count;
  }

  // Render delivery form
  function renderDelivery() {
    const lang = window.currentLang || 'en';
    let formHtml = `<form class="delivery-form" id="delivery-form">
      <div class="delivery-title">${lang === 'ar' ? 'معلومات التوصيل' : 'Delivery Information'}</div>
      <label class="delivery-label">${lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
      <input class="delivery-input" type="text" required>
      <label class="delivery-label">${lang === 'ar' ? 'العنوان' : 'Address'}</label>
      <input class="delivery-input" type="text" required>
      <label class="delivery-label">${lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
      <input class="delivery-input" type="tel" required>
      <label class="delivery-label">${lang === 'ar' ? 'طريقة التوصيل' : 'Delivery Method'}</label>
      <div class="delivery-radio-group">
        <label class="delivery-radio-label"><input class="delivery-radio" type="radio" name="delivery" value="standard" checked> ${lang === 'ar' ? 'عادي' : 'Standard'}</label>
        <label class="delivery-radio-label"><input class="delivery-radio" type="radio" name="delivery" value="express"> ${lang === 'ar' ? 'سريع' : 'Express'}</label>
      </div>
      <button class="delivery-submit-btn" type="submit">${lang === 'ar' ? 'تأكيد التوصيل' : 'Submit Delivery'}</button>
    </form>`;
    deliverySection.innerHTML = formHtml;

    // Form submit
    const form = document.getElementById('delivery-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        showToast(lang === 'ar' ? 'تم إرسال معلومات التوصيل! (وهمي)' : 'Delivery info submitted! (dummy)');
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
      renderDelivery();
      if (langSwitch) {
        langSwitch.innerHTML = `<span role="img" aria-label="Language">🌐</span> ${newLang === 'en' ? 'AR' : 'EN'}`;
      }
    });
  }
  if (currencySwitch) {
    currencySwitch.addEventListener('click', () => {
      isLYD = !isLYD;
      window.isLYD = isLYD;
      // No currency on this page, but keep button updated
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
  renderDelivery();
  updateCartCount();
}); 