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
      <div class="account-menu-item">Оставить отзыв</div>
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
/* Стили для этой страницы (если нужно дополнить глобальные) */
:deep(.app-layout) {
  max-width: 100% !important;
  padding: 0 !important;
}
:deep(.main-content) {
  max-width: 100% !important;
  padding: 0 !important;
}
/* Сама обёртка страницы – на всю ширину */
.account-page-wrapper {
  max-width: 100%;
  padding: 20px;
}
.account-left {
  flex: 1;
}
.account-right {
  flex: 1;
}
.back-link {
  font-size: 2rem;
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
  margin-bottom: 20px;
}
.loyalty-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.history-main-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.history-list {
  border: 1px solid #1a1a2;
  padding: 10px;
  border-radius: 8px;
  background: #1a1a2e;
}
.history-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
.account-menu-item {
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;
  color: #f0f0f0;
  display: block;
}
.account-menu-item:hover {
  background: #f0f0f0;
  color: #333;
}
.user-name {
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #f0f0f0;
}
.logout-btn {
  color: white;
  background: #d9534f;
  border-radius: 6px;
  text-align: center;
  margin-top: 40px;
}
.logout-btn:hover {
  background: #c9302c;
}
</style>