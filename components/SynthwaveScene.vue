<template>
  <div ref="containerRef" class="neon-bg-container">
    <!-- Canvas рисуется один раз -->
    <canvas ref="canvasRef"></canvas>

    <!-- Заглушка-солнце (картинка) -->
    <div 
      ref="sunPlaceholderRef" 
      class="sun-placeholder"
      :style="sunPlaceholderStyle"
    >
      <img src="/img/sun-placeholder.png" alt="Sun" mode="lazy" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const containerRef = ref(null)
const canvasRef = ref(null)
const sunPlaceholderRef = ref(null)
let resizeObserver = null
let rafId = null

const props = defineProps({
  gridColor: { type: String, default: '#00ffff' },
  bgColorTop: { type: String, default: '#040a14' },
  bgColorBottom: { type: String, default: '#0a1520' },
  horizonHeight: { type: Number, default: 0.4 },
  squareSize: { type: Number, default: 45 },
  spreadFactor: { type: Number, default: 1.5 },
  parallaxSpeed: { type: Number, default: 0.2 },
})

const scrollY = ref(0)
const containerWidth = ref(0)
const containerHeight = ref(0)

const sunPlaceholderStyle = ref({
  top: '0px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '0px',
  height: '0px',
  position: 'absolute',
  pointerEvents: 'none',
  willChange: 'transform, top'
})

// --- Отрисовка Canvas (один раз) ---
const drawCanvas = () => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const rect = container.getBoundingClientRect()
  const w = rect.width
  const h = rect.height
  if (w === 0 || h === 0) return

  containerWidth.value = w
  containerHeight.value = h

  const dpr = window.devicePixelRatio || 1
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const horizonY = h * props.horizonHeight
  const centerX = w / 2

  // Небо
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY)
  skyGrad.addColorStop(0, props.bgColorTop)
  skyGrad.addColorStop(1, props.bgColorBottom)
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, horizonY)

  // Пол
  const floorGrad = ctx.createLinearGradient(0, horizonY, 0, h)
  floorGrad.addColorStop(0, props.bgColorBottom)
  floorGrad.addColorStop(1, '#01030a')
  ctx.fillStyle = floorGrad
  ctx.fillRect(0, horizonY, w, h - horizonY)

  // Горизонт
  ctx.shadowColor = props.gridColor
  ctx.shadowBlur = 50
  ctx.fillStyle = props.gridColor
  ctx.fillRect(0, horizonY - 2, w, 4)
  ctx.shadowBlur = 10
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, horizonY - 0.5, w, 1)
  ctx.shadowBlur = 0

  // Сетка (перспективная)
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, horizonY, w, h - horizonY)
  ctx.clip()

  const stepX = props.squareSize
  const spreadX = w * props.spreadFactor

  // Вертикальные линии (толстые)
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

  // Вертикальные линии (тонкие)
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

  // Туман внизу
  const fogGrad = ctx.createLinearGradient(0, h * 0.85, 0, h)
  fogGrad.addColorStop(0, 'rgba(0,0,0,0)')
  fogGrad.addColorStop(1, 'rgba(0,0,0,0.7)')
  ctx.fillStyle = fogGrad
  ctx.fillRect(0, h * 0.85, w, h * 0.15)

  // Обновляем позицию заглушки-солнца
  updateSunPlaceholder()
}

// --- Обновление позиции картинки-солнца ---
const updateSunPlaceholder = () => {
  const w = containerWidth.value
  const h = containerHeight.value
  if (w === 0 || h === 0) return

  const baseHorizonY = h * props.horizonHeight
  const scrollOffset = scrollY.value * props.parallaxSpeed
  const horizonY = Math.max(0, baseHorizonY - scrollOffset)

  const sunSize = w * 0.18 // 18% ширины экрана
  const sunHiddenRatio = 0.2 // часть, скрытая под горизонтом (как в оригинале)
  const sunY = horizonY - sunSize * (1 - sunHiddenRatio) // центр солнца
  const topPos = sunY - sunSize / 2 // верхний край

  sunPlaceholderStyle.value = {
    top: topPos + 'px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: sunSize + 'px',
    height: sunSize + 'px',
    position: 'absolute',
    pointerEvents: 'none',
    willChange: 'transform, top'
  }
}

// --- Обновление при скролле (без перерисовки) ---
const updateScroll = () => {
  const offset = scrollY.value * props.parallaxSpeed
  if (canvasRef.value) {
    canvasRef.value.style.transform = `translateY(${-offset}px)`
  }
  updateSunPlaceholder()
}

const onScroll = () => {
  scrollY.value = window.scrollY
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    updateScroll()
    rafId = null
  })
}

const onResize = () => {
  drawCanvas()
  updateScroll()
}

const init = async () => {
  await nextTick()
  drawCanvas()
  scrollY.value = window.scrollY
  updateScroll()
}

onMounted(() => {
  init()
  window.addEventListener('scroll', onScroll, { passive: true })
  resizeObserver = new ResizeObserver(() => onResize())
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (resizeObserver) resizeObserver.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
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
  overflow: hidden;
  background: #040a14;
  transform: translateZ(0);
  will-change: transform;
}

canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform: translateZ(0);
}

.sun-placeholder {
  position: absolute;
  pointer-events: none;
  will-change: transform, top;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  /* Эффект свечения */
  filter: drop-shadow(0 0 30px rgba(255, 100, 0, 0.8)) drop-shadow(0 0 60px rgba(255, 0, 200, 0.5));
}
</style>