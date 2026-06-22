<template>
  <div class="app-layout">
    <AppHeader @toggleSidebar="toggleSidebar" />

    <!-- Оверлей для закрытия сайдбара при клике вне его -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    <AppSidebar :open="sidebarOpen" @close="closeSidebar" @openModal="openModal" />
    <AuthModal :open="modalOpen" @close="closeModal" />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
const modalOpen = ref(false)

const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value }
const closeSidebar = () => { sidebarOpen.value = false }
const openModal = () => {
  modalOpen.value = true
  if (sidebarOpen.value) sidebarOpen.value = false
}
const closeModal = () => { modalOpen.value = false }
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 0;
}

/* Оверлей для сайдбара */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
  cursor: pointer;
  transition: opacity 0.3s ease;
}
</style>