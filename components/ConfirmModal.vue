<template>
  <div class="confirm-modal-overlay" :class="{ active: open }" @click.self="close">
    <div class="confirm-modal-box">
      <button class="confirm-modal-close" @click="close">&times;</button>
      <h3 class="confirm-modal-title">{{ title || 'Подтверждение' }}</h3>
      <p class="confirm-modal-message">{{ message || 'Вы уверены?' }}</p>
      <div class="confirm-modal-actions">
        <button class="confirm-btn cancel" @click="close">Отмена</button>
        <button class="confirm-btn confirm" @click="confirm">Да, выйти</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  title: String,
  message: String
})
const emit = defineEmits(['close', 'confirm'])

const close = () => emit('close')
const confirm = () => {
  emit('confirm')
  close()
}
</script>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 3000;
}
.confirm-modal-overlay.active {
  display: flex;
}
.confirm-modal-box {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.confirm-modal-close {
  position: absolute;
  top: 12px;
  right: 18px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}
.confirm-modal-title {
  margin-top: 0;
  margin-bottom: 10px;
}
.confirm-modal-message {
  margin-bottom: 20px;
}
.confirm-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}
.confirm-btn.cancel {
  background: #eee;
  color: #333;
}
.confirm-btn.cancel:hover {
  background: #ddd;
}
.confirm-btn.confirm {
  background: #d9534f;
  color: white;
}
.confirm-btn.confirm:hover {
  background: #c9302c;
}
</style>