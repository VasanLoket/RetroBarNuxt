<template>
  <section class="cart-page">
    <h2 class="section-title">Корзина</h2>
    <NuxtLink to="/menu" class="back-link">&#8592;</NuxtLink>

    <div v-if="pending" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error.message }}</div>
    <div v-else-if="!cartItems.length" class="empty-cart">
      <p>Корзина пуста</p>
      <NuxtLink to="/menu" class="btn">Перейти в меню</NuxtLink>
    </div>

    
    
    <div v-else>
      <div class="cart-wraper">
        <div class="cart-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">{{ item.price }} ₽</span>
            </div>
            <div class="item-controls">
              <button class="qty-btn" @click="decrease(item.id)">-</button>
              <span class="qty">{{ item.quantity }}</span>
              <button class="qty-btn" @click="increase(item.id)">+</button>
              <button class="remove-btn" @click="removeItem(item.id)">✕</button>
            </div>
          </div>
        </div>

          <div class="cart-total">
            <span class="text">Итого:</span>
            <span class="total-price">{{ totalPrice }} ₽</span>
          </div>
        </div>

      <button class="checkout-btn" @click="checkout">Оформить заказ</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Загружаем данные меню
const { data: menu, pending, error } = await useFetch('/api/menu')

// Корзина – объект { id: quantity }
const basket = ref({})

// Загрузка корзины из localStorage
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('currentOrderBasket')
    if (saved) {
      try {
        basket.value = JSON.parse(saved)
      } catch (e) {}
    }
  }
})

// Получаем список товаров с количеством
const cartItems = computed(() => {
  if (!menu.value || !Array.isArray(menu.value)) return []
  const items = []
  for (const [id, quantity] of Object.entries(basket.value)) {
    if (quantity <= 0) continue
    const product = menu.value.find(item => item.id === Number(id))
    if (product) {
      items.push({
        ...product,
        quantity
      })
    }
  }
  return items
})

// Общая сумма
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// Методы изменения корзины
const updateBasket = () => {
  if (process.client) {
    localStorage.setItem('currentOrderBasket', JSON.stringify(basket.value))
  }
}

const increase = (id) => {
  basket.value[id] = (basket.value[id] || 0) + 1
  updateBasket()
}

const decrease = (id) => {
  if (basket.value[id] && basket.value[id] > 1) {
    basket.value[id] -= 1
  } else {
    delete basket.value[id]
  }
  updateBasket()
}

const removeItem = (id) => {
  delete basket.value[id]
  updateBasket()
}

// Оформление заказа
const checkout = () => {
  // Сохраняем корзину и переходим на оплату
  if (process.client) {
    localStorage.setItem('currentOrderBasket', JSON.stringify(basket.value))
  }
  navigateTo('/payment')
}
</script>

<style scoped>
/* ===== Фон страницы ===== */
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  color: #e0d0ff;
}

/* ===== Заголовок ===== */
.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}

/* ===== Ссылка назад ===== */
.back-link {
  font-size: 2rem;
  text-decoration: none;
  color: #ff7bff;
  display: inline-block;
  transition: text-shadow 0.3s, color 0.3s;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
}
.back-link:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(255, 0, 255, 0.4);
}


/* ===== Пустая корзина ===== */
.empty-cart {
  text-align: center;
  padding: 40px 0;
}
.empty-cart p {
  font-size: 1.3rem;
  color: #b0a0c8;
}
.empty-cart .btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 28px;
  background: transparent;
  color: #ff7bff;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 16px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
}
.empty-cart .btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.5);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Обёртка корзины (блок с товарами и итогом) ===== */
.cart-wraper {
  background: transparent !important;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.1);
  backdrop-filter: blur(4px);
  transition: box-shadow 0.3s;
}
.cart-wraper:hover {
  box-shadow: 0 0 50px rgba(255, 0, 255, 0.2), 0 0 80px rgba(0, 255, 255, 0.1);
}

/* ===== Список товаров ===== */
.cart-list {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* ===== Элемент корзины ===== */
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.cart-item:last-child {
  border-bottom: none;
}

/* ===== Информация о товаре ===== */
.item-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
}
.item-price {
  font-size: 0.95rem;
  color: #88ddff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}

/* ===== Управление количеством ===== */
.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
.qty-btn {
  background: transparent;
  border: 2px solid rgba(255, 0, 255, 0.3);
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50%;
  color: #ff7bff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.05);
}
.qty-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  transform: scale(1.1);
}
.qty {
  min-width: 30px;
  text-align: center;
  font-weight: 700;
  color: #ffffff;
  font-size: 1.1rem;
}
.remove-btn {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 4px 8px;
  border-radius: 8px;
}
.remove-btn:hover {
  color: #ff4444;
  background: rgba(255, 70, 70, 0.1);
  transform: scale(1.2);
}

/* ===== Итоговая сумма ===== */
.cart-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 20px 0 0 0;
  border-top: 2px solid rgba(255, 0, 255, 0.2);
  margin-top: 16px;
}
.text {
  color: #b0a0c8;
  margin-right: 20px;
}
.total-price {
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}

/* ===== Кнопка оформления заказа ===== */
.checkout-btn {
  display: block;
  width: 100%;
  padding: 16px;
  background: transparent;
  color: #ff7bff;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 24px;
}
.checkout-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Состояния загрузки и ошибки ===== */
.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}
.loading {
  color: #88ddff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}
.error {
  color: #ff6b6b;
  text-shadow: 0 0 20px rgba(255, 0, 0, 0.3);
}

/* ===== Адаптивность ===== */
@media (max-width: 600px) {
  .cart-page {
    padding: 12px;
  }
  .section-title {
    font-size: 1.6rem;
  }
  .cart-wraper {
    padding: 16px;
  }
  .cart-item {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 14px 0;
  }
  .item-info {
    flex: unset;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .item-controls {
    justify-content: flex-end;
  }
  .cart-total {
    font-size: 1.2rem;
    justify-content: space-between;
  }
  .checkout-btn {
    font-size: 1rem;
    padding: 14px;
  }
}
@media (max-width: 420px) {
  .cart-page {
    padding: 8px;
  }
  .cart-wraper {
    padding: 12px;
  }
  .item-name {
    font-size: 0.95rem;
  }
  .item-price {
    font-size: 0.85rem;
  }
  .qty-btn {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
  .remove-btn {
    font-size: 1.2rem;
  }
}
</style>