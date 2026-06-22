document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cart-items-container");

  // Читаем данные, которые нам передала страница меню через память браузера
  const savedBasket = JSON.parse(localStorage.getItem('currentOrderBasket')) || {};
  const catalog = JSON.parse(localStorage.getItem('menuCatalogData')) || [];

  let hasItems = false;
  let htmlContent = "";
  let totalPrice = 0;

  // Бежим по сохраненной корзине и ищем совпадения в каталоге товаров
  for (const id in savedBasket) {
    const count = savedBasket[id];
    
    // Выводим только те позиции, где количество больше 0
    if (count > 0) {
      const itemData = catalog.find(product => product.id == id);
      
      if (itemData) {
        hasItems = true;
        const cost = count * parseFloat(itemData.price);
        totalPrice += cost;

        // Формируем красивую строчку: Название x Количество = Сумма
        htmlContent += `
          <div class="basket-item-row">
            <span>${itemData.title} (x${count})</span>
            <strong>${cost} ₽</strong>
          </div>
        `;
      }
    }
  }

  // Если пользователь хоть что-то выбрал — заменяем надпись "Список блюд" на реальный список
  if (hasItems) {
    // Выравниваем контент сверху вниз, убирая центрирование по центру
    container.style.justifyContent = "flex-start";
    container.style.alignItems = "stretch";
    
    // Добавляем к списку строку финального итога в самом низу
    htmlContent += `
      <div class="basket-item-row" style="margin-top: auto; border-top: 2px solid #000000; border-bottom: none; font-weight: bold; padding-top: 10px;">
        <span>ИТОГО К ОПЛАТЕ:</span>
        <span>${totalPrice} ₽</span>
      </div>
    `;
    
    container.innerHTML = htmlContent;
  } else {
    container.innerHTML = "Список блюд пуст";
  }
});
