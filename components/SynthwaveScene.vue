<template>
  <div ref="containerRef" class="neon-bg-container">
    <!-- Canvas рисует только небо, пол и сетку -->
    <canvas ref="canvasRef"></canvas>

    <!-- Слой с солнцем, обрезанный маской ровно по линии горизонта -->
    <div class="sun-layer" :style="sunLayerStyle">
      <div class="sun-wrapper" :style="sunWrapperStyle">
        <div class="sun"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)
const canvasRef = ref(null)
let resizeObserver = null
let isDrawing = false

const props = defineProps({
  gridColor: { type: String, default: '#00ffff' },
  bgColorTop: { type: String, default: '#040a14' },
  bgColorBottom: { type: String, default: '#0a1520' },
  horizonHeight: { type: Number, default: 0.4 },
  squareSize: { type: Number, default: 45 },
  spreadFactor: { type: Number, default: 1.5 },
  parallaxSpeed: { type: Number, default: 0.2 },
  
  // Цвета для CSS солнца
  sunTopColor: { type: String, default: '#ffe100' },
  sunMidColor: { type: String, default: '#ff7b00' },
  sunBotColor: { type: String, default: '#ff00ff' },
  
  // НОВОЕ: Какая часть солнца скрыта под горизонтом (0.2 = 20% скрыто, 0.5 = ровно наполовину)
  sunHiddenRatio: { type: Number, default: 0.2 } 
})

const scrollY = ref(0)

// Реактивные данные для CSS солнца
const sunSize = ref('0px')
const sunWrapperStyle = ref({ top: '0px' })
// НОВОЕ: Стили для маски, обрезающей солнце
const sunLayerStyle = ref({ 
  webkitMaskImage: 'none', 
  maskImage: 'none' 
})

