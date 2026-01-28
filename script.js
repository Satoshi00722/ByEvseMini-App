let cart = [];

/* ===== PAGE SWITCH ===== */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showWelcome() {
  showPage('welcome');
}

/* ===== CATEGORIES ===== */
function renderServices() {
  const box = document.getElementById('services');
  box.innerHTML = `<div class="category-grid"></div>`;
  const grid = box.querySelector('.category-grid');

  CATEGORIES.forEach(cat => {
    const div = document.createElement('div');
    div.className = 'category-card fade-in';
    div.innerHTML = `
      <div class="cat-icon">${cat.icon}</div>
      <div class="cat-title">${cat.name}</div>
    `;
    div.onclick = () => openCategory(cat.id);
    grid.appendChild(div);
  });

  showPage('services');
}

/* ===== OPEN CATEGORY ===== */
function openCategory(catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  const box = document.getElementById('services');

  box.innerHTML = `
    <button class="back-btn" onclick="renderServices()">← Назад</button>
    <h2>${cat.name}</h2>
    <div class="service-grid"></div>
  `;

  const grid = box.querySelector('.service-grid');

  cat.services.forEach(s => {
    grid.innerHTML += `
      <div class="card fade-in">
        ${s.tag ? `<span class="badge">${s.tag}</span>` : ""}
        <img src="${s.img}" alt="${s.name}">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <div class="price">${s.price}</div>

        <button onclick="openDetailByService(${s.id}, '${cat.id}')">
          Подробнее
        </button>
        <button class="order" onclick="quickOrder('${s.name}')">
          Заказать
        </button>
      </div>
    `;
  });

  showPage('services');
}

/* ===== SERVICE DETAIL ===== */
function openDetailByService(serviceId, catId) {
  const cat = CATEGORIES.find(c => c.id === catId);
  const s = cat.services.find(x => x.id === serviceId);
  const d = document.getElementById('detail');

  d.innerHTML = `
    <button class="back-btn" onclick="backToCategory('${catId}')">
      ← Назад
    </button>

    <div class="card fade-in">
      ${s.tag ? `<span class="badge">${s.tag}</span>` : ""}
      <img src="${s.img}" alt="${s.name}">
      <h2>${s.name}</h2>
      <p>${s.full}</p>
      <div class="price">${s.price}</div>

      <button onclick="addToCart('${s.name}')">
        Добавить в корзину
      </button>
      <button class="order" onclick="quickOrder('${s.name}')">
        Заказать
      </button>
    </div>
  `;

  showPage('detail');
}

/* ===== BACK FROM DETAIL ===== */
function backToCategory(catId) {
  openCategory(catId);
}

/* ===== CART ===== */
function addToCart(name) {
  if (!cart.includes(name)) {
    cart.push(name);
    alert("Добавлено в корзину");
  }
  renderCart();
}

function renderCart() {
  const ul = document.getElementById('cartList');
  ul.innerHTML = '';
  cart.forEach(i => ul.innerHTML += `<li>${i}</li>`);
}

/* ===== ORDER ===== */
function order() {
  if (!cart.length) return alert("Корзина пуста");
  quickOrder(cart.join(', '));
}

function quickOrder(serviceName = "") {
  const text = serviceName
    ? `Здравствуйте! Хочу заказать услугу: ${serviceName}`
    : `Здравствуйте! Хочу заказать услугу`;

  const url = `https://t.me/illy228?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

/* ===== CHANNELS ===== */
function renderChannels() {
  const box = document.getElementById('channels');

  box.innerHTML = `
    <h2 class="section-title">Наши каналы</h2>
    <div class="channels-grid"></div>
  `;

  const grid = box.querySelector('.channels-grid');

  CHANNELS.forEach(c => {
    grid.innerHTML += `
      <div class="channel-card fade-in">
        <img src="${c.img}" alt="${c.name}">
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
        <a href="${c.link}" target="_blank">
          <button class="order">Перейти в канал</button>
        </a>
      </div>
    `;
  });

  showPage('channels');
}

