document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const contactSection = document.getElementById('contact-section');
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

  // Contact content
  const contactContent = {
    en: {
      title: 'Contact Us',
      formTitle: 'Send us a Message',
      infoTitle: 'Get in Touch',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message'
      },
      info: {
        address: {
          title: 'Address',
          text: 'Ajdabiya, Libya<br>Intelat Street, Opposite the Flame'
        },
        phone: {
          title: 'Phone',
          text: '+218 21 123 4567<br>+218 91 987 6543'
        },
        email: {
          title: 'Email',
          text: 'info@bluephone.ly<br>support@bluephone.ly'
        },
        hours: {
          title: 'Business Hours',
          text: 'Sunday - Thursday: 9:00 AM - 6:00 PM<br>Friday - Saturday: 10:00 AM - 4:00 PM'
        }
      }
    },
    ar: {
      title: 'اتصل بنا',
      formTitle: 'أرسل لنا رسالة',
      infoTitle: 'تواصل معنا',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'رسالتك',
        submit: 'إرسال الرسالة'
      },
      info: {
        address: {
          title: 'العنوان',
          text: 'أجدابيا, ليبيا<br> شارع انتلات ، مقابل الشعلة'
        },
        phone: {
          title: 'الهاتف',
          text: '+218 21 123 4567<br>+218 91 987 6543'
        },
        email: {
          title: 'البريد الإلكتروني',
          text: 'info@bluephone.ly<br>support@bluephone.ly'
        },
        hours: {
          title: 'ساعات العمل',
          text: 'الأحد - الخميس: 9:00 ص - 6:00 م<br>الجمعة - السبت: 10:00 ص - 4:00 م'
        }
      }
    }
  };

  // Render contact page
  function renderContact() {
    const lang = window.currentLang || 'en';
    const content = contactContent[lang];
    
    let html = `<div class="contact-title">${content.title}</div>
      <div class="contact-content">
        <div class="contact-form">
          <div class="contact-form-title">${content.formTitle}</div>
          <form id="contact-form">
            <label class="contact-label">${content.form.name}</label>
            <input class="contact-input" type="text" required>
            <label class="contact-label">${content.form.email}</label>
            <input class="contact-input" type="email" required>
            <label class="contact-label">${content.form.subject}</label>
            <input class="contact-input" type="text" required>
            <label class="contact-label">${content.form.message}</label>
            <textarea class="contact-textarea" required></textarea>
            <button class="contact-submit-btn" type="submit">${content.form.submit}</button>
          </form>
        </div>
        <div class="contact-info">
          <div class="contact-info-title">${content.infoTitle}</div>
          <div class="contact-info-item">
            <div class="contact-info-icon">📍</div>
            <div class="contact-info-text">
              <h4>${content.info.address.title}</h4>
              <p>${content.info.address.text}</p>
            </div>
          </div>
          <div class="contact-info-item">
            <div class="contact-info-icon">📞</div>
            <div class="contact-info-text">
              <h4>${content.info.phone.title}</h4>
              <p>${content.info.phone.text}</p>
            </div>
          </div>
          <div class="contact-info-item">
            <div class="contact-info-icon">✉️</div>
            <div class="contact-info-text">
              <h4>${content.info.email.title}</h4>
              <p>${content.info.email.text}</p>
            </div>
          </div>
          <div class="contact-info-item">
            <div class="contact-info-icon">🕒</div>
            <div class="contact-info-text">
              <h4>${content.info.hours.title}</h4>
              <p>${content.info.hours.text}</p>
            </div>
          </div>
        </div>
      </div>`;
    
    contactSection.innerHTML = html;

    // Form submit
    const form = document.getElementById('contact-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        showToast(lang === 'ar' ? 'تم إرسال رسالتك! سنتواصل معك قريباً.' : 'Message sent! We\'ll get back to you soon.');
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
    }, 3000);
  }

  // Add language/currency switcher logic (independent)
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = (window.currentLang === 'en') ? 'ar' : 'en';
      window.currentLang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      renderContact();
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
  renderContact();
  updateCartCount();
}); 