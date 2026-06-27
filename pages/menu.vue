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
        <!-- Изображение блюда -->
        <div class="menu-item-image-wrapper">
          <img
            :src="item.image || '/img/placeholder.jpg'"
            :alt="item.name"
            class="menu-item-image"
            @error="(e) => e.target.src = '/img/placeholder.jpg'" loading="lazy"
          />
        </div>

        <span class="menu-item-category">{{ item.category }}</span>
        <h3 class="menu-item-title">{{ item.name }}</h3>
        <span class="menu-item-price">{{ item.price }} ₽</span>

        <!-- Блок порции (добавленный ранее) -->
        <div v-if="item.portion_value && item.portion_unit" class="menu-item-portion">
          {{ item.portion_value }} {{ item.portion_unit }}
        </div>

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
<<<<<<< HEAD
/* ===== Фон страницы ===== */
.menu-page-wrapper {
  
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  color: #e0d0ff;
  padding: 20px;
  padding-left: 200px;
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

/* ===== Кнопка переключения режима ===== */
.cart-toggle-btn {
  float: right;
  padding: 12px 24px;
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
}
.cart-toggle-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Сетка меню (позиционирование не меняем) ===== */
=======
.menu-item-portion {
  font-size: 0.9rem;
  color: #777;
  margin: 4px 0 8px;
}
.menu-page-wrapper {
  padding-left: 20hv;
  max-width: 100%;
  margin: 0 auto;
}



.menu-item-image {
  width: 100%;
  aspect-ratio: 1 / 1; /* квадрат */
  object-fit: cover;   /* обрезает лишнее, сохраняя пропорции */
  display: block;
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.menu-grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}
<<<<<<< HEAD

/* ===== Заголовки категорий ===== */
.category-section-title {
  grid-column: 1 / -1;
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  margin: 20px 0 10px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(255, 0, 255, 0.3);
}

/* ===== Карточка товара ===== */
.menu-card-item {
  background: transparent !important;
  border: 2px solid rgba(255, 0, 255, 0.25);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  backdrop-filter: blur(4px);
}
.menu-card-item:hover {
  transform: translateY(-4px);
  border-color: #ff7bff;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.3), 0 0 80px rgba(0, 255, 255, 0.15);
}

/* ===== Обёртка изображения ===== */
.menu-item-image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 0, 255, 0.15);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.05);
=======
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
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%; 
}

.menu-item-image-wrapper {
  width: 100%;
  /* фиксируем высоту, чтобы картинка не сжималась */
  aspect-ratio: 1 / 1; /* квадрат */
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0; /* чтобы при флексе картинка не сжималась */
  margin-bottom: 10px;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
.menu-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
<<<<<<< HEAD
  transition: transform 0.4s;
}
.menu-card-item:hover .menu-item-image {
  transform: scale(1.04);
}

/* ===== Текст внутри карточки ===== */
.menu-item-category {
  display: block;
  font-size: 0.8rem;
  color: #88ddff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.menu-item-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 8px 0 5px;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}
.menu-item-price {
  font-weight: 700;
  color: #ff7bff;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
}
.menu-item-portion {
  font-size: 0.9rem;
  color: #b0a0c8;
  margin: 4px 0 8px;
}

/* ===== Виджет счётчика ===== */
=======
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.card-counter-widget {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
<<<<<<< HEAD
  background: transparent;
  gap: 6px;
}
.counter-btn {
  background: transparent;
  border: 2px solid rgba(255, 0, 255, 0.3);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ff7bff;
=======
}
.counter-btn {
  background: #ddd;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  border-radius: 50%;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
<<<<<<< HEAD
  transition: all 0.2s;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.05);
}
.counter-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  transform: scale(1.1);
}
.counter-btn.minus-btn:hover {
  border-color: #ff6b6b;
  box-shadow: 0 0 20px rgba(255, 70, 70, 0.3);
}
.counter-btn.plus-btn:hover {
  border-color: #5cb85c;
  box-shadow: 0 0 20px rgba(70, 255, 70, 0.3);
}
.counter-value {
  margin: 0 8px;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
  color: #ffffff;
  font-size: 1.1rem;
}

/* ===== Состояния загрузки/ошибки/пусто ===== */
.loading, .error, .empty {
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
.empty {
  color: #b0a0c8;
}

/* ===== Модалка пустой корзины ===== */
=======
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.menu-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
  background: rgba(10, 0, 21, 0.85);
  backdrop-filter: blur(4px);
=======
  background: rgba(0,0,0,0.5);
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.menu-modal-overlay.id-hidden {
  display: none;
}
.menu-modal-box {
<<<<<<< HEAD
  background: rgba(10, 0, 21, 0.95);
  padding: 30px 32px;
  border-radius: 24px;
  max-width: 400px;
  width: 90%;
  position: relative;
  border: 2px solid rgba(255, 0, 255, 0.6);
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.4), 0 0 80px rgba(0, 255, 255, 0.3);
}
.menu-modal-close {
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
.menu-modal-close:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
}
.menu-modal-title {
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-top: 0;
}
.menu-modal-text {
  color: #e0d0ff;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 10px;
}

/* ===== Адаптивность ===== */
@media (max-width: 820px) {
  .menu-grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .menu-grid-container {
    grid-template-columns: 1fr;
  }
  .menu-page-wrapper {
    padding: 12px;
  }
  .cart-toggle-btn {
    float: none;
    display: block;
    width: 100%;
    margin-top: 16px;
    text-align: center;
  }
  .back-link {
    display: block;
    margin-bottom: 10px;
  }
  .category-section-title {
    font-size: 1.5rem;
  }
}
@media (max-width: 420px) {
  .menu-card-item {
    padding: 12px;
  }
  .menu-item-title {
    font-size: 1rem;
  }
  .counter-btn {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
  .menu-modal-box {
    padding: 20px 16px;
  }
  .menu-modal-title {
    font-size: 1.4rem;
  }
}
=======
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
</style>