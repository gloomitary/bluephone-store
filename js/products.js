const products = [
  {
    id: 1,
    name: {en: 'iPhone 14 Pro', ar: 'آيفون 14 برو'},
    price: 999,
    image: 'https://images.vodafone.co.uk/gbnnsauqav4t/3JH2vIlXYNhs1mMPQPPVSn/707ad01b9dc5a6ff11eae332d1790f34/Apple_iPhone_14_Pro_space_black-full-product-front-600.png',
    category: 'Phones',
    featured: true
  },
  {
    id: 2,
    name: {en: 'Samsung Galaxy S23', ar: 'سامسونج جالاكسي S23'},
    price: 899,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMYLRN-DnR-wWc5DSvOJZThq4dX8hGi6zSg&s',
    category: 'Phones',
    featured: true
  },
  {
    id: 3,
    name: {en: 'Sony WH-1000XM5', ar: 'سوني WH-1000XM5'},
    price: 349,
    image: 'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/styles/xxlarge/public/2022-05/Featured%20Image%20Sony%20WH%201000%20XM5.jpg',
    category: 'Audio',
    featured: true
  },
  {
    id: 4,
    name: {en: 'Anker Power Bank 20000mAh', ar: 'باور بانك أنكر 20000mAh'},
    price: 59,
    image: 'https://anker.ph/cdn/shop/files/A1336011-AnkerPrime20_000mAh_200w_1800x.webp?v=1700626257',
    category: 'Power Banks',
    featured: true
  },
  {
    id: 5,
    name: {en: 'HP Pavilion 15', ar: 'اتش بي بافيليون 15'},
    price: 699,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJGEzSabGFhJx_4zss2Me_labkBBoCYZWT5FFvXppCTbvE0Iq2Ut_aZkLUrGOLsXPnKc&usqp=CAU',
    category: 'Laptops',
    featured: false
  },
  {
    id: 6,
    name: {en: 'Baseus USB-C Cable', ar: 'كابل Baseus USB-C'},
    price: 12,
    image: 'https://eu.baseus.com/cdn/shop/products/Baseus_USB-C_Fast_Charging_Cable_240W_1.jpg?v=1702974187&width=1024',
    category: 'Cables',
    featured: false
  }
];

const moreProducts = [
  {
    id: 7,
    name: {en: 'Apple AirPods Pro', ar: 'آبل إيربودز برو'},
    price: 249,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836',
    category: 'Audio',
    featured: true
  },
  {
    id: 8,
    name: {en: 'Logitech MX Master 3 Mouse', ar: 'ماوس لوجيتك MX Master 3'},
    price: 99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1oJTwbw1OjMypX0aXGMxiUA9Q5P9Zy3oPXw&s',
    category: 'Accessories',
    featured: false
  },
  {
    id: 9,
    name: {en: 'Dell XPS 13', ar: 'ديل XPS 13'},
    price: 1099,
    image: 'https://media.wired.com/photos/60f72daa3b922f01a2083b7e/1:1/w_1226,h_1226,c_limit/Gear-Dell-XPS-13-2021.jpg',
    category: 'Laptops',
    featured: true
  },
  {
    id: 10,
    name: {en: 'Samsung 25W Fast Charger', ar: 'شاحن سامسونج سريع 25 واط'},
    price: 29,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuspKXsS2KP2OOpE-bRndx7ALfI8PNi2AB_w&s',
    category: 'Chargers',
    featured: false
  },
  {
    id: 11,
    name: {en: 'Xiaomi Mi Band 7', ar: 'شاومي مي باند 7'},
    price: 45,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2MpF4Iv6JObkrLcLdH0x2cfFPOSoqXVSOSQ&s',
    category: 'Accessories',
    featured: true
  },
  {
    id: 12,
    name: {en: 'JBL Flip 6 Speaker', ar: 'سماعة JBL Flip 6'},
    price: 119,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54msFPIF8e7yiiaN8AC7quhkFwCNMY5SWSg&s',
    category: 'Audio',
    featured: false
  },
  {
    id: 13,
    name: {en: 'Anker PowerLine+ USB-C Cable', ar: 'كابل أنكر PowerLine+ USB-C'},
    price: 18,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScxcPZDA8nkdmZQ1_A-oUYPMRhjM-77Qz0AA&s',
    category: 'Cables',
    featured: false
  },
  {
    id: 14,
    name: {en: 'Lenovo ThinkPad E15', ar: 'لينوفو ثينك باد E15'},
    price: 799,
    image: 'https://p1-ofp.static.pub//fes/cms/2024/04/01/lm4114h5ruktizudg7dzbr4l61x5ss770948.png',
    category: 'Laptops',
    featured: false
  },
  {
    id: 15,
    name: {en: 'Huawei FreeBuds 4i', ar: 'هواوي فري بودز 4i'},
    price: 89,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZsaE23IUebdZHaxfsNSqCktaDyQaA7v4JQ&s',
    category: 'Audio',
    featured: false
  },
  {
    id: 16,
    name: {en: 'Baseus Car Charger', ar: 'شاحن سيارة Baseus'},
    price: 25,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4L5wVLo5LssZ60j5q0aLfvCW5q2wqpjZoA&s',
    category: 'Chargers',
    featured: false
  }
];
products.push(...moreProducts);

function renderFeaturedProducts(isLYD = true, lang = 'en', search = '') {
  const featured = products.filter(p => p.featured && p.name[lang].toLowerCase().includes(search.toLowerCase()));
  const grid = document.getElementById('featured-products');
  grid.innerHTML = '';
  featured.forEach(product => {
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

window.updatePrices = function(isLYD, lang = 'en') {
  renderFeaturedProducts(isLYD, lang, document.querySelector('.search-bar input').value);
};

window.filterFeaturedProducts = function(search, isLYD, lang = 'en') {
  renderFeaturedProducts(isLYD, lang, search);
};

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
});

// Floating cart button logic
const cartBtn = document.getElementById('cart-btn');
if (cartBtn) {
  cartBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location.href = 'cart.html';
  });
} 