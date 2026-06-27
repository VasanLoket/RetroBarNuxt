<template>
  <div class="modal-overlay" :class="{ active: open }" @click.self="closeModal">
    <div class="modal-box">
      <button class="modal-close" @click="closeModal">&times;</button>
      <h2 class="modal-title">{{ modalTitle }}</h2>
      <form class="auth-form" @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="login"
          placeholder="Логин"
          required
          class="auth-input"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Пароль"
          required
          class="auth-input"
        />
        <input
          type="password"
          v-model="passwordRepeat"
          placeholder="Повторите пароль"
          class="auth-input"
          :class="{ hidden: !isRegisterMode }"
          :required="isRegisterMode"
        />
        <button type="submit" class="auth-submit-btn">
          {{ isRegisterMode ? 'Зарегистрироваться' : 'Вход' }}
        </button>
      </form>
      <p class="switch-mode-text">
        <span @click="toggleMode" class="switch-link">
          {{ isRegisterMode ? 'Уже есть аккаунт? Войти' : 'Создать аккаунт (Регистрация)' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUser } from '~/composables/useUser'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const login = ref('')
const password = ref('')
const passwordRepeat = ref('')
const isRegisterMode = ref(false)

const { setUser } = useUser()

const modalTitle = computed(() => isRegisterMode.value ? 'Регистрация' : 'Вход в аккаунт')

const closeModal = () => {
  emit('close')
  login.value = ''
  password.value = ''
  passwordRepeat.value = ''
  isRegisterMode.value = false
}

const toggleMode = () => {
  isRegisterMode.value = !isRegisterMode.value
  passwordRepeat.value = ''
}

const handleSubmit = async () => {
  try {
    if (isRegisterMode.value && password.value !== passwordRepeat.value) {
      alert('Пароли не совпадают!')
      return
    }
    const endpoint = isRegisterMode.value ? '/api/auth/register' : '/api/auth/login'
    const response = await $fetch(endpoint, {
      method: 'POST',
      body: { login: login.value, password: password.value }
    })
    if (response.success && response.user) {
      setUser(response.user)
      closeModal()
    } else {
      alert('Ошибка при авторизации')
    }
  } catch (error) {
    alert(error.data?.statusMessage || 'Ошибка соединения с сервером')
  }
}
</script>

<style scoped>
<<<<<<< HEAD
/* ===== Оверлей (затемнение) ===== */
=======
.modal-close{
  
  color: #333;
}
.modal-title{
  color: #f0f0f0;
}
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
  background: rgba(10, 0, 21, 0.85);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
=======
  background: rgba(0,0,0,0.5);
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-overlay.active {
  display: flex;
}
<<<<<<< HEAD

/* ===== Бокс модалки ===== */
.modal-box {
  background: rgba(10, 0, 21, 0.95);
  padding: 30px 32px;
  border-radius: 24px;
=======
.modal-box {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 8px;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  max-width: 400px;
  width: 100%;
  position: relative;
  margin: 20px;
<<<<<<< HEAD
  border: 2px solid rgba(255, 0, 255, 0.6);
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.4),
    0 0 80px rgba(0, 255, 255, 0.3),
    inset 0 0 40px rgba(255, 0, 255, 0.05);
  transition: box-shadow 0.3s;
}
.modal-box:hover {
  box-shadow:
    0 0 60px rgba(255, 0, 255, 0.6),
    0 0 100px rgba(0, 255, 255, 0.4);
}

/* ===== Кнопка закрытия (крестик) ===== */
.modal-close {
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
.modal-close:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
}

/* ===== Заголовок ===== */
.modal-title {
  margin-top: 0;
  margin-bottom: 24px;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

/* ===== Форма ===== */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ===== Поля ввода ===== */
.auth-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(255, 0, 255, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  background: transparent;
  color: #ff7bff;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.05);
  box-sizing: border-box;
}
.auth-input:focus {
  outline: none;
  border-color: #ff7bff;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}
.auth-input::placeholder {
  color: rgba(224, 208, 255, 0.4);
}

/* ===== Поле повторения пароля (скрытое по умолчанию) ===== */
.auth-input.hidden {
  display: none;
}

/* ===== Кнопка отправки ===== */
.auth-submit-btn {
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
  margin-top: 8px;
}
.auth-submit-btn:hover {
  background: rgba(255, 0, 255, 0.1);
  border-color: #ff7bff;
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.5),
    0 0 80px rgba(0, 255, 255, 0.3);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Переключение режима (текст внизу) ===== */
.switch-mode-text {
  text-align: center;
  margin-top: 20px;
  color: #b0a0c8;
  font-size: 0.95rem;
}
.switch-link {
  color: #88ddff;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s, text-shadow 0.3s;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
}
.switch-link:hover {
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.4);
}

/* ===== Адаптивность ===== */
@media (max-width: 480px) {
  .modal-box {
    padding: 20px 16px;
    margin: 12px;
  }
  .modal-title {
    font-size: 1.4rem;
  }
  .auth-input {
    padding: 10px 14px;
    font-size: 0.95rem;
  }
  .auth-submit-btn {
    font-size: 1rem;
    padding: 12px;
  }
=======
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
.hidden {
  display: none;
}
.switch-link {
  cursor: pointer;
  color: #f0a500;
  text-decoration: underline;
}
.switch-link:hover {
  color: #d48900;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
</style>