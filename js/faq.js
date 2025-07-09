document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = document.documentElement.getAttribute('dir') === 'rtl' ? 'ar' : 'en';
  window.currentLang = currentLang;
  let isLYD = window.isLYD !== undefined ? window.isLYD : true;

  // Elements
  const faqSection = document.getElementById('faq-section');
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

  // FAQ content
  const faqContent = {
    en: {
      title: 'Frequently Asked Questions',
      searchPlaceholder: 'Search questions...',
      searchBtn: '🔍',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'You can place an order by browsing our catalog, adding items to your cart, and proceeding to checkout. We accept various payment methods including cash on delivery, bank transfer, and credit cards.'
        },
        {
          question: 'What are your shipping options?',
          answer: 'We offer standard delivery (3-5 business days) and express delivery (1-2 business days). Free shipping is available on orders over 500 LYD. All orders include tracking information.'
        },
        {
          question: 'Can I return or exchange items?',
          answer: 'Yes, we have a 30-day return policy for unused items in original packaging. You can return items for a full refund or exchange. Return shipping costs are covered by the customer.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash on delivery (COD), bank transfers, credit/debit cards, and mobile payment apps. All online payments are processed securely with encryption.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order is shipped, you will receive a tracking number via email or SMS. You can also track your order status by logging into your account or contacting our customer support.'
        },
        {
          question: 'Do you ship to all cities in Libya?',
          answer: 'Yes, we ship to all major cities and towns across Libya. Delivery times may vary depending on your location. Remote areas may take an additional 1-2 business days.'
        },
        {
          question: 'What if my item arrives damaged?',
          answer: 'If your item arrives damaged, please contact us within 24 hours of delivery. We will arrange for a replacement or refund at no additional cost to you.'
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach our customer support team through phone, email, or live chat on our website. We provide 24/7 online support and respond to all inquiries within 24 hours.'
        }
      ]
    },
    ar: {
      title: 'الأسئلة الشائعة',
      searchPlaceholder: 'البحث في الأسئلة...',
      searchBtn: '🔍',
      questions: [
        {
          question: 'كيف يمكنني تقديم طلب؟',
          answer: 'يمكنك تقديم طلب من خلال تصفح كتالوجنا، إضافة المنتجات إلى سلة التسوق، والمتابعة إلى الدفع. نقبل طرق دفع متنوعة تشمل الدفع عند الاستلام والتحويل البنكي وبطاقات الائتمان.'
        },
        {
          question: 'ما هي خيارات الشحن المتاحة؟',
          answer: 'نقدم التوصيل العادي (3-5 أيام عمل) والتوصيل السريع (1-2 يوم عمل). الشحن المجاني متاح للطلبات أكثر من 500 دينار ليبي. جميع الطلبات تتضمن معلومات التتبع.'
        },
        {
          question: 'هل يمكنني إرجاع أو استبدال المنتجات؟',
          answer: 'نعم، لدينا سياسة إرجاع لمدة 30 يوماً للمنتجات غير المستخدمة في التغليف الأصلي. يمكنك إرجاع المنتجات للحصول على استرداد كامل أو استبدال. تكاليف شحن الإرجاع يتحملها العميل.'
        },
        {
          question: 'ما هي طرق الدفع التي تقبلونها؟',
          answer: 'نقبل الدفع عند الاستلام، التحويلات البنكية، بطاقات الائتمان/الخصم، وتطبيقات الدفع عبر الهاتف. جميع المدفوعات عبر الإنترنت تتم معالجتها بأمان مع التشفير.'
        },
        {
          question: 'كيف يمكنني تتبع طلبي؟',
          answer: 'بمجرد شحن طلبك، ستحصل على رقم تتبع عبر البريد الإلكتروني أو الرسائل النصية. يمكنك أيضاً تتبع حالة طلبك من خلال تسجيل الدخول إلى حسابك أو الاتصال بدعم العملاء.'
        },
        {
          question: 'هل تشحنون إلى جميع المدن في ليبيا؟',
          answer: 'نعم، نشحن إلى جميع المدن والبلدات الرئيسية في ليبيا. أوقات التوصيل قد تختلف حسب موقعك. المناطق النائية قد تستغرق 1-2 يوم عمل إضافي.'
        },
        {
          question: 'ماذا لو وصل منتجي تالفاً؟',
          answer: 'إذا وصل منتجك تالفاً، يرجى الاتصال بنا خلال 24 ساعة من التسليم. سنرتب لاستبدال أو استرداد بدون تكلفة إضافية عليك.'
        },
        {
          question: 'كيف يمكنني الاتصال بدعم العملاء؟',
          answer: 'يمكنك الوصول إلى فريق دعم العملاء عبر الهاتف أو البريد الإلكتروني أو الدردشة المباشرة على موقعنا. نقدم دعم عبر الإنترنت على مدار الساعة ونرد على جميع الاستفسارات خلال 24 ساعة.'
        }
      ]
    }
  };

  // Render FAQ content
  function renderFAQ() {
    const lang = window.currentLang || 'en';
    const content = faqContent[lang];
    
    let html = `<div class="faq-title">${content.title}</div>
      <div class="faq-search">
        <input class="faq-search-input" type="text" placeholder="${content.searchPlaceholder}" id="faq-search">
        <button class="faq-search-btn" id="faq-search-btn">${content.searchBtn}</button>
      </div>
      <div class="faq-content" id="faq-content">`;
    
    content.questions.forEach((item, index) => {
      html += `<div class="faq-item" data-index="${index}">
        <div class="faq-question" onclick="toggleFAQ(${index})">
          <span>${item.question}</span>
          <button class="faq-toggle" id="faq-toggle-${index}">+</button>
        </div>
        <div class="faq-answer" id="faq-answer-${index}">
          ${item.answer}
        </div>
      </div>`;
    });
    
    html += `</div>`;
    faqSection.innerHTML = html;

    // Add search functionality
    const searchInput = document.getElementById('faq-search');
    const searchBtn = document.getElementById('faq-search-btn');
    
    if (searchInput && searchBtn) {
      const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question span').textContent.toLowerCase();
          const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      };
      
      searchInput.addEventListener('input', performSearch);
      searchBtn.addEventListener('click', performSearch);
    }
  }

  // Global function for FAQ toggle
  window.toggleFAQ = function(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const toggle = document.getElementById(`faq-toggle-${index}`);
    
    if (answer.classList.contains('active')) {
      answer.classList.remove('active');
      toggle.classList.remove('active');
      toggle.textContent = '+';
    } else {
      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('active');
      });
      document.querySelectorAll('.faq-toggle').forEach(tog => {
        tog.classList.remove('active');
        tog.textContent = '+';
      });
      
      // Open current answer
      answer.classList.add('active');
      toggle.classList.add('active');
      toggle.textContent = '×';
    }
  };

  // Add language/currency switcher logic (independent)
  if (langSwitch) {
    langSwitch.addEventListener('click', () => {
      const newLang = (window.currentLang === 'en') ? 'ar' : 'en';
      window.currentLang = newLang;
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      renderFAQ();
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
  renderFAQ();
  updateCartCount();
}); 