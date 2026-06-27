<template>
  <div class="background-layers">
    <!-- 1. Фоновый канвас с солнцем -->
    <SynthwaveScene
      :grid-color="gridColor"
      :bg-color-top="bgColorTop"
      :bg-color-bottom="bgColorBottom"
      :horizon-height="horizonHeight"
      :square-size="squareSize"
      :spread-factor="spreadFactor"
      :parallax-speed="parallaxSpeed"
      :sun-top-color="sunTopColor"
      :sun-mid-color="sunMidColor"
      :sun-bot-color="sunBotColor"
      :sun-hidden-ratio="sunHiddenRatio"
      class="layer-bg"
    />

    <!-- 2. VHS-оверлей (поверх фона) -->
    <VHSBackground
      v-if="showVhs"
      :primary-color="vhsPrimaryColor"
      :secondary-color="vhsSecondaryColor"
      :accent-color="vhsAccentColor"
      :intensity="vhsIntensity"
      :show-grid="vhsShowGrid"
      class="layer-vhs"
    />

    <!-- 3. Глитч-оверлей (поверх всего) -->
    <CRTOverlay
      v-if="showGlitch"
      class="layer-glitch"
    />

    <!-- Слот для основного контента сайта -->
    
  </div>
</template>

<script setup>
import SynthwaveScene from './SynthwaveScene.vue'
import VHSBackground from './VHSBackground.vue'
import CRTOverlay from './CRTOverlay.vue'

// Пропсы для управления всеми слоями
const props = defineProps({
  // NeonBg props
  gridColor: { type: String, default: '#00ffff' },
  bgColorTop: { type: String, default: '#040a14' },
  bgColorBottom: { type: String, default: '#0a1520' },
  horizonHeight: { type: Number, default: 0.4 },
  squareSize: { type: Number, default: 45 },
  spreadFactor: { type: Number, default: 1.5 },
  parallaxSpeed: { type: Number, default: 0.2 },
  sunTopColor: { type: String, default: '#ffe100' },
  sunMidColor: { type: String, default: '#ff7b00' },
  sunBotColor: { type: String, default: '#ff00ff' },
  sunHiddenRatio: { type: Number, default: 0.2 },

  // VHS props
  showVhs: { type: Boolean, default: true },
  vhsPrimaryColor: { type: String, default: '#ff00ff' },
  vhsSecondaryColor: { type: String, default: '#00ffff' },
  vhsAccentColor: { type: String, default: '#ff0080' },
  vhsIntensity: { type: Number, default: 5 },
  vhsShowGrid: { type: Boolean, default: true },

  // Glitch props
  showGlitch: { type: Boolean, default: true },
})
</script>

<style scoped>
.background-layers {
  position: fixed;      /* вместо relative */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;         /* под всем контентом */
  pointer-events: none; /* чтобы клики проходили сквозь */
  transform: translateZ(0); /* аппаратное ускорение */
  will-change: transform; 
}

/* Все слои фиксированы и не мешают кликам */
.layer-bg,
.layer-vhs,
.layer-glitch {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* важно – клики проходят сквозь */
  z-index: 0; /* будет переопределено в компонентах */
}

/* Фоновый слой – самый низ */
.layer-bg {
  z-index: -1;
}

/* VHS – над фоном, под контентом */
.layer-vhs {
  z-index: 0;
}

/* Глитч – поверх всего контента */
.layer-glitch {
  z-index: 9999;
}

/* Контент, переданный через слот, будет между VHS и глитчем */
.background-layers :slotted(*) {
  position: relative;
  z-index: 1;
}
</style>