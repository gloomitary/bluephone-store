document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const termsSection = document.getElementById('terms-section');
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

  // Terms content
  const termsContent = {
    en: {
      title: 'Terms & Conditions',
      sections: [
        {
          title: 'Privacy Policy',
          content: 'We respect your privacy and are committed to protecting your personal information. We collect only the information necessary to process your orders and provide customer support.',
          list: [
            'Personal information is used solely for order processing',
            'We do not share your data with third parties',
            'Payment information is encrypted and secure',
            'You can request data deletion at any time'
          ]
        },
        {
          title: 'Shipping Information',
          content: 'We offer reliable shipping services across Libya with tracking and delivery confirmation.',
          list: [
            'Standard delivery: 3-5 business days',
            'Express delivery: 1-2 business days',
            'Free shipping on orders over 500 LYD',
            'Delivery tracking available for all orders'
          ]
        },
        {
          title: 'Returns & Refunds',
          content: 'We want you to be completely satisfied with your purchase. If you\'re not happy, we\'re here to help.',
          list: [
            '30-day return policy for unused items',
            'Full refund or exchange available',
            'Return shipping costs covered by customer',
            'Damaged items replaced free of charge'
          ]
        },
        {
          title: 'Payment Methods',
          content: 'We accept various payment methods to make shopping convenient for our customers.',
          list: [
            'Cash on delivery (COD)',
            'Bank transfer',
            'Credit/debit cards',
            'Mobile payment apps'
          ]
        },
        {
          title: 'Customer Support',
          content: 'Our customer support team is available to help you with any questions or concerns.',
          list: [
            '24/7 online support',
            'Phone support during business hours',
            'Email support with 24-hour response',
            'Live chat available on website'
          ]
        }
      ]
    },
    ar: {
      title: 'الشروط والأحكام',
      sections: [
        {
          title: 'سياسة الخصوصية',
          content: 'نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. نجمع فقط المعلومات الضرورية لمعالجة طلباتك وتقديم الدعم للعملاء.',
          list: [
            'تستخدم المعلومات الشخصية فقط لمعالجة الطلبات',
            'نحن لا نشارك بياناتك مع أطراف ثالثة',
            'معلومات الدفع مشفرة وآمنة',
            'يمكنك طلب حذف البيانات في أي وقت'
          ]
        },
        {
          title: 'معلومات الشحن',
          content: 'نحن نقدم خدمات شحن موثوقة في جميع أنحاء ليبيا مع التتبع وتأكيد التسليم.',
          list: [
            'التوصيل العادي: 3-5 أيام عمل',
            'التوصيل السريع: 1-2 يوم عمل',
            'شحن مجاني للطلبات أكثر من 500 دينار ليبي',
            'تتبع التوصيل متاح لجميع الطلبات'
          ]
        },
        {
          title: 'المرتجعات والاسترداد',
          content: 'نريد أن تكون راضياً تماماً عن مشترياتك. إذا لم تكن سعيداً، نحن هنا للمساعدة.',
          list: [
            'سياسة إرجاع لمدة 30 يوماً للمنتجات غير المستخدمة',
            'استرداد كامل أو استبدال متاح',
            'تكاليف شحن الإرجاع يتحملها العميل',
            'المنتجات التالفة يتم استبدالها مجاناً'
          ]
        },
        {
          title: 'طرق الدفع',
          content: 'نحن نقبل طرق دفع متنوعة لجعل التسوق مريحاً لعملائنا.',
          list: [
            'الدفع عند الاستلام',
            'التحويل البنكي',
            'بطاقات الائتمان/الخصم',
            'تطبيقات الدفع عبر الهاتف'
          ]
        },
        {
          title: 'دعم العملاء',
          content: 'فريق دعم العملاء لدينا متاح لمساعدتك في أي أسئلة أو استفسارات.',
          list: [
            'دعم عبر الإنترنت على مدار الساعة',
            'دعم هاتفي خلال ساعات العمل',
            'دعم عبر البريد الإلكتروني مع رد خلال 24 ساعة',
            'الدردشة المباشرة متاحة على الموقع'
          ]
        }
      ]
    }
  };

  // Render terms content
  function renderTerms() {
    const lang = window.currentLang || 'en';
    const content = termsContent[lang];
    
    let html = `<div class="terms-title">${content.title}</div>
      <div class="terms-content">`;
    
    content.sections.forEach(section => {
      html += `<div class="terms-section-block">
        <div class="terms-section-title">${section.title}</div>
        <div class="terms-text">${section.content}</div>
        <ul class="terms-list">`;
      
      section.list.forEach(item => {
        html += `<li>${item}</li>`;
      });
      
      html += `</ul>
      </div>`;
    });
    
    html += `</div>`;
    termsSection.innerHTML = html;
  }

  // Add language/currency switcher logic (independent)
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = (window.currentLang === 'en') ? 'ar' : 'en';
      window.currentLang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      renderTerms();
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
  renderTerms();
  updateCartCount();
}); 