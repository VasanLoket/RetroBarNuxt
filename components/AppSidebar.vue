<template>
  <aside class="sidebar" :class="{ active: open }">
    <button class="close-menu" @click="$emit('close')">&times;</button>

    <!-- Имя пользователя или кнопка входа -->
    <div v-if="!isAuthenticated" class="menu-item size-l" @click="handleProfileClick">
      Вход / Регистрация
    </div>
    <NuxtLink v-else to="/account" class="menu-item size-l" @click="$emit('close')">
      {{ user?.login || 'Профиль' }}
    </NuxtLink>

    <div class="menu-item size-s">Баллы: {{ user?.points || 0 }}</div>
    <NuxtLink to="/menu" class="menu-item size-s">Меню</NuxtLink>
    <NuxtLink to="/menu?mode=order" class="menu-item size-s">Оформить заказ</NuxtLink>

    <div class="sidebar-image">
      <img class="gif-content" src="/img/higuruma-hiromi-higuruma.gif" alt="Анимация">
    </div>
  </aside>
</template>

<script setup>
import { useUser } from '~/composables/useUser'

defineProps({ open: Boolean })
const emit = defineEmits(['close', 'openModal'])

const { user, isAuthenticated } = useUser()

const handleProfileClick = () => {
  emit('openModal')
  emit('close')
}

// Для отладки – следим за изменением пользователя
// watch(user, (newVal) => {
//   console.log('👤 Пользователь в сайдбаре изменился:', newVal)
// }, { deep: true })
</script>