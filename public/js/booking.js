// Ждем полной загрузки страницы, чтобы JS увидел все столы
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Проверка авторизации (уже была у вас ранее)
  const savedLogin = localStorage.getItem('userLogin');
  if (!savedLogin) {
    window.location.href = 'index.html';
    return;
  }

  // 2. Находим элементы нового модального окна бронирования
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingBtn = document.getElementById('close-booking-btn');
  const modalTableTitle = document.getElementById('modal-table-title');
  const modalDateVal = document.getElementById('modal-date-val');
  const modalTimeVal = document.getElementById('modal-time-val');

  // Собираем абсолютно все кликабельные места на карте в один общий список по порядку их появления в HTML
  const allTables = document.querySelectorAll('.seat-pixel, .bar-bottom-tail, .single-table, .big-table');

  // Перебираем каждый столик и вешаем на него событие клика
  allTables.forEach((table, index) => {
    table.addEventListener('click', () => {
      
      // Порядковый номер стола (индексы начинаются с 0, поэтому делаем + 1)
      const tableNumber = index + 1;
      modalTableTitle.textContent = `Стол №${tableNumber}`;

      // Генерируем правильные случайные дату и время
      const result = generateRandomDateTime();
      modalDateVal.textContent = result.date;
      modalTimeVal.textContent = result.time;

      // Показываем окно
      bookingModal.style.display = 'flex';
    });
  });

  // Закрытие окна при клике на белую стрелочку назад
  closeBookingBtn.addEventListener('click', () => {
    bookingModal.style.display = 'none';
  });

  // Функция генерации случайных даты и времени (не менее текущее время + 1 час)
  function generateRandomDateTime() {
    const now = new Date();
    
    // Добавляем к текущему времени минимум 1 час (в миллисекундах)
    const minTimestamp = now.getTime() + (60 * 60 * 1000);
    
    // Добавляем случайное количество дней/часов вперед (например, в пределах следующих 7 дней)
    const maxDaysAhead = 7;
    const maxTimestamp = minTimestamp + (maxDaysAhead * 24 * 60 * 60 * 1000);
    
    // Получаем случайный итоговый момент времени
    const randomTimestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1)) + minTimestamp;
    const randomDate = new Date(randomTimestamp);

    // Форматируем дату (Пример: 15.06.2026)
    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const year = randomDate.getFullYear();
    
    // Форматируем время (Пример: 18:30)
    const hours = String(randomDate.getHours()).padStart(2, '0');
    const minutes = String(randomDate.getMinutes()).padStart(2, '0');

    return {
      date: `${day}.${month}.${year}`,
      time: `${hours}:${minutes}`
    };
  }

});