const drawScene = () => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const ctx = canvas.getContext('2d')
  const rect = container.getBoundingClientRect()

  const dpr = window.devicePixelRatio || 1
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`
  ctx.scale(dpr, dpr)

  const w = rect.width
  const h = rect.height
  
  // Вычисляем горизонт с учетом скролла
  const baseHorizonY = h * props.horizonHeight
  const scrollOffset = scrollY.value * props.parallaxSpeed
  const horizonY = Math.max(0, baseHorizonY - scrollOffset)

  const centerX = w / 2

  // --- 1. Небо ---
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY)
  skyGrad.addColorStop(0, props.bgColorTop)
  skyGrad.addColorStop(1, props.bgColorBottom)
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, horizonY)

  // --- 2. Пол ---
  const floorGrad = ctx.createLinearGradient(0, horizonY, 0, h)
  floorGrad.addColorStop(0, props.bgColorBottom)
  floorGrad.addColorStop(1, '#01030a')
  ctx.fillStyle = floorGrad
  ctx.fillRect(0, horizonY, w, h - horizonY)

  // --- 3. Линия горизонта ---
  ctx.shadowColor = props.gridColor
  ctx.shadowBlur = 50
  ctx.fillStyle = props.gridColor
  ctx.fillRect(0, horizonY - 2, w, 4)
  
  ctx.shadowBlur = 10
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, horizonY - 0.5, w, 1)
  ctx.shadowBlur = 0

  // --- 4. Перспективная сетка ---
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, horizonY, w, h - horizonY)
  ctx.clip()

  const stepX = props.squareSize 
  const spreadX = w * props.spreadFactor 

  // Вертикальные линии
  ctx.shadowColor = props.gridColor
  ctx.shadowBlur = 15
  ctx.strokeStyle = props.gridColor + '44'
  ctx.lineWidth = 4
  for (let x = -spreadX; x <= spreadX; x += stepX) {
    ctx.beginPath()
    ctx.moveTo(centerX, horizonY)
    ctx.lineTo(centerX + x, h)
    ctx.stroke()
  }
  
  ctx.shadowBlur = 0
  ctx.lineWidth = 1.5
  for (let x = -spreadX; x <= spreadX; x += stepX) {
    const alpha = 1 - Math.abs(x) / spreadX * 0.4
    const hexAlpha = Math.floor(alpha * 200).toString(16).padStart(2, '0')
    ctx.strokeStyle = props.gridColor + hexAlpha
    ctx.beginPath()
    ctx.moveTo(centerX, horizonY)
    ctx.lineTo(centerX + x, h)
    ctx.stroke()
  }

  // Горизонтальные линии
  let spacing = 4
  ctx.shadowColor = props.gridColor
  ctx.shadowBlur = 10
  ctx.strokeStyle = props.gridColor + '44'
  ctx.lineWidth = 3
  for (let y = horizonY + 4; y < h; y += spacing) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
    spacing += 0.6
    if (spacing > stepX) spacing = stepX
  }

  ctx.shadowBlur = 0
  ctx.lineWidth = 1.2
  spacing = 4
  for (let y = horizonY + 4; y < h; y += spacing) {
    const alpha = 1 - (y - horizonY) / (h - horizonY) * 0.7
    const hexAlpha = Math.floor(alpha * 200).toString(16).padStart(2, '0')
    ctx.strokeStyle = props.gridColor + hexAlpha
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
    spacing += 0.6
    if (spacing > stepX) spacing = stepX
  }

  ctx.restore()

  // --- 5. Финальный туман ---
  const fogGrad = ctx.createLinearGradient(0, h * 0.85, 0, h)
  fogGrad.addColorStop(0, 'rgba(0,0,0,0)')
  fogGrad.addColorStop(1, 'rgba(0,0,0,0.7)')
  ctx.fillStyle = fogGrad
  ctx.fillRect(0, h * 0.85, w, h * 0.15)

  // --- 6. Синхронизация CSS солнца с Canvas-горизонтом ---
  const sunR = w * 0.18
  const sunSizePx = sunR * 2
  sunSize.value = sunSizePx + 'px'
  
  // ИЗМЕНЕНИЕ: Центр солнца смещен вверх так, чтобы под горизонтом скрывалась только часть, заданная пропсом
  const sunY = horizonY - sunR * (1 - props.sunHiddenRatio) 
  const sunTopPos = sunY - sunR
  sunWrapperStyle.value = { top: sunTopPos + 'px' }

  // НОВОЕ: Применяем градиентную маску к целому слою солнца, чтобы обрезать всё, что ниже горизонта
  const maskGrad = `linear-gradient(to bottom, black 0%, black ${horizonY}px, transparent ${horizonY}px, transparent 100%)`;
  sunLayerStyle.value = {
    webkitMaskImage: maskGrad,
    maskImage: maskGrad
  };
}

const onScroll = () => {
  scrollY.value = window.scrollY
  if (!isDrawing) {
    isDrawing = true
    window.requestAnimationFrame(() => {
      drawScene()
      isDrawing = false
    })
  }
}

onMounted(() => {
  drawScene()
  window.addEventListener('scroll', onScroll, { passive: true })
  resizeObserver = new ResizeObserver(() => drawScene())
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.neon-bg-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: visible; 
  background: #040a14;
}

.neon-bg-container canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: inset(0); 
}

/* --- Слой с солнцем --- */
.sun-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  /* Маска будет применена через v-bind в JS */
}

.sun-wrapper {
  position: absolute;
  width: v-bind('sunSize');
  height: v-bind('sunSize');
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  overflow: visible;
}

.sun {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  
  background: linear-gradient(
    to bottom,
    v-bind('props.sunTopColor'),
    v-bind('props.sunMidColor') 45%,
    v-bind('props.sunBotColor')
  );
  
  box-shadow:
    0 0 40px v-bind('props.sunBotColor'),
    0 0 100px v-bind('props.sunBotColor'),
    inset 0 0 30px v-bind('props.sunBotColor');
}

.sun::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;

  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 12px,
    v-bind('props.sunBotColor') 12px,
    v-bind('props.sunBotColor') 16px
  );

  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent 40%, black 40%, black 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, transparent 40%, black 40%, black 100%);
}
</style>