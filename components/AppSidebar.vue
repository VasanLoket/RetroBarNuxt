<template>
  <!-- Оверлей (затемнение) – клик по нему закрывает сайдбар -->
  <div class="sidebar-overlay" :class="{ active: open }" @click="$emit('close')"></div>

  <!-- Сам сайдбар -->
  <aside class="sidebar" :class="{ active: open }">
    

    <!-- Имя пользователя или кнопка входа -->
    <div v-if="!isAuthenticated" class="menu-item size-l" @click="handleProfileClick">
      Вход / Регистрация
    </div>
    <NuxtLink v-else to="/account" class="menu-item size-l" @click="$emit('close')">
      {{ user?.login || 'Профиль' }}
    </NuxtLink>

    <div class="menu-item size-s" @click="$emit('close')">Баллы: {{ user?.points || 0 }}</div>
    <NuxtLink to="/menu" class="menu-item size-s" @click="$emit('close')">Меню</NuxtLink>
    <NuxtLink to="/menu?mode=order" class="menu-item size-s" @click="$emit('close')">Оформить заказ</NuxtLink>

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
</script>

<style scoped>
/* ===== Оверлей (затемнение) ===== */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 0, 21, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  display: none;
  transition: opacity 0.3s ease;
}
.sidebar-overlay.active {
  display: block;
}

/* ===== Сам сайдбар ===== */
.sidebar {
  position: fixed;
  top: 0;
  right: -420px; /* скрыт за экраном */
  width: 380px;
  height: 100%;
  background: rgba(40, 1, 82, 0.664);
  border-left: 2px solid rgba(255, 0, 255, 0.6);
  box-shadow:
    -10px 0 40px rgba(255, 0, 255, 0.3),
    -10px 0 80px rgba(0, 255, 255, 0.2),
    inset 0 0 40px rgba(255, 0, 255, 0.05);
  padding: 30px 24px;
  z-index: 1000;
  transition: right 0.3s ease, box-shadow 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #e0d0ff;
}
.sidebar.active {
  right: 0;
  box-shadow:
    -10px 0 60px rgba(255, 0, 255, 0.5),
    -10px 0 100px rgba(0, 255, 255, 0.3),
    inset 0 0 40px rgba(255, 0, 255, 0.08);
}


/* ===== Пункты меню ===== */
.menu-item {
  padding: 14px 20px;
  border: 2px solid rgba(255, 0, 255, 0.2);
  border-radius: 16px;
  background: transparent;
  color: #e0d0ff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.05);
  text-align: center;
}

.menu-item:hover {
  border-color: #ff7bff;
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.3),
    0 0 60px rgba(0, 255, 255, 0.15);
  color: #ffffff;
  transform: translateX(-4px) scale(1.02);
}

/* Размеры */
.menu-item.size-l {
  font-size: 1.4rem;
  font-weight: 700;
  width: 85%;
  color: #ff7bff;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
  border-color: rgba(255, 0, 255, 0.4);
}
.menu-item.size-l:hover {
  border-color: #ff7bff;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.5);
}

.menu-item.size-s {
  font-size: 1rem;
  font-weight: 400;
}

/* ===== Блок с гифкой ===== */
.sidebar-image {
  margin-top: auto;
  display: flex;
  justify-content: center;
  border: 2px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  transition: box-shadow 0.3s;
}
.sidebar-image:hover {
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.3);
}
.gif-content {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}



/* ===== Адаптивность ===== */
@media (max-width: 560px) {
  .sidebar {
    width: 300px;
    right: -340px;
    padding: 20px 16px;
  }
  .sidebar.active {
    right: 0;
  }
  .menu-item {
    padding: 12px 16px;
    font-size: 1rem;
  }
  .menu-item.size-l {
    font-size: 1.2rem;
  }
  .close-menu {
    font-size: 1.8rem;
  }
  .sidebar-image {
    padding: 8px;
  }
  .gif-content {
    max-height: 120px;
  }
}
</style>
