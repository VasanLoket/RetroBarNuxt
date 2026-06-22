<template>
  <div class="booking-page-wrapper">
    <NuxtLink to="/account" class="back-link">&#8592;</NuxtLink>

    <div class="hall-plate-wrapper">
      <div class="hall-grid-scheme" ref="gridRef">
        <!-- Барная стойка -->
        <div class="bar-counter-group">
          <div class="bar-vertical-seats">
            <div class="seat-pixel table-style"><span class="chair-circle small-chair"></span></div>
            <div class="seat-pixel table-style"><span class="chair-circle small-chair"></span></div>
            <div class="seat-pixel table-style"><span class="chair-circle small-chair"></span></div>
            <div class="seat-pixel table-style"><span class="chair-circle small-chair"></span></div>
            <div class="seat-pixel table-style"><span class="chair-circle small-chair"></span></div>
            <div class="seat-pixel table-style"><span class="chair-circle small-chair"></span></div>
          </div>
          <div class="bar-bottom-tail table-style">
            <span class="chair-circle small-chair"></span>
          </div>
        </div>

        <!-- Центральные столы -->
        <div class="big-table table-style table-center-1">
          <span class="chair-circle"></span><span class="chair-circle"></span>
          <span class="chair-circle"></span><span class="chair-circle"></span>
        </div>
        <div class="big-table table-style table-center-2">
          <span class="chair-circle"></span><span class="chair-circle"></span>
          <span class="chair-circle"></span><span class="chair-circle"></span>
        </div>

        <!-- Правые столы -->
        <div class="big-table table-style table-right-1">
          <span class="chair-circle"></span><span class="chair-circle"></span>
          <span class="chair-circle"></span><span class="chair-circle"></span>
        </div>
        <div class="big-table table-style table-right-2">
          <span class="chair-circle"></span><span class="chair-circle"></span>
          <span class="chair-circle"></span><span class="chair-circle"></span>
        </div>
      </div>
    </div>

    <div class="toggle-widget">
      <div class="toggle-circle"></div>
    </div>
  </div>

  <!-- Модалка -->
  <div class="booking-modal-overlay" :class="{ active: modalOpen }" @click.self="closeModal">
    <div class="booking-modal-box">
      <button class="booking-modal-close" @click="closeModal">&times;</button>
      <h2 class="booking-modal-title">{{ modalTitle }}</h2>
      <div class="booking-datetime-container">
        <div class="booking-datetime-field">{{ modalDate || 'Дата' }}</div>
        <div class="booking-datetime-field">{{ modalTime || 'Время' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Состояния
const modalOpen = ref(false)
const modalTitle = ref('Номер стола')
const modalDate = ref('')
const modalTime = ref('')

const gridRef = ref(null)

// Функция открытия
const openBookingModal = (tableId) => {
  console.log('🟢 Открываем модалку для стола:', tableId)
  modalTitle.value = `Стол ${tableId}`

  const now = new Date()
  // Прибавляем 1 час
  now.setHours(now.getHours() + 1)
  // Прибавляем случайное количество минут (0–59)
  const randomMinutes = Math.floor(Math.random() * 60)
  now.setMinutes(now.getMinutes() + randomMinutes)

  modalDate.value = now.toLocaleDateString('ru-RU')
  modalTime.value = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

  modalOpen.value = true
  console.log('modalOpen стал:', modalOpen.value)
}

// Функция закрытия
const closeModal = () => {
  modalOpen.value = false
  console.log('modalOpen закрыт')
}

// Обработчик кликов
onMounted(() => {
  if (gridRef.value) {
    console.log('✅ gridRef найден, привязываем слушатель')
    gridRef.value.addEventListener('click', (e) => {
      const target = e.target.closest('.big-table, .seat-pixel, .bar-bottom-tail')
      if (target) {
        console.log('🔹 Клик по элементу:', target.className)
        let tableId = '—'
        if (target.classList.contains('big-table')) {
          const cls = Array.from(target.classList).find(c => c.startsWith('table-'))
          tableId = cls ? cls.replace('table-', '') : '—'
        } else {
          tableId = 'Барная стойка'
        }
        openBookingModal(tableId)
      } else {
        console.log('❌ Клик не по столику')
      }
    })
  } else {
    console.error('❌ gridRef не найден!')
  }
})
</script>

<style scoped>
/* Явные стили для модалки, чтобы она точно отображалась */
.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.booking-modal-overlay.active {
  display: flex;
}
.booking-modal-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.booking-modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}
.booking-datetime-container {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.booking-datetime-field {
  background: #f0f0f0;
  padding: 8px 12px;
  border-radius: 6px;
  flex: 1;
  text-align: center;
}
</style>