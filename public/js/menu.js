document.addEventListener("DOMContentLoaded", () => {
  const menuGrid = document.getElementById("menu-grid");
  const cartToggleBtn = document.getElementById("cart-toggle");
  const emptyCartModal = document.getElementById('empty-cart-modal');
  const closeEmptyModal = document.getElementById('close-empty-modal');

  let isOrderMode = false; // Режим страницы: false - Просмотр, true - Заказ
  let serverData = [];     // Все данные из SQL
  
  // Читаем сохраненную корзину из памяти браузера
  let basket = JSON.parse(localStorage.getItem('currentOrderBasket')) || {};

  // 1. УМНАЯ ФУНКЦИЯ ГРУППИРОВКИ И ОТРИСОВКИ МЕНЮ
  function renderGroupedMenu(items) {
    if (!menuGrid) return;
    menuGrid.innerHTML = ""; // Полностью очищаем сетку перед сборкой

    // Шаг А: Группируем элементы из SQL по их категории
    const groupedData = {};
    items.forEach(item => {
      if (!groupedData[item.category]) {
        groupedData[item.category] = [];
      }
      groupedData[item.category].push(item);
    });

    // Шаг Б: Бежим по созданным группам и вставляем их в одну общую сетку
    for (const categoryName in groupedData) {
      
      // Создаем и вставляем крупный текстовый заголовок группы
      // Свойство grid-column заставит его занять всю ширину ряда (все 3 колонки)
      const title = document.createElement("h2");
      title.className = "category-section-title";
      title.textContent = categoryName;
      menuGrid.appendChild(title);

      // Вставляем карточки, которые относятся строго к текущей категории
      groupedData[categoryName].forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card-item";
        
        card.innerHTML = `
          <span class="menu-item-category">${item.category}</span>
          <h3 class="menu-item-title">${item.title}</h3>
          <span class="menu-item-price">${item.price} ₽</span>
        `;

        // Если включен режим заказа — дорисовываем серый пульт счетчика в угол
        if (isOrderMode) {
          const currentCount = basket[item.id] || 0;

          const counterWidget = document.createElement("div");
          counterWidget.className = "card-counter-widget";
          counterWidget.innerHTML = `
            <button class="counter-btn minus-btn" data-id="${item.id}">-</button>
            <span class="counter-value" id="count-${item.id}">${currentCount}</span>
            <button class="counter-btn plus-btn" data-id="${item.id}">+</button>
          `;

          counterWidget.addEventListener('click', (e) => e.stopPropagation());
          card.appendChild(counterWidget);
        }

        menuGrid.appendChild(card);
      });
    }

    // После того как все карточки созданы, активируем клики на плюс и минус
    if (isOrderMode) {
      initCounterButtons();
    }
  }

  // 2. ЛОГИКА КНОПОК ПЛЮС И МИНУС
  function initCounterButtons() {
    document.querySelectorAll(".plus-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        basket[id] = (basket[id] || 0) + 1;
        document.getElementById(`count-${id}`).textContent = basket[id];
        localStorage.setItem('currentOrderBasket', JSON.stringify(basket));
      });
    });

    document.querySelectorAll(".minus-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (basket[id] && basket[id] > 0) {
          basket[id] -= 1;
          document.getElementById(`count-${id}`).textContent = basket[id];
          localStorage.setItem('currentOrderBasket', JSON.stringify(basket));
        }
      });
    });
  }

  // 3. ТУМБЛЕР ПЕРЕКЛЮЧЕНИЯ РЕЖИМОВ СТРАНИЦЫ С ПРОВЕРКОЙ ПУСТОТЫ
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", () => {
      if (isOrderMode) {
        let totalSelectedItems = 0;
        for (const id in basket) {
          totalSelectedItems += basket[id];
        }

        if (totalSelectedItems === 0) {
          if (emptyCartModal) emptyCartModal.classList.remove('id-hidden');
          return; 
        }

        localStorage.setItem('currentOrderBasket', JSON.stringify(basket));
        localStorage.setItem('menuCatalogData', JSON.stringify(serverData));
        
        window.location.href = 'cart.html';
        return; 
      }

      isOrderMode = true;
      cartToggleBtn.textContent = "Создать заказ";
      renderGroupedMenu(serverData); 
    });
  }

  // Закрытие оверлея пустой корзины
  if (closeEmptyModal && emptyCartModal) {
    closeEmptyModal.addEventListener('click', () => { emptyCartModal.classList.add('id-hidden'); });
  }
  window.addEventListener('click', (e) => {
    if (emptyCartModal && e.target === emptyCartModal) { emptyCartModal.classList.add('id-hidden'); }
  });

  // 4. ЗАПРОС К ЛОКАЛЬНОЙ БАЗЕ ДАННЫХ SQL
  fetch('http://localhost:3000/api/menu')
    .then(response => response.json())
    .then(sqlData => {
       serverData = sqlData.map((item, index) => ({ id: item.id || index + 1, ...item }));
       
       const urlParams = new URLSearchParams(window.location.search);
       if (urlParams.get('mode') === 'order') {
         isOrderMode = true;
         cartToggleBtn.textContent = "Создать заказ";
       }

       renderGroupedMenu(serverData); 
    })
    .catch(error => console.error("Ошибка загрузки меню из локальной БД:", error));
});
