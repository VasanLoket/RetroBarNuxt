// Находим элементы на главной странице
const sidebar = document.getElementById('global-sidebar');
const openBtn = document.getElementById('open-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const authModal = document.getElementById('auth-modal');
const profileBtn = document.getElementById('profile-btn');
const closeAuthBtn = document.getElementById('close-auth-btn');
const switchModeLink = document.getElementById('switch-mode-link');
const modalTitle = document.getElementById('modal-title');
const submitBtn = document.getElementById('auth-submit-btn');
const passwordRepeatInput = document.getElementById('auth-password-repeat');
const authForm = document.getElementById('auth-form');
const loginInput = document.getElementById('auth-login');

// Читаем логин из памяти браузера один раз
const savedLogin = localStorage.getItem('userLogin');

// Если пользователь уже входил ранее, сразу подставляем его имя в меню
if (savedLogin && profileBtn) {
  profileBtn.textContent = savedLogin;
}

// Открытие и закрытие зеленого бокового меню
if (openBtn && sidebar) {
  openBtn.addEventListener('click', (event) => {
    sidebar.classList.add('active');
    event.stopPropagation(); 
  });
}

if (closeBtn && sidebar) {
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
}

document.addEventListener('click', (event) => {
  if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(event.target)) {
    sidebar.classList.remove('active');
  }
});

// УМНАЯ КНОПКА ПРОФИЛЯ
if (profileBtn) {
  profileBtn.addEventListener('click', () => {
    const currentLogin = localStorage.getItem('userLogin');
    
    if (!currentLogin) {
      // Если в памяти НЕТ логина — открываем всплывающее окно входа
      if (authModal) authModal.style.display = 'flex';
    } else {
      // Если пользователь УЖЕ вошел — перенаправляем на новую страницу кабинета
      window.location.href = 'account.html';
    }
  });
}

// Закрытие модального окна авторизации
if (closeAuthBtn && authModal) {
  closeAuthBtn.addEventListener('click', () => { 
    authModal.style.display = 'none'; 
  });
}

if (authModal) {
  authModal.addEventListener('click', (event) => {
    if (event.target === authModal) { 
      authModal.style.display = 'none'; 
    }
  });
}

// Переключение Вход / Регистрация внутри всплывающего окна
let isRegistrationMode = false;
if (switchModeLink) {
  switchModeLink.addEventListener('click', () => {
    isRegistrationMode = !isRegistrationMode;
    if (isRegistrationMode) {
      if (modalTitle) modalTitle.textContent = 'Регистрация аккаунта';
      if (submitBtn) submitBtn.textContent = 'зарегистрироваться';
      switchModeLink.textContent = 'Уже есть аккаунт? Войти';
      if (passwordRepeatInput) {
        passwordRepeatInput.classList.remove('hidden');
        passwordRepeatInput.required = true;
      }
    } else {
      if (modalTitle) modalTitle.textContent = 'Вход в аккаунт';
      if (submitBtn) submitBtn.textContent = 'Вход';
      switchModeLink.textContent = 'Создать аккаунт (Регистрация)';
      if (passwordRepeatInput) {
        passwordRepeatInput.classList.add('hidden');
        passwordRepeatInput.required = false;
      }
    }
  });
}

// ОТПРАВКА ФОРМЫ (Вход/Регистрация)
if (authForm) {
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (loginInput) {
      const enteredLogin = loginInput.value.trim();
      
      if (enteredLogin) {
        // Записываем логин в память браузера навсегда
        localStorage.setItem('userLogin', enteredLogin);
        
        // Мгновенно меняем текст кнопки в зеленом меню
        if (profileBtn) profileBtn.textContent = enteredLogin;
        
        // Сбрасываем форму и закрываем окна
        authForm.reset();
        if (authModal) authModal.style.display = 'none';
        if (sidebar) sidebar.classList.remove('active');
      }
    }
  });
}
