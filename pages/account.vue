<template>
  <div class="account-page-wrapper">
    <div class="account-left">
      <NuxtLink to="/" class="back-link">&#8592;</NuxtLink>
      <div class="loyalty-title">Система лояльности</div>
      <h2 class="history-main-title">Окно историй баллов</h2>
      <div class="history-list">
        <div class="history-item">Зачисление, дата</div>
        <div class="history-item">Списание, дата</div>
        <div class="history-item">Зачисление, дата</div>
      </div>
    </div>
    <div class="account-right">
      <div class="account-menu-item user-name">{{ user?.login || 'Гость' }}</div>
      <div class="account-menu-item">Количество баллов: {{ user?.points || 0 }}</div>
      <div class="account-menu-item">Любимые заведения</div>
      <a href="https://yandex.ru/maps/org/retrowave_bar/79939704384/reviews/?ll=43.992053%2C56.329911&z=17" class="account-menu-item" target="_blank">Оставить отзыв</a>
      <NuxtLink to="/booking" class="account-menu-item">Бронирование</NuxtLink>
      <div class="account-menu-item logout-btn" @click="openConfirmModal">Выйти из аккаунта</div>
    </div>
  </div>

  <!-- Модалка подтверждения -->
  <ConfirmModal
    :open="showConfirmModal"
    title="Выход из аккаунта"
    message="Вы уверены, что хотите выйти?"
    @close="closeConfirmModal"
    @confirm="logout"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useUser } from '~/composables/useUser'
import { useRouter } from 'nuxt/app'

const router = useRouter()
const { user, clearUser } = useUser()

const showConfirmModal = ref(false)

const openConfirmModal = () => {
  showConfirmModal.value = true
}
const closeConfirmModal = () => {
  showConfirmModal.value = false
}

const logout = () => {
  clearUser()
  router.push('/')
}
</script>

<style scoped>
.account-left {
  flex: 1;
}

.account-right {
  flex: 1;
}

/* ===== Ссылка назад ===== */
.back-link {
  font-size: 2rem;
  text-decoration: none;
  color: #ff7bff;
  display: inline-block;
  margin-bottom: 20px;
  transition: text-shadow 0.3s, color 0.3s;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
}

.back-link:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(255, 0, 255, 0.4);
}

/* ===== Заголовки ===== */
.loyalty-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  margin-bottom: 12px;
}

.history-main-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #88ddff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  margin-bottom: 12px;
}

/* ===== Блок истории (неоновая рамка, прозрачный фон) ===== */
.history-list {
  border: 2px solid rgba(255, 0, 255, 0.6);
  border-radius: 20px;
  padding: 16px;
  background: transparent !important; /* убираем фон */
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.4),
    0 0 40px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(255, 0, 255, 0.05);
  transition: box-shadow 0.3s;
}

.history-list:hover {
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.7),
    0 0 80px rgba(0, 255, 255, 0.5);
}

/* ===== Элементы истории ===== */
.history-item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #e0d0ff;
  font-size: 1rem;
  transition: color 0.2s;
  
    background: rgba(255, 0, 255, 0.05);
}

.history-item:last-child {
  border-bottom: none;
}

.history-item:hover {
  color: #ff7bff;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.2);
}

/* ===== Пункты меню в правой колонке ===== */
.account-menu-item {
  padding: 14px 18px;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 12px;
  margin-bottom: 12px;
  background: transparent !important;
  color: #e0d0ff;
  text-decoration: none;
  display: block;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.1);
  cursor: pointer;
}

.account-menu-item:hover {
  transform: translateX(6px);
  border-color: #ff7bff;
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.4),
    0 0 60px rgba(0, 255, 255, 0.2);
  color: #fff;
}

/* ===== Имя пользователя (особый стиль) ===== */
.user-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.4);
  border-color: rgba(255, 0, 255, 0.6);
  margin-bottom: 16px;
}

.user-name:hover {
  transform: none;
  border-color: rgba(255, 0, 255, 0.6);
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.4);
}

/* ===== Кнопка выхода ===== */
.logout-btn {
  text-align: center;
  font-weight: 600;
  background: transparent !important;
  border-color: rgba(255, 70, 70, 0.5);
  color: #ff6b6b;
  margin-top: 30px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
}

.logout-btn:hover {
  background: transparent !important;
  border-color: #ff4444;
  color: #ff8888;
  box-shadow:
    0 0 40px rgba(255, 0, 0, 0.5),
    0 0 80px rgba(255, 0, 0, 0.3);
  transform: translateX(0) scale(1.02);
}

/* ===== Специальная стилизация для ссылок в меню ===== */
.account-menu-item a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
}

/* ===== Адаптивность ===== */
@media (max-width: 768px) {
  .account-page-wrapper {
    flex-direction: column;
    gap: 30px;
    padding: 16px;
  }

  .account-left,
  .account-right {
    flex: 1 1 100%;
  }

  .back-link {
    font-size: 1.8rem;
  }

  .loyalty-title {
    font-size: 1.5rem;
  }

  .history-main-title {
    font-size: 1.1rem;
  }

  .account-menu-item {
    padding: 12px 14px;
    font-size: 1rem;
  }

  .user-name {
    font-size: 1.5rem;
  }
}

@media (max-width: 420px) {
  .account-page-wrapper {
    padding: 12px;
  }

  .history-list {
    padding: 12px;
  }

  .history-item {
    font-size: 0.9rem;
    padding: 8px 0;
  }

  .account-menu-item {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
}
</style>