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
.modal-close{
  
  color: #333;
}
.modal-title{
  color: #f0f0f0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-overlay.active {
  display: flex;
}
.modal-box {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  position: relative;
  margin: 20px;
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
}
</style>