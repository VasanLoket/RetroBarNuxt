<template>
  <header >
    <!-- Кнопка бургера -->
    <button v-if="isHomePage" class="burger-menu" @click="$emit('toggleSidebar')">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
</template>

<script setup>
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')

defineEmits(['toggleSidebar'])
</script>

<style scoped>
/* Базовые стили для шапки (можно позже перенести в глобальный CSS) */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1a1a2e; /* пример, подберите свой цвет */
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}


.site-title {
  font-size: 1.2rem;
  font-weight: bold;
  flex: 1;
  margin-left: 15px;
}

.burger-menu:hover {
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}

/* ===== Полоски ===== */
.burger-menu span {
  display: block;
  width: 32px;
  height: 3px;
  background-color: #ff7bff;
  border-radius: 4px;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.3);
}

.burger-menu:hover span {
  background-color: #88ddff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}
</style>