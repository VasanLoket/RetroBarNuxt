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

.burger-menu {
 
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
}

.burger-menu span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #fff;
  border-radius: 3px;
  transition: 0.3s;
}

/* Можно добавить анимацию при наведении */
.burger-menu:hover span {
  background-color: #f0a500;
}
</style>