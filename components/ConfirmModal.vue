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
<<<<<<< HEAD
/* ===== Оверлей (фон) ===== */
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
  background: rgba(10, 0, 21, 0.85); /* тёмный, как у других модалок */
=======
  background: rgba(0,0,0,0.5);
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 3000;
<<<<<<< HEAD
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
.confirm-modal-overlay.active {
  display: flex;
}
<<<<<<< HEAD

/* ===== Контейнер модалки ===== */
.confirm-modal-box {
  padding: 30px 32px;
  border-radius: 24px;
  max-width: 420px;
  width: 90%;
  position: relative;
  border: 2px solid rgba(255, 0, 255, 0.6);
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.4),
    0 0 80px rgba(0, 255, 255, 0.3),
    inset 0 0 40px rgba(255, 0, 255, 0.05);
  transition: box-shadow 0.3s;
}
.confirm-modal-box:hover {
  box-shadow:
    0 0 60px rgba(255, 0, 255, 0.6),
    0 0 100px rgba(0, 255, 255, 0.4);
}


=======
.confirm-modal-box {
  background: #1a1a2e;
  padding: 30px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.confirm-modal-close {
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
.confirm-modal-close:hover {
  color: #88ddff;
  text-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
}

/* ===== Заголовок ===== */
.confirm-modal-title {
  margin-top: 0;
  margin-bottom: 10px;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

/* ===== Сообщение ===== */
.confirm-modal-message {
  margin-bottom: 24px;
  color: #e0d0ff;
  font-size: 1.1rem;
  line-height: 1.5;
  text-align: center;
}

/* ===== Контейнер кнопок ===== */
.confirm-modal-actions {
  display: flex;
  justify-content: center;    
  gap: 16px;
}

/* ===== Общий стиль кнопок ===== */
.confirm-btn {
  padding: 12px 28px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  border: 2px solid rgba(255, 0, 255, 0.3);
  box-shadow: 0 0 15px rgba(255, 0, 255, 0.1);
  color: #e0d0ff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  min-width: 100px;
}

/* ===== Кнопка "Отмена" ===== */
.confirm-btn.cancel {
  border-color: rgba(255, 255, 255, 0.2);
  color: #b0a0c8;
}
.confirm-btn.cancel:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #ff7bff;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  color: #fff;
  transform: scale(1.02);
}

/* ===== Кнопка "Да, выйти" (подтверждение) ===== */
.confirm-btn.confirm {
  border-color: rgba(255, 70, 70, 0.6);
  color: #ff6b6b;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
}
.confirm-btn.confirm:hover {
  background: rgba(255, 70, 70, 0.1);
  border-color: #ff4444;
  box-shadow:
    0 0 40px rgba(255, 0, 0, 0.5),
    0 0 80px rgba(255, 0, 0, 0.3);
  color: #ff8888;
  transform: scale(1.02);
}

/* ===== Адаптивность (только отступы и размеры) ===== */
@media (max-width: 480px) {
  .confirm-modal-box {
    padding: 20px 16px;
  }
  .confirm-modal-title {
    font-size: 1.4rem;
  }
  .confirm-modal-message {
    font-size: 1rem;
  }
  .confirm-modal-actions {
    flex-direction: column;
    gap: 12px;
  }
  .confirm-btn {
    width: 100%;
    padding: 12px;
    min-width: unset;
  }
=======
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #f0f0f0;
}
.confirm-modal-title {
  margin-top: 0;
  margin-bottom: 10px;
  color: #f0f0f0;
}
.confirm-modal-message {
  margin-bottom: 20px;
  color: #f0f0f0;
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
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
</style>