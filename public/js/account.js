// Находим элементы на странице личного кабинета
const cabinetUserName = document.getElementById('cabinet-user-name');
const logoutBtn = document.getElementById('logout-btn');

// Читаем имя из памяти браузера
const savedLogin = localStorage.getItem('userLogin');

if (savedLogin) {
  // Показываем логин на экране
  cabinetUserName.textContent = savedLogin;
} else {
  // Если пользователь как-то попал сюда без входа — выкидываем его на главную
  window.location.href = 'index.html';
}

// Кнопка "Выйти из аккаунта"
logoutBtn.addEventListener('click', () => {
  // Стираем логин из памяти
  localStorage.removeItem('userLogin');
  // Возвращаем пользователя на главную страницу
  window.location.href = 'index.html';
});
