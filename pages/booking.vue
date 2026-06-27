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

<<<<<<< HEAD
// Состояния модалки
=======
// Состояния
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
const modalOpen = ref(false)
const modalTitle = ref('Номер стола')
const selectedTableId = ref(null)
const bookingDate = ref('')
const bookingTime = ref('')

<<<<<<< HEAD
// Минимальные дата и время (для валидации)
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
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

<<<<<<< HEAD
// Данные о столиках (занятость)
=======
// Столики
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
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

<<<<<<< HEAD
  // Инициализация случайными занятыми столами (для демонстрации)
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
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

<<<<<<< HEAD
// Проверка, занят ли стол
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
const isTableOccupied = (id) => {
  return tables.value[id]?.occupied || false
}

<<<<<<< HEAD
// Проверка, забронирован ли стол текущим пользователем
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
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

<<<<<<< HEAD
// Открыть модалку для брони
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
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

<<<<<<< HEAD
// Обработка клика по схеме
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
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
<<<<<<< HEAD
/* ===== Фон страницы ===== */
.booking-page-wrapper {
  max-width: 100%;
  padding: 20px;
  min-height: 100vh;
  color: #e0d0ff;
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

/* ===== Обёртка схемы зала (только рамка + свечение) ===== */
.hall-plate-wrapper {
  margin: 20px 0;
  padding: 20px;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 20px;
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.3),
    0 0 60px rgba(0, 255, 255, 0.2),
    inset 0 0 30px rgba(255, 0, 255, 0.05);
  background: transparent;
  transition: box-shadow 0.3s;
}
.hall-plate-wrapper:hover {
  box-shadow:
    0 0 50px rgba(255, 0, 255, 0.5),
    0 0 80px rgba(0, 255, 255, 0.3);
}


.bar-counter-group {
  padding: 15px;
  border: 2px solid rgba(0, 255, 255, 0.4);
  border-radius: 20px;
  background: transparent;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  transition: box-shadow 0.3s;
}
.bar-counter-group:hover {
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
}


.table-style {
  background: transparent !important;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 16px;
  padding: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.1);
  cursor: pointer;
}

/* Свободный столик при наведении */
.table-style:not(.occupied):not(.booked-by-me):hover {
  transform: scale(1.04);
  border-color: #ff7bff;
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.5),
    0 0 60px rgba(0, 255, 255, 0.3);
}

/* Круги-стулья – только цвет и тени */
.chair-circle {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
}
.table-style:hover .chair-circle {
  border-color: #ff7bff;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.2);
}
.small-chair {
  width: 20px;
  height: 20px;
}

/* Свободные – голубоватый оттенок */
.table-style:not(.occupied):not(.booked-by-me) .chair-circle {
  background: rgba(100, 200, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
}

/* Занятые – красный неон */
.occupied {
  border-color: rgba(255, 70, 70, 0.8) !important;
  background: transparent !important;
  box-shadow:
    0 0 30px rgba(255, 0, 0, 0.4),
    inset 0 0 20px rgba(255, 0, 0, 0.1);
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.8;
}
.occupied .chair-circle {
  background: rgba(255, 70, 70, 0.3) !important;
  border-color: #ff4444 !important;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
}

/* Забронированные мной – зелёный неон */
.booked-by-me {
  border-color: rgba(70, 255, 70, 0.8) !important;
  background: transparent !important;
  box-shadow:
    0 0 30px rgba(0, 255, 0, 0.4),
    inset 0 0 20px rgba(0, 255, 0, 0.1);
=======

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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  cursor: default;
  pointer-events: none;
}
.booked-by-me .chair-circle {
<<<<<<< HEAD
  background: rgba(70, 255, 70, 0.3) !important;
  border-color: #44ff44 !important;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
}

/* ===== Тоггл-виджет (декор) ===== */
.toggle-widget {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.toggle-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 0, 255, 0.5);
  background: transparent;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  animation: pulse 2s infinite alternate;
}
@keyframes pulse {
  0% { box-shadow: 0 0 20px rgba(255, 0, 255, 0.2); }
  100% { box-shadow: 0 0 50px rgba(255, 0, 255, 0.6), 0 0 80px rgba(0, 255, 255, 0.3); }
}

/* ===== Модалка – неоновая ===== */
=======
  background-color: #5cb85c !important;
}

/* Стили модалки */
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.booking-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
=======
  background: rgba(0,0,0,0.6);
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 2000;
<<<<<<< HEAD
  backdrop-filter: blur(4px);
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
.booking-modal-overlay.active {
  display: flex;
}
.booking-modal-box {
<<<<<<< HEAD
  padding: 30px 32px;
  border-radius: 24px;
  max-width: 440px;
  width: 90%;
  position: relative;
  border: 2px solid rgba(255, 0, 255, 0.6);
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.4),
    0 0 80px rgba(0, 255, 255, 0.3),
    inset 0 0 40px rgba(255, 0, 255, 0.05);
  transition: box-shadow 0.3s;
}
.booking-modal-box:hover {
  box-shadow:
    0 0 60px rgba(255, 0, 255, 0.6),
    0 0 100px rgba(0, 255, 255, 0.4);
=======
  background: #1a1a2e;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
.booking-modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
<<<<<<< HEAD
  font-size: 30px;
  background: none;
  border: none;
  color: #ff7bff;
  cursor: pointer;
  transition: text-shadow 0.3s, color 0.3s;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
}
.booking-modal-close:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
}
.booking-modal-title {
  margin-top: 0;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}
.booking-datetime-container {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
=======
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
.booking-datetime-field {
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  align-items: center;      
  flex: 0 1 auto;           
  min-width: 140px; 
  background: none;
}

.booking-datetime-field label {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 0.95rem;
  color: #88ddff;
  text-align: left; 
  width: 100%;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}
.booking-datetime-field input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  background: transparent;
  color: #e0d0ff;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.1);
}
.booking-datetime-field input:focus {
  outline: none;
  border-color: #ff7bff;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}
.booking-datetime-field input::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
=======
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
.booking-confirm-btn {
  display: block;
  width: 100%;
<<<<<<< HEAD
  padding: 14px;
  background: transparent;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff7bff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.booking-confirm-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.5),
    0 0 80px rgba(0, 255, 255, 0.3);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Адаптивность (только размеры, layout не трогаем) ===== */
@media (max-width: 600px) {
  .booking-page-wrapper {
    padding: 12px;
  }
  .hall-plate-wrapper {
    padding: 12px;
  }
  .table-style {
    padding: 8px;
  }
  .chair-circle {
    width: 20px;
    height: 20px;
  }
  .small-chair {
    width: 16px;
    height: 16px;
  }
  .booking-datetime-container {
    flex-direction: column;
    gap: 12px;
  }
  .booking-modal-box {
    padding: 20px 16px;
  }
  .booking-modal-title {
    font-size: 1.4rem;
  }
}
@media (max-width: 420px) {
  .booking-page-wrapper {
    padding: 8px;
  }
  .hall-plate-wrapper {
    padding: 8px;
  }
  .table-style {
    padding: 6px;
    border-radius: 12px;
  }
  .chair-circle {
    width: 16px;
    height: 16px;
  }
  .small-chair {
    width: 12px;
    height: 12px;
  }
  .booking-modal-box {
    padding: 16px 12px;
  }
=======
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
</style>