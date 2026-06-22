<template>
  <div class="payment-page-wrapper">
    <NuxtLink to="/cart" class="back-link">&#8592;</NuxtLink>

    <input
      type="text"
      class="payment-address-input"
      v-model="address"
      placeholder="Адрес"
    />

    <div class="payment-map-box" id="map-mock">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2212.60681349326!2d43.982729313086466!3d56.319358773187844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4151d5898f08eb2f%3A0xc1152e2a90a20d0c!2z0JvQtdC70YzQutC-0LI!5e0!3m2!1sru!2sru!4v1781247190489!5m2!1sru!2sru"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    <div class="payment-buttons-row">
      <button class="pay-toggle-btn" @click="openSbp">СБП</button>
      <button class="pay-toggle-btn" @click="openCard">Карта банка</button>
    </div>

    <!-- Модалка СБП -->
    <div class="payment-modal-overlay" :class="{ 'id-hidden': !sbpOpen }" @click.self="closeSbp">
      <div class="payment-modal-box">
        <button class="payment-modal-close" @click="closeSbp">&times;</button>
        <h3 class="payment-modal-title">Оплата по СБП</h3>
        <div class="qr-placeholder"><img src="/img/qr.jpg" alt="QR-код" /></div>
      </div>
    </div>

    <!-- Модалка Карта -->
    <div class="payment-modal-overlay" :class="{ 'id-hidden': !cardOpen }" @click.self="closeCard">
      <div class="payment-modal-box">
        <button class="payment-modal-close" @click="closeCard">&times;</button>
        <h3 class="payment-modal-title">Введите номер карты</h3>
        <input
          type="text"
          id="card-number-input"
          class="card-input"
          v-model="cardNumber"
          placeholder="0000 0000 0000 0000"
          maxlength="19"
          @input="formatCard"
        />
        <div class="card-validation-msg" id="validation-msg">{{ cardValidationMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'nuxt/app'

const router = useRouter()
const address = ref('')
const sbpOpen = ref(false)
const cardOpen = ref(false)
const cardNumber = ref('')
const cardValidationMessage = ref('')

// Функции открытия/закрытия модалок
const openSbp = () => { sbpOpen.value = true }
const closeSbp = () => { sbpOpen.value = false }
const openCard = () => { cardOpen.value = true }
const closeCard = () => { cardOpen.value = false }

// Форматирование номера карты (добавление пробелов)
const formatCard = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 16) value = value.slice(0, 16)
  let formatted = ''
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' '
    formatted += value[i]
  }
  cardNumber.value = formatted
  validateCard(value)
}

// Простая валидация карты (длина 16 цифр)
const validateCard = (rawDigits) => {
  if (rawDigits.length === 16) {
    cardValidationMessage.value = '✅ Номер карты введён корректно'
  } else if (rawDigits.length > 0) {
    cardValidationMessage.value = `❌ Должно быть 16 цифр (сейчас ${rawDigits.length})`
  } else {
    cardValidationMessage.value = ''
  }
}

// При монтировании можно загрузить данные корзины (если нужно)
onMounted(() => {
  // Например, проверить, есть ли товары в корзине, иначе редирект
  if (process.client) {
    const basket = localStorage.getItem('currentOrderBasket')
    if (!basket || JSON.parse(basket).length === 0) {
      // Если корзина пуста, можно перенаправить на главную
      router.push('/')
    }
  }
})
</script>

<style scoped>
/* Стили, скопированные из старого CSS (можно адаптировать) */
.payment-page-wrapper {
  
  margin: 0 auto;
  padding: 20px;
}
.back-link {
  font-size: 2rem;
  text-decoration: none;
  color: #333;
  display: inline-block;
  margin-bottom: 20px;
}
.payment-address-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 20px;
}
.payment-map-box {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}
.payment-map-box iframe {
  width: 100%;
  height: 300px;
}
.payment-buttons-row {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.pay-toggle-btn {
  padding: 12px 30px;
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}
.pay-toggle-btn:hover {
  background: #f0a500;
  color: #1a1a2e;
}
.payment-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.payment-modal-overlay.id-hidden {
  display: none;
}
.payment-modal-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
}
.payment-modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}
.payment-modal-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
.qr-placeholder img {
  width: 100%;
  height: auto;
}
.card-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.2rem;
  letter-spacing: 2px;
}
.card-validation-msg {
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>