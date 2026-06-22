document.addEventListener("DOMContentLoaded", () => {
  
  // Проверка авторизации
  const savedLogin = localStorage.getItem('userLogin');
  if (!savedLogin) {
    window.location.href = 'index.html';
    return;
  }

  // Находим элементы страницы
  const addressField = document.getElementById('address-field');
  const mapMock = document.getElementById('map-mock');
  
  const sbpBtn = document.getElementById('sbp-btn');
  const cardBtn = document.getElementById('card-btn');
  
  const sbpOverlay = document.getElementById('sbp-overlay');
  const cardOverlay = document.getElementById('card-overlay');
  
  const closeSbpBtn = document.getElementById('close-sbp-btn');
  const closeCardBtn = document.getElementById('close-card-btn');
  
  const cardNumberInput = document.getElementById('card-number-input');
  const validationMsg = document.getElementById('validation-msg');

  
  mapMock.addEventListener('click', () => {
    addressField.value = "ул. Суслова, д. 4, ресторан 'Васян бар'";
  });

  // 2. ОТКРЫТИЕ ОВЕРЛЕЕВ ПРИ КЛИКЕ НА КНОПКИ ОПЛАТЫ
  
  sbpBtn.addEventListener('click', () => {
    sbpOverlay.classList.remove('id-hidden');
  });

  
  cardBtn.addEventListener('click', () => {
    cardOverlay.classList.remove('id-hidden');
  });

  // 3. ЗАКРЫТИЕ ОВЕРЛЕЕВ (Крестики)
  closeSbpBtn.addEventListener('click', () => {
    sbpOverlay.classList.add('id-hidden');
  });

  closeCardBtn.addEventListener('click', () => {
    cardOverlay.classList.add('id-hidden');
    
    cardNumberInput.value = "";
    validationMsg.textContent = "";
  });

 
  window.addEventListener('click', (e) => {
    if (e.target === sbpOverlay) sbpOverlay.classList.add('id-hidden');
    if (e.target === cardOverlay) cardOverlay.classList.add('id-hidden');
  });

  // 4. АВТОФОРМАТ И МАТЕМАТИЧЕСКАЯ ПРОВЕРКА КАРТЫ (Алгоритм Луна)
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = value.match(/.{1,4}/g);
    e.target.value = formattedValue ? formattedValue.join(' ') : '';

    if (value.length === 0) {
      validationMsg.textContent = "";
      return;
    }

    if (value.length === 16) {
      if (validateCardLuhn(value)) {
        validationMsg.textContent = "✓ Номер карты действителен";
        validationMsg.className = "card-validation-msg msg-valid";
      } else {
        validationMsg.textContent = "✕ Неверный номер карты (ошибка в цифрах)";
        validationMsg.className = "card-validation-msg msg-invalid";
      }
    } else {
      validationMsg.textContent = "Введите 16 цифр...";
      validationMsg.className = "card-validation-msg";
    }
  });

  function validateCardLuhn(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10 === 0);
  }

});
