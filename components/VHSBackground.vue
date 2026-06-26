<template>
  <div class="vhs-background" :style="backgroundStyle">
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
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
.vhs-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
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
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

.vhs-scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  opacity: 0.8;
}

.vhs-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 30% 40%, v-bind('props.primaryColor + "33"'), transparent 60%),
    radial-gradient(circle at 70% 60%, v-bind('props.secondaryColor + "33"'), transparent 60%),
    radial-gradient(circle at 50% 80%, v-bind('props.accentColor + "22"'), transparent 50%);
  opacity: 0.7;
  mix-blend-mode: screen;
  animation: glowPulse 8s ease-in-out infinite alternate;
}

@keyframes glowPulse {
  0% { opacity: 0.5; transform: scale(1); }
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
  box-shadow:
    inset 0 0 100px rgba(255, 0, 255, 0.1),
    inset 0 0 100px rgba(0, 255, 255, 0.1),
    0 0 80px rgba(255, 0, 255, 0.05),
    0 0 80px rgba(0, 255, 255, 0.05);
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
}
</style>