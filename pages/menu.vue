<template>
  <section class="menu-page-wrapper">
    <NuxtLink to="/" class="back-link">&#8592;</NuxtLink>
    <button class="cart-toggle-btn" @click="handleCartToggle">
      {{ isOrderMode ? 'Создать заказ' : 'Оформить заказ' }}
    </button>

    <div v-if="pending" class="loading">Загрузка меню...</div>
    <div v-else-if="error" class="error">{{ error.message || 'Ошибка загрузки' }}</div>
    <div v-else-if="!menuList.length" class="empty">Меню пусто</div>
    <div v-else class="menu-grid-container">
      <template v-for="(items, category) in groupedMenu" :key="category">
        <h2 class="category-section-title">{{ category }}</h2>
        <div v-for="item in items" :key="item.id" class="menu-card-item">
          <span class="menu-item-category">{{ item.category }}</span>
          <h3 class="menu-item-title">{{ item.name }}</h3>
          <span class="menu-item-price">{{ item.price }} ₽</span>
          <div v-if="isOrderMode" class="card-counter-widget">
            <button class="counter-btn minus-btn" @click.stop="decrement(item.id)">-</button>
            <span class="counter-value">{{ basket[item.id] || 0 }}</span>
            <button class="counter-btn plus-btn" @click.stop="increment(item.id)">+</button>
          </div>
        </div>
      </template>
    </div>

    <!-- Модалка пустой корзины -->
    <div class="menu-modal-overlay" :class="{ 'id-hidden': !showEmptyModal }" @click.self="closeEmptyModal">
      <div class="menu-modal-box">
        <button class="menu-modal-close" @click="closeEmptyModal">&times;</button>
        <h3 class="menu-modal-title">Ваша корзина пуста</h3>
        <p class="menu-modal-text">Пожалуйста, добавьте хотя бы одно блюдо перед созданием заказа.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'nuxt/app'

const router = useRouter()

const { data: menu, pending, error } = await useFetch('/api/menu')

const menuList = computed(() => {
  if (!menu.value) return []
  if (Array.isArray(menu.value)) return menu.value
  console.warn('API вернул не массив:', menu.value)
  return []
})

const groupedMenu = computed(() => {
  if (!menuList.value.length) return {}
  return menuList.value.reduce((acc, item) => {
    const cat = item.category || 'Без категории'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})
})

const isOrderMode = ref(false)
const basket = ref({})

if (process.client) {
  const saved = localStorage.getItem('currentOrderBasket')
  if (saved) {
    try { basket.value = JSON.parse(saved) } catch (e) {}
  }
}

watch(basket, (newVal) => {
  if (process.client) {
    localStorage.setItem('currentOrderBasket', JSON.stringify(newVal))
  }
}, { deep: true })

const increment = (id) => {
  basket.value[id] = (basket.value[id] || 0) + 1
}
const decrement = (id) => {
  if (basket.value[id] && basket.value[id] > 0) {
    basket.value[id] -= 1
  }
}

const showEmptyModal = ref(false)
const closeEmptyModal = () => { showEmptyModal.value = false }

const handleCartToggle = () => {
  if (isOrderMode.value) {
    const total = Object.values(basket.value).reduce((sum, qty) => sum + qty, 0)
    if (total === 0) {
      showEmptyModal.value = true
      return
    }
    if (process.client) {
      localStorage.setItem('currentOrderBasket', JSON.stringify(basket.value))
      localStorage.setItem('menuCatalogData', JSON.stringify(menuList.value))
    }
    router.push('/cart')
  } else {
    isOrderMode.value = true
  }
}

if (process.client) {
  const params = new URLSearchParams(window.location.search)
  if (params.get('mode') === 'order') {
    isOrderMode.value = true
  }
}
</script>

<style scoped>
.menu-page-wrapper {
  padding-left: 20hv;
  max-width: 100%;
  margin: 0 auto;
}
.back-link {
  font-size: 2rem;
  text-decoration: none;
  color: #333;
  display: inline-block;
}
.cart-toggle-btn {
  float: right;
  padding: 10px 20px;
  background: #1a1a2e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.cart-toggle-btn:hover {
  background: #f0a500;
}
.menu-grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}
.category-section-title {
  grid-column: 1 / -1;
  font-size: 1.8rem;
  margin: 20px 0 10px;
  border-bottom: 2px solid #ccc;
}
.menu-card-item {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.2s;
}
.menu-card-item:hover {
  transform: translateY(-3px);
}
.menu-item-category {
  display: block;
  font-size: 0.8rem;
  color: #888;
}
.menu-item-title {
  font-size: 1.2rem;
  margin: 8px 0 5px;
}
.menu-item-price {
  font-weight: bold;
  color: #f0a500;
}
.card-counter-widget {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
}
.counter-btn {
  background: #ddd;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.counter-btn:hover {
  background: #bbb;
}
.counter-value {
  margin: 0 10px;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}
.loading, .error, .empty {
  text-align: center;
  padding: 40px;
}
.error {
  color: red;
}
.menu-modal-overlay {
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
.menu-modal-overlay.id-hidden {
  display: none;
}
.menu-modal-box {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
}
.menu-modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}
.menu-modal-title {
  
  color:#1a1a2e;
  font-size: 1.5rem;
}
.menu-modal-text {
  color:#1a1a2e;
  margin-top: 10px;
}
</style>