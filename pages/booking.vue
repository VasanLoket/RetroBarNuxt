<template>
  <div class="booking-page-wrapper">
    <NuxtLink to="/account" class="back-link">&#8592;</NuxtLink>

    <div class="hall-plate-wrapper">
      <div class="hall-grid-scheme" ref="gridRef">
        <!-- Барная стойка (7 мест) -->
        <div class="bar-counter-group">
          <div class="bar-vertical-seats">
            <div
              v-for="i in 6"
              :key="'bar-' + i"
              class="seat-pixel table-style"
              :class="{
                occupied: isTableOccupied('bar-' + i) && !isBookedByMe('bar-' + i),
                'booked-by-me': isTableOccupied('bar-' + i) && isBookedByMe('bar-' + i)
              }"
              :data-table-id="'bar-' + i"
            >
              <span class="chair-circle small-chair"></span>
            </div>
          </div>
          <div
            class="bar-bottom-tail table-style"
            :class="{
              occupied: isTableOccupied('bar-6') && !isBookedByMe('bar-6'),
              'booked-by-me': isTableOccupied('bar-6') && isBookedByMe('bar-6')
            }"
            :data-table-id="'bar-6'"
          >
            <span class="chair-circle small-chair"></span>
          </div>
        </div>

        <!-- Центральные столы -->
        <div
          v-for="i in 2"
          :key="'center-' + i"
          class="big-table table-style"
          :class="[
            'table-center-' + i,
            {
              occupied: isTableOccupied('center-' + i) && !isBookedByMe('center-' + i),
              'booked-by-me': isTableOccupied('center-' + i) && isBookedByMe('center-' + i)
            }
          ]"
          :data-table-id="'center-' + i"
        >
          <span class="chair-circle"></span>
          <span class="chair-circle"></span>
          <span class="chair-circle"></span>
          <span class="chair-circle"></span>
        </div>

        <!-- Правые столы -->
        <div
          v-for="i in 2"
          :key="'right-' + i"
          class="big-table table-style"
          :class="[
            'table-right-' + i,
            {
              occupied: isTableOccupied('right-' + i) && !isBookedByMe('right-' + i),
              'booked-by-me': isTableOccupied('right-' + i) && isBookedByMe('right-' + i)
            }
          ]"
          :data-table-id="'right-' + i"
        >
          <span class="chair-circle"></span>
          <span class="chair-circle"></span>
          <span class="chair-circle"></span>
          <span class="chair-circle"></span>
        </div>
      </div>
    </div>

    <div class="toggle-widget">
      <div class="toggle-circle"></div>
    </div>
  </div>

  <!-- Модалка бронирования -->
  <div
    class="booking-modal-overlay"
    :class="{ active: modalOpen }"
    @click.self="closeModal"
  >
    <div class="booking-modal-box">
      <button class="booking-modal-close" @click="closeModal">&times;</button>
      <h2 class="booking-modal-title">{{ modalTitle }}</h2>
      <div class="booking-datetime-container">
        <div class="booking-datetime-field">
          <label>📅 Дата</label>
          <input type="date" v-model="bookingDate" :min="minDate" class="date-input" />
        </div>
        <div class="booking-datetime-field">
          <label>⏰ Время</label>
          <input type="time" v-model="bookingTime" :min="minTime" class="time-input" />
        </div>
      </div>
      <button class="booking-confirm-btn" @click="confirmBooking">Забронировать</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUser } from '~/composables/useUser'

const { user } = useUser()
const gridRef = ref(null)

// Состояния
const modalOpen = ref(false)
const modalTitle = ref('Номер стола')
const selectedTableId = ref(null)
const bookingDate = ref('')
const bookingTime = ref('')

const minDate = computed(() => {
  const now = new Date()
  return now.toISOString().split('T')[0]
})

