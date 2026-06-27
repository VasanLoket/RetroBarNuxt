<template>
  <div class="vhs-background" :style="backgroundStyle">
<<<<<<< HEAD
    <!-- Основные слои объединены для меньшего количества DOM-элементов -->
    <div class="vhs-effects" :class="{ 'performance-mode': performanceMode }">
      <!-- Сетка (одна, вместо двух) -->
      <div class="vhs-grid" v-if="showGrid"></div>
      
      <!-- Сканирующие линии -->
      <div class="vhs-scanlines"></div>
      
      <!-- Свечение и шум объединены в один слой -->
      <div class="vhs-glow-noise"></div>
      
      <!-- Цветовая аберрация и свечение по краям -->
      <div class="vhs-chromatic-edge"></div>
    </div>
=======
    <!-- Существующие слои -->
    <div class="vhs-grid"></div>
    <div class="vhs-scanlines"></div>
    <div class="vhs-glow"></div>
    <div class="vhs-noise"></div>
    <div class="vhs-chromatic"></div>

    <!-- Свечение по бокам (слева и справа) -->
    <div class="vhs-side-glow"></div>

    <!-- НОВОЕ: Неоновое свечение по всем краям (рамка) -->
    <div class="vhs-edge-glow"></div>

    

    <!-- Статичная сетка -->
    <div class="vhs-static-grid"></div>
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
<<<<<<< HEAD
  primaryColor: { type: String, default: '#ff00ff' },
  secondaryColor: { type: String, default: '#00ffff' },
  accentColor: { type: String, default: '#ff0080' },
  intensity: { type: Number, default: 5 },
  showGrid: { type: Boolean, default: true },
  performanceMode: { type: Boolean, default: false } // включает экономию ресурсов
=======
  primaryColor: {
    type: String,
    default: '#ff00ff'
  },
  secondaryColor: {
    type: String,
    default: '#00ffff'
  },
  accentColor: {
    type: String,
    default: '#ff0080'
  },
  intensity: {
    type: Number,
    default: 5,
    min: 0,
    max: 10
  },
  showGrid: {
    type: Boolean,
    default: true
  }
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
})

const backgroundStyle = computed(() => ({
  background: `
    radial-gradient(ellipse at 20% 50%, rgba(20, 0, 40, 0.8), #0a0a12),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(0, 0, 0, 0.03) 4px
    )
  `
}))
</script>

<style scoped>
<<<<<<< HEAD
/* ===== Основной контейнер ===== */
=======
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
.vhs-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
<<<<<<< HEAD
  transform: translateZ(0);
  will-change: transform;
}

/* ===== Общий слой для всех эффектов ===== */
.vhs-effects {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  will-change: transform;
}

/* ===== 1. Сетка (анимированная) ===== */
.vhs-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.6;
  animation: gridMove 20s linear infinite;
  will-change: transform;
=======
}

/* --- Существующие слои (без изменений) --- */
.vhs-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.6;
  animation: gridMove 20s linear infinite;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

<<<<<<< HEAD
/* ===== 2. Сканирующие линии ===== */
.vhs-scanlines {
  position: absolute;
  inset: 0;
=======
.vhs-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  opacity: 0.8;
<<<<<<< HEAD
  pointer-events: none;
}

/* ===== 3. Свечение + шум в одном слое ===== */
.vhs-glow-noise {
  position: absolute;
  inset: 0;
=======
}

.vhs-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  background:
    radial-gradient(circle at 30% 40%, v-bind('props.primaryColor + "33"'), transparent 60%),
    radial-gradient(circle at 70% 60%, v-bind('props.secondaryColor + "33"'), transparent 60%),
    radial-gradient(circle at 50% 80%, v-bind('props.accentColor + "22"'), transparent 50%);
<<<<<<< HEAD
  mix-blend-mode: screen;
  opacity: 0.7;
  animation: glowPulse 8s ease-in-out infinite alternate;
  transform: translateZ(0);
  will-change: opacity, transform;
}

/* Шум добавляем через псевдоэлемент, чтобы не создавать лишний слой */
.vhs-glow-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.3;
  mix-blend-mode: overlay;
  pointer-events: none;
  animation: noise 0.3s steps(3) infinite;
  will-change: transform;
}

@keyframes noise {
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-1%, -0.5%) scale(1.01); }
  50% { transform: translate(0.5%, -1%) scale(0.99); }
  75% { transform: translate(-0.5%, 1%) scale(1.005); }
  100% { transform: translate(0, 0) scale(1); }
=======
  opacity: 0.7;
  mix-blend-mode: screen;
  animation: glowPulse 8s ease-in-out infinite alternate;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}

@keyframes glowPulse {
  0% { opacity: 0.5; transform: scale(1); }
<<<<<<< HEAD
  100% { opacity: 0.9; transform: scale(1.02); }
}

/* ===== 4. Цветовая аберрация + свечение по краям ===== */
.vhs-chromatic-edge {
  position: absolute;
  inset: 0;
=======
  100% { opacity: 0.9; transform: scale(1.05); }
}

