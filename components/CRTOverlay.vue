<template>
  <div 
    class="cyberpunk-glitch-overlay" 
    :class="{ 'performance-mode': performanceMode }"
  >
    <!-- 1. Сканирующие линии (оставляем, они лёгкие) -->
    <div class="scanlines"></div>
    
    <!-- 2. Шум + глитч-бары объединены в один слой -->
    <div class="noise-glitch"></div>

    <!-- 3. Разрыв экрана (оставляем, но можно отключать в perf-mode) -->
    <div class="screen-tear" v-if="!performanceMode"></div>

    <!-- 4. Виньетка + свечение по краям (облегчённая) -->
    <div class="vignette-glow"></div>
  </div>
</template>

<script setup>
defineProps({
  performanceMode: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* ===== Контейнер (без изменений) ===== */
.cyberpunk-glitch-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
  mix-blend-mode: overlay;
  transform: translateZ(0);
  will-change: transform;
}

/* ===== 1. Сканирующие линии ===== */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: move-lines 8s linear infinite;
  will-change: background-position;
}

@keyframes move-lines {
  0% { background-position-y: 0; }
  100% { background-position-y: 30px; }
}

/* ===== 2. Шум + глитч-бары (объединены) ===== */
.noise-glitch {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.5;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Глитч-бары через псевдоэлементы (были в отдельном слое .glitch-bars) */
/* ===== 2. Шум + глитч-бары (оптимизировано) ===== */
.noise-glitch {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E");
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
  will-change: transform; /* только transform, не top */
}


.noise-glitch::before,
.noise-glitch::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 15px;
  opacity: 0;  
  will-change: transform, opacity;
  transform: translateY(0);
}

.noise-glitch::before {
  background: rgba(255, 0, 60, 0.7);
  /* убрали box-shadow, оставили только цвет */
  animation: glitch-red 4s infinite linear;
}

.noise-glitch::after {
  background: rgba(0, 240, 255, 0.7);
  animation: glitch-blue 3.5s infinite linear;
}

/* ===== Оптимизированные анимации (без top, только transform) ===== */
@keyframes glitch-red {
  0% { transform: translateY(-10%) translateX(0); opacity: 0; }
  2% { transform: translateY(15%) translateX(-30px); opacity: 1; }
  4% { transform: translateY(20%) translateX(20px); opacity: 0; }
  100% { transform: translateY(110%) translateX(0); opacity: 0; }
}

@keyframes glitch-blue {
  0% { transform: translateY(110%) translateX(0); opacity: 0; }
  3% { transform: translateY(40%) translateX(30px); opacity: 1; }
  6% { transform: translateY(35%) translateX(-20px); opacity: 0; }
  100% { transform: translateY(-10%) translateX(0); opacity: 0; }
}
/* ===== 3. Разрыв экрана (screen-tear) ===== */
.screen-tear {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 0;
  border-top: 2px solid rgba(0, 240, 255, 0.5);
  box-shadow: 0 10px 30px rgba(255, 0, 60, 0.6);
  animation: tear-animation 7s infinite;
  will-change: top, height, transform;
}

/* ===== 4. Виньетка + свечение ===== */
.vignette-glow {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.85) 100%),
    linear-gradient(to right, rgba(255, 0, 60, 0.1), transparent 20%, transparent 80%, rgba(0, 240, 255, 0.1));
  pointer-events: none;
  will-change: transform;
}

/* ===== Анимации глитч-баров ===== */
@keyframes glitch-red {
  0% { top: -5%; opacity: 0; }
  2% { top: 10%; opacity: 1; transform: translateX(-30px); }
  4% { top: 15%; opacity: 0; transform: translateX(20px); }
  100% { top: 100%; opacity: 0; }
}

@keyframes glitch-blue {
  0% { top: 100%; opacity: 0; }
  3% { top: 40%; opacity: 1; transform: translateX(30px); }
  6% { top: 45%; opacity: 0; transform: translateX(-20px); }
  100% { top: -10%; opacity: 0; }
}

/* ===== Анимация разрыва ===== */
@keyframes tear-animation {
  0% { top: 0%; height: 0; }
  15% { top: 0%; height: 0; }
  17% { top: 15%; height: 10px; transform: skewX(5deg); }
  19% { top: 15%; height: 10px; transform: skewX(-5deg); }
  21% { top: 15%; height: 0; }
  100% { top: 0%; height: 0; }
}

/* ============================================================
   PERFORMANCE MODE (отключаем тяжёлые эффекты)
   ============================================================ */

.performance-mode .noise-glitch {
  opacity: 0.2; /* делаем шум почти незаметным */
}

.performance-mode .noise-glitch::before,
.performance-mode .noise-glitch::after {
  animation-duration: 8s, 7s; /* замедляем глитч-бары */
  opacity: 0.4; /* делаем их бледнее */
  height: 8px; /* уменьшаем высоту */
}

.performance-mode .screen-tear {
  display: none; /* полностью убираем разрыв экрана */
}

.performance-mode .vignette-glow {
  background: 
    radial-gradient(circle at 50% 50%, transparent 70%, rgba(0, 0, 0, 0.7) 100%),
    linear-gradient(to right, rgba(255, 0, 60, 0.05), transparent 20%, transparent 80%, rgba(0, 240, 255, 0.05));
  /* уменьшаем интенсивность виньетки и свечения */
}

.performance-mode .scanlines {
  opacity: 0.6; /* делаем линии чуть прозрачнее */
  animation-duration: 12s; /* замедляем движение */
}

/* ===== Адаптивность для мобильных (автоматически) ===== */
@media (max-width: 768px) {
  .noise-glitch {
    opacity: 0.25;
  }
  .noise-glitch::before,
  .noise-glitch::after {
    animation-duration: 8s, 7s;
    opacity: 0.3;
    height: 6px;
  }
  .screen-tear {
    display: none;
  }
  .vignette-glow {
    background: 
      radial-gradient(circle at 50% 50%, transparent 70%, rgba(0, 0, 0, 0.8) 100%),
      linear-gradient(to right, rgba(255, 0, 60, 0.05), transparent 20%, transparent 80%, rgba(0, 240, 255, 0.05));
  }
  .scanlines {
    opacity: 0.5;
  }
}
</style>