const minTime = computed(() => {
  const now = new Date()
  now.setHours(now.getHours() + 1)
  const minutes = now.getMinutes()
  const rounded = Math.ceil(minutes / 30) * 30
  now.setMinutes(rounded)
  const hours = String(now.getHours()).padStart(2, '0')
  const mins = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${mins}`
})

// Столики
const tables = ref({})

const initializeTables = () => {
  const stored = localStorage.getItem('bookingTables')
  if (stored) {
    try {
      tables.value = JSON.parse(stored)
      console.log('📦 Загружены столики из localStorage:', tables.value)
      return
    } catch (e) {}
  }

  const ids = [
    'bar-0', 'bar-1', 'bar-2', 'bar-3', 'bar-4', 'bar-5', 'bar-6',
    'center-1', 'center-2',
    'right-1', 'right-2'
  ]
  const occupiedCount = Math.floor(Math.random() * 3) + 2
  const occupiedIds = []
  while (occupiedIds.length < occupiedCount) {
    const randomIndex = Math.floor(Math.random() * ids.length)
    const id = ids[randomIndex]
    if (!occupiedIds.includes(id)) {
      occupiedIds.push(id)
    }
  }
  tables.value = {}
  ids.forEach(id => {
    tables.value[id] = {
      occupied: occupiedIds.includes(id),
      bookedBy: occupiedIds.includes(id) ? 'other' : null
    }
  })
  saveTables()
}

const saveTables = () => {
  localStorage.setItem('bookingTables', JSON.stringify(tables.value))
}

const isTableOccupied = (id) => {
  return tables.value[id]?.occupied || false
}

const isBookedByMe = (id) => {
  if (!user.value) {
    console.log('⚠️ Пользователь не авторизован')
    return false
  }
  const bookedBy = tables.value[id]?.bookedBy
  const result = bookedBy === user.value.id
  console.log(`🔍 Стол ${id}: bookedBy=${bookedBy}, userId=${user.value.id}, совпадает=${result}`)
  return result
}

const openBookingModal = (tableId) => {
  if (isTableOccupied(tableId)) return
  selectedTableId.value = tableId
  modalTitle.value = `Стол ${tableId}`
  const now = new Date()
  now.setHours(now.getHours() + 1)
  bookingDate.value = now.toISOString().split('T')[0]
  const minutes = now.getMinutes()
  const rounded = Math.ceil(minutes / 30) * 30
  now.setMinutes(rounded)
  const hours = String(now.getHours()).padStart(2, '0')
  const mins = String(now.getMinutes()).padStart(2, '0')
  bookingTime.value = `${hours}:${mins}`
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedTableId.value = null
}

const confirmBooking = () => {
  if (!selectedTableId.value) {
    alert('Ошибка: стол не выбран')
    return
  }
  if (!bookingDate.value || !bookingTime.value) {
    alert('Пожалуйста, выберите дату и время')
    return
  }
  const tableId = selectedTableId.value
  const userId = user.value?.id || `guest-${Date.now()}`
  tables.value[tableId] = {
    occupied: true,
    bookedBy: userId
  }
  saveTables()
  closeModal()
  alert(`✅ Стол ${tableId} забронирован на ${bookingDate.value} в ${bookingTime.value}`)
}

onMounted(() => {
  initializeTables()
  if (gridRef.value) {
    gridRef.value.addEventListener('click', (e) => {
      const target = e.target.closest('[data-table-id]')
      if (!target) return
      const tableId = target.dataset.tableId
      if (!isTableOccupied(tableId)) {
        openBookingModal(tableId)
      } else {
        console.log(`❌ Стол ${tableId} занят`)
      }
    })
  }
})
</script>

<style scoped>

.booking-modal-title{
  color: #1a1a2e;
}
/* Статусы столиков */
.occupied {
  background-color: #d9534f !important;
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
}
.occupied .chair-circle {
  background-color: #a94442 !important;
}

.booked-by-me {
  border: 4px solid #5cb85c !important;
  background-color: #dff0d8 !important;
  cursor: default;
  pointer-events: none;
}
.booked-by-me .chair-circle {
  background-color: #5cb85c !important;
}

/* Стили модалки */
.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.booking-modal-overlay.active {
  display: flex;
}
.booking-modal-box {
  background: #1a1a2e;
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
.booking-modal-title {
  margin-top: 0;
  color: #f0f0f0;
  margin-bottom: 20px;
}
.booking-datetime-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}
.booking-datetime-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.booking-datetime-container {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}
.booking-datetime-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.booking-datetime-field label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
}
.booking-datetime-field input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  background: #f9f9f9;
  box-sizing: border-box;
}
.booking-datetime-field input:focus {
  outline: none;
  border-color: #f0a500;
}
.booking-datetime-field label {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
}
.booking-datetime-field input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background: #f9f9f9;
}
.booking-datetime-field input:focus {
  outline: none;
  border-color: #f0a500;
}
.booking-confirm-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.booking-confirm-btn:hover {
  background: #f0a500;
  color: #1a1a2e;
}
</style>