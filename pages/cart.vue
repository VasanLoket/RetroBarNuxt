<template>
  <section class="cart-page">
    <h2 class="section-title">Корзина</h2>
    <NuxtLink to="/" class="back-link">&#8592; На главную</NuxtLink>

    <div v-if="pending" class="loading">Загрузка...</div>
    <div v-else-if="error" class="error">{{ error.message }}</div>
    <div v-else-if="!cartItems.length" class="empty-cart">
      <p>Корзина пуста</p>
      <NuxtLink to="/menu" class="btn">Перейти в меню</NuxtLink>
    </div>
    <div v-else>
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
        <span>Итого:</span>
        <span class="total-price">{{ totalPrice }} ₽</span>
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
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}
.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
}
.back-link:hover {
  color: #f0a500;
}
.empty-cart {
  text-align: center;
  padding: 40px 0;
}
.empty-cart .btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #f0a500;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}
.cart-list {
  border-top: 1px solid #ddd;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.item-info {
  flex: 2;
}
.item-name {
  font-size: 1.1rem;
  font-weight: bold;
}
.item-price {
  margin-left: 15px;
  color: #888;
}
.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}
.qty-btn {
  background: #eee;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
}
.qty-btn:hover {
  background: #ccc;
}
.qty {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}
.remove-btn {
  background: none;
  border: none;
  color: #d9534f;
  font-size: 1.4rem;
  cursor: pointer;
  margin-left: 5px;
}
.remove-btn:hover {
  color: #c9302c;
}
.cart-total {
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px 0;
  border-top: 2px solid #333;
  margin-top: 20px;
}
.total-price {
  margin-left: 20px;
  color: #f0a500;
}
.checkout-btn {
  display: block;
  width: 100%;
  padding: 15px;
  background: #1a1a2e;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 20px;
}
.checkout-btn:hover {
  background: #f0a500;
  color: #1a1a2e;
}
.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}
.error {
  color: red;
}
</style>