.vhs-noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 2%),
    repeating-radial-gradient(circle at 70% 30%, rgba(0,0,0,0.05) 0%, transparent 3%);
  mix-blend-mode: overlay;
  opacity: 0.4;
  animation: noise 0.3s steps(3) infinite;
}

@keyframes noise {
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-2%, -1%) scale(1.02); }
  50% { transform: translate(1%, -2%) scale(0.98); }
  75% { transform: translate(-1%, 2%) scale(1.01); }
  100% { transform: translate(0, 0) scale(1); }
}

.vhs-chromatic {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
  box-shadow:
    inset 0 0 100px rgba(255, 0, 255, 0.1),
    inset 0 0 100px rgba(0, 255, 255, 0.1),
    0 0 80px rgba(255, 0, 255, 0.05),
    0 0 80px rgba(0, 255, 255, 0.05);
<<<<<<< HEAD
  background:
    linear-gradient(to right, rgba(255, 0, 255, 0.08) 0%, transparent 15%, transparent 85%, rgba(0, 255, 255, 0.08) 100%),
    linear-gradient(to bottom, rgba(255, 0, 255, 0.08) 0%, transparent 10%, transparent 90%, rgba(0, 255, 255, 0.08) 100%);
  mix-blend-mode: screen;
  animation: chromaticEdge 4s ease-in-out infinite alternate;
  transform: translateZ(0);
  will-change: transform, opacity;
}

@keyframes chromaticEdge {
  0% { transform: translateX(-2px) scale(1.005); }
  50% { transform: translateX(2px) scale(0.995); }
  100% { transform: translateX(-1px) scale(1.01); }
}

/* ===== Performance Mode – отключаем тяжёлые эффекты ===== */
.performance-mode .vhs-grid {
  animation-duration: 40s; /* медленнее, меньше перерисовок */
  opacity: 0.3;
}

.performance-mode .vhs-glow-noise::before {
  opacity: 0.1; /* почти невидимый шум */
  animation-duration: 0.5s; /* реже обновляется */
}

.performance-mode .vhs-chromatic-edge {
  animation-duration: 8s;
  box-shadow: none; /* убираем тени */
  background: 
    linear-gradient(to right, rgba(255, 0, 255, 0.03) 0%, transparent 15%, transparent 85%, rgba(0, 255, 255, 0.03) 100%),
    linear-gradient(to bottom, rgba(255, 0, 255, 0.03) 0%, transparent 10%, transparent 90%, rgba(0, 255, 255, 0.03) 100%);
}

/* Адаптивность – на мобильных отключаем часть эффектов */
@media (max-width: 768px) {
  .vhs-grid {
    opacity: 0.3;
  }
  .vhs-glow-noise::before {
    opacity: 0.15;
  }
  .vhs-chromatic-edge {
    animation-duration: 8s;
    box-shadow: none;
  }
=======
  mix-blend-mode: screen;
  animation: chromaticShift 4s ease-in-out infinite alternate;
}

@keyframes chromaticShift {
  0% { transform: translateX(-3px) scale(1.01); }
  50% { transform: translateX(3px) scale(0.99); }
  100% { transform: translateX(-2px) scale(1.02); }
}

/* --- Свечение по бокам (слева и справа) --- */
.vhs-side-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(
      to right,
      rgba(255, 0, 255, 0.12) 0%,
      rgba(255, 0, 255, 0) 15%,
      transparent 85%,
      rgba(0, 255, 255, 0.12) 100%
    );
  mix-blend-mode: screen;
  opacity: 0.8;
  animation: sideGlowPulse 6s ease-in-out infinite alternate;
}

@keyframes sideGlowPulse {
  0% { opacity: 0.6; }
  100% { opacity: 0.9; }
}

/* --- НОВОЕ: Неоновое свечение по всем краям (рамка) --- */
.vhs-edge-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    /* Верхний край */
    linear-gradient(to bottom, rgba(255, 0, 255, 0.15) 0%, transparent 10%),
    /* Нижний край */
    linear-gradient(to top, rgba(0, 255, 255, 0.15) 0%, transparent 10%),
    /* Левый край */
    linear-gradient(to right, rgba(255, 0, 128, 0.15) 0%, transparent 10%),
    /* Правый край */
    linear-gradient(to left, rgba(0, 255, 255, 0.15) 0%, transparent 10%);
  mix-blend-mode: screen;
  pointer-events: none;
  opacity: 0.8;
  animation: edgeGlowPulse 5s ease-in-out infinite alternate;
}

@keyframes edgeGlowPulse {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* --- Статичная сетка (поверх всех анимаций) --- */
.vhs-static-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.04) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.04) 2px, transparent 2px);
  background-size: 50px 50px;
  opacity: 0.6;
  pointer-events: none;
}

/* Стили для отключения анимированной сетки (по пропсу) */
.vhs-grid {
  display: v-bind('props.showGrid ? "block" : "none"');
>>>>>>> 5bf747f2def4d26a116afcbcfc421fdc493df704
}
</style>