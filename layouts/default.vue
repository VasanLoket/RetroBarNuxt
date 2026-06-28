<template>
  <div class="app-layout">
    <!-- Фон -->
     
    <SynthwaveScene 
      :square-size ="450"
      :spread-factor="10.0"
      :sun-hidden-ratio="1"
      sunColorBot="#ff00aa"
      gridColorY="#ff00aa"
    />
    <VHSBackground 
      class="vhs-background-layer"
      primary-color="#ff00ff" 
      secondary-color="#00ffff" 
      accent-color="#ff0080"
      :intensity="1.2"
      :show-grid="true"
      :performance-mode="true" 
    />

    <CRTOverlay :performance-mode="false" />
    
    <AppHeader @toggleSidebar="toggleSidebar" />

    
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>

    <ConfirmModal :open="confirmModalOpen" @close="closeConfirmModal" @confirm="confirmLogout" />

    <AppSidebar :open="sidebarOpen" @close="closeSidebar" @openModal="openModal" />
    <AuthModal :open="modalOpen" @close="closeModal" />
    
    <main class="main-content">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>


<script setup>
import VHSBackground from '@/components/VHSBackground.vue'
import { ref } from 'vue'

const sidebarOpen = ref(false)
const modalOpen = ref(false)

const { clearUser } = useUser()
const router = useRouter()
const confirmModalOpen = ref(false)

const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value }
const closeSidebar = () => { sidebarOpen.value = false }
const openModal = () => {
  modalOpen.value = true
  if (sidebarOpen.value) sidebarOpen.value = false
}
const closeModal = () => { modalOpen.value = false }

const openConfirmModal = () => { confirmModalOpen.value = true }
const closeConfirmModal = () => { confirmModalOpen.value = false }

// Подтверждение выхода
const confirmLogout = () => {
  clearUser()
  router.push('/')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: transparent;
}

/* Фон получает отрицательный z-index, чтобы быть под всем */
.vhs-background-layer {
  z-index: -1 !important; /* гарантированно ниже всех */
}

/* Оверлей уже имеет свой z-index, оставляем как есть */
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

.main-content {
  flex: 1;
  padding: 0;
}
</style>