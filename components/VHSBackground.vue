<template>
  <div class="vhs-background" :style="backgroundStyle">
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
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  primaryColor: { type: String, default: '#ff00ff' },
  secondaryColor: { type: String, default: '#00ffff' },
  accentColor: { type: String, default: '#ff0080' },
  intensity: { type: Number, default: 5 },
  showGrid: { type: Boolean, default: true },
  performanceMode: { type: Boolean, default: false } // включает экономию ресурсов
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
/* ===== Основной контейнер ===== */
.vhs-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
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
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

/* ===== 2. Сканирующие линии ===== */
.vhs-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  opacity: 0.8;
  pointer-events: none;
}

/* ===== 3. Свечение + шум в одном слое ===== */
.vhs-glow-noise {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 40%, v-bind('props.primaryColor + "33"'), transparent 60%),
    radial-gradient(circle at 70% 60%, v-bind('props.secondaryColor + "33"'), transparent 60%),
    radial-gradient(circle at 50% 80%, v-bind('props.accentColor + "22"'), transparent 50%);
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
}

@keyframes glowPulse {
  0% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 0.9; transform: scale(1.02); }
}

/* ===== 4. Цветовая аберрация + свечение по краям ===== */
.vhs-chromatic-edge {
  position: absolute;
  inset: 0;
  box-shadow:
    inset 0 0 100px rgba(255, 0, 255, 0.1),
    inset 0 0 100px rgba(0, 255, 255, 0.1),
    0 0 80px rgba(255, 0, 255, 0.05),
    0 0 80px rgba(0, 255, 255, 0.05);
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
}
</style>