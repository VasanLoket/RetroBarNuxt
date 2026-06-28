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
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d552.9960959695928!2d43.991791078504164!3d56.33009954356144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4151d54a08166c15%3A0xd4c9f21d360f7238!2sretrowave%20bar!5e0!3m2!1sru!2sru!4v1782649598710!5m2!1sru!2sru" 
              width="600" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="strict-origin-when-cross-origin">
      </iframe>      
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
    if(validateCardLuhn(rawDigits)){
      cardValidationMessage.value = '✅ Номер карты введён корректно'
    }else{
      cardValidationMessage.value = '❌ Не верный номер карты'
    }
  } else if (rawDigits.length > 0) {
    cardValidationMessage.value = `❌ Должно быть 16 цифр (сейчас ${rawDigits.length})`
  } 
}

function validateCardLuhn(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10 === 0);
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
/* ===== Фон страницы ===== */
.payment-page-wrapper {
  margin: 0 auto;
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

/* ===== Поле ввода адреса ===== */
.payment-address-input {
  width: 100%;
  padding: 14px 18px;
  background: transparent;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 16px;
  font-size: 1rem;
  color: #ff7bff;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.05);
  margin-bottom: 20px;
  box-sizing: border-box;
}
.payment-address-input:focus {
  outline: none;
  border-color: #ff7bff;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}
.payment-address-input::placeholder {
  color: #8888aa;
}

/* ===== Контейнер карты ===== */
.payment-map-box {
  margin-bottom: 20px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 2px solid rgba(255, 0, 255, 0.3);
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.1);
  transition: box-shadow 0.3s;
}
.payment-map-box:hover {
  box-shadow: 0 0 50px rgba(255, 0, 255, 0.2), 0 0 80px rgba(0, 255, 255, 0.1);
}
.payment-map-box iframe {
  width: 100%;
  height: 300px;
  border-radius: 20px;
  display: block;
  
}

/* ===== Ряд кнопок оплаты ===== */
.payment-buttons-row {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
}
.pay-toggle-btn {
  padding: 14px 32px;
  background: transparent;
  color: #ff7bff;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex: 1;
  max-width: 200px;
}
.pay-toggle-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Модалки (общие) ===== */
.payment-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 0, 21, 0.85);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.payment-modal-overlay.id-hidden {
  display: none;
}
.payment-modal-box {
  background: rgba(10, 0, 21, 0.95);
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
.payment-modal-box:hover {
  box-shadow:
    0 0 60px rgba(255, 0, 255, 0.6),
    0 0 100px rgba(0, 255, 255, 0.4);
}
.payment-modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 30px;
  background: none;
  border: none;
  color: #ff7bff;
  cursor: pointer;
  transition: text-shadow 0.3s, color 0.3s;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
}
.payment-modal-close:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
}
.payment-modal-title {
  margin-top: 0;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

/* ===== Модалка СБП ===== */
.qr-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 2px dashed rgba(255, 0, 255, 0.2);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.2);
}
.qr-placeholder img {
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.1);
}

/* ===== Модалка Карта ===== */
.card-input {
  width: 100%;
  padding: 14px 18px;
  background: transparent;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 16px;
  font-size: 1.2rem;
  font-family: monospace;
  letter-spacing: 2px;
  color: #e0d0ff;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.05);
  box-sizing: border-box;
}
.card-input:focus {
  outline: none;
  border-color: #ff7bff;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}
.card-input::placeholder {
  color: #666688;
}
.card-validation-msg {
  margin-top: 12px;
  font-size: 0.95rem;
  text-align: center;
  color: #88ddff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  min-height: 24px;
}
.card-validation-msg:contains('✅') {
  color: #5cb85c;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}
.card-validation-msg:contains('❌') {
  color: #ff6b6b;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
}

/* ===== Адаптивность ===== */
@media (max-width: 600px) {
  .payment-page-wrapper {
    padding: 12px;
  }
  .payment-buttons-row {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .pay-toggle-btn {
    max-width: 100%;
    width: 100%;
    padding: 12px;
  }
  .payment-map-box iframe {
    height: 200px;
  }
  .payment-modal-box {
    padding: 20px 16px;
  }
  .payment-modal-title {
    font-size: 1.4rem;
  }
  .card-input {
    font-size: 1rem;
    padding: 12px;
  }
}
@media (max-width: 420px) {
  .payment-page-wrapper {
    padding: 8px;
  }
  .back-link {
    font-size: 1.6rem;
  }
}
</style>