<template>
  <!-- Первый блок -->
  <section class="page-section page-bg-1">
    <div class="main-content">
      <h1 class="main-title">Retrowave Bar</h1>
      <!-- Добавляем подпись RETROWAVE -->
      <div class="retro-label">RETROWAVE</div>
    </div>
  </section>

  <!-- Второй блок -->
  <section class="page-section page-bg-2 second-screen">
    <div class="grid-container">
      <div class="card about-card">
        <h3>Уютный бар для GEEKов и для тех, кто скучает по посиделкам с друзьями у сеги 👾</h3>
          <ul>
            <li>❄️ - холодное пенное</li>
            <li>🔥 - редкий крафт</li>
            <li>🍟 - отличные закуски</li>
            <li>🎮 - отличная компания</li>
            <li>👾 - ретро-игры</li>
            <li class="hashtag">#олдытут! Приходи с друзьями и окунись в атмосферу 80х-90х-00х годов</li>
          </ul>
      </div>
      <div class="card photo-card">
        <img  src="/img/test.jpg" alt="описание" format="webp" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="card photo-card">
        <img  src="/img/photo-2.jpg" alt="описание" format="webp" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="card photo-card">
        <img  src="/img/photo-3.jpg" alt="описание" format="webp" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="card photo-card">
        <img  src="/img/photo-4.jpg" alt="описание" format="webp" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:4px; ">
      </div>
    </div>
  </section>

  <!-- Третий блок -->
  <section class="page-section page-bg-3 third-screen">
    <div class="grid-container-beer">
      <div class="card photo-card">
        <img src="/img/photo-5.jpg" alt="описание" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="card photo-card">
        <img src="/img/photo-6.jpg" alt="описание" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="card photo-card">
        <img src="/img/photo-7.jpg" alt="описание" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="card photo-card">
        <img src="/img/photo-8.jpg" alt="описание" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
      </div>
      <div class="beer-block beer-block--list">
        <h3>🍺 Пиво — всерьёз:</h3>
        <ul>
          <li>❄️ только холодное (никакого «комнатного»);</li>
          <li>🔥 редкий крафт, который меняется каждые 2–3 недели;</li>
          <li>🍟 сытные закуски под любой вкус;</li>
          <li>👾 а главное — компания, с которой приятно разделить и пенное, и воспоминания о 16‑битной эпохе.</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Четвёртый блок -->
  <section class="page-section page-bg-4 fourth-screen">
    <div class="flex-container-promo">
      <div class="card promo-card">Акции</div>
      <div class="card promo-card">Конкурсы и ивенты</div>
      <div class="card promo-card">Система лояльности</div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>

/* ===== Основной контейнер для первого блока ===== */
.main-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* ===== Заголовок ===== */
.main-title {
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #fff;
  text-shadow:
    0 0 20px rgba(255, 0, 255, 0.8),
    0 0 60px rgba(255, 0, 255, 0.6),
    0 0 120px rgba(0, 255, 255, 0.5),
    0 0 200px rgba(255, 0, 255, 0.3);
  animation: glowPulse 3s ease-in-out infinite alternate;
  margin-bottom: 20px;
}

@keyframes glowPulse {
  0% {
    text-shadow:
      0 0 20px rgba(255, 0, 255, 0.8),
      0 0 60px rgba(255, 0, 255, 0.6),
      0 0 120px rgba(0, 255, 255, 0.5);
  }
  100% {
    text-shadow:
      0 0 30px rgba(255, 0, 255, 1),
      0 0 80px rgba(255, 0, 255, 0.8),
      0 0 160px rgba(0, 255, 255, 0.7),
      0 0 240px rgba(255, 0, 255, 0.5);
  }
}

/* ===== Подпись RETROWAVE (добавлена в первом блоке) ===== */
.retro-label {
  font-size: clamp(1.2rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px #ff7bff;
  text-stroke: 2px #ff7bff;
  text-shadow:
    0 0 30px rgba(255, 0, 255, 0.8),
    0 0 60px rgba(0, 255, 255, 0.6);
  opacity: 0.9;
  margin-top: 10px;
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  0% { opacity: 0.8; text-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff; }
  100% { opacity: 1; text-shadow: 0 0 40px #ff00ff, 0 0 80px #00ffff, 0 0 120px #ff00ff; }
}

/* ===== Общий стиль для карточек (только неоновый контур, без фона) ===== */
.card {
  background: transparent !important;        /* убираем фон */
  backdrop-filter: none !important;          /* убираем блюр */
  -webkit-backdrop-filter: none !important;
  border: 2px solid rgba(255, 0, 255, 0.6); /* неоновая рамка */
  border-radius: 20px;
  padding: 24px;
  color: #e0d0ff;
  font-size: 1.05rem;
  line-height: 1.6;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
  /* Неоновое свечение */
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.4),
    0 0 40px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(255, 0, 255, 0.1);
}

.card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: #ff7bff;
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.8),
    0 0 80px rgba(0, 255, 255, 0.6),
    inset 0 0 40px rgba(255, 0, 255, 0.2);
}

/* ===== Текстовый блок about-card ===== */
.about-card {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 2px solid rgba(255, 0, 255, 0.6);
  border-radius: 20px;
  padding: 30px 28px;
  color: #e0d0ff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(0, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.6);
}

.about-card h3 {
  font-size: 1.3rem;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  margin-bottom: 16px;
  margin-top: 0;
  text-align: left;
}

.about-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1.05rem;
  line-height: 1.5;
  text-align: right;
}

.about-card ul li {
  padding-left: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

.about-card ul li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.about-card .hashtag {
  color: #88ddff;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  font-style: italic;
  border-bottom: none;
  padding-bottom: 0;
}

/* ===== Фото-карточки ===== */
.photo-card {
  padding: 0;
  overflow: hidden;
  background: transparent !important;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 2px solid rgba(0, 255, 255, 0.5); /* чуть другой оттенок для фото */
  box-shadow:
    0 0 20px rgba(0, 255, 255, 0.3),
    0 0 40px rgba(255, 0, 255, 0.2);
}

.photo-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.4s ease;
  border-radius: 20px;
}

.photo-card:hover img {
  transform: scale(1.04);
  filter: brightness(1.1) saturate(1.2);
}

/* ===== Блок beer-block ===== */
.beer-block {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 2px solid rgba(255, 0, 255, 0.6);
  border-radius: 20px;
  padding: 30px 28px;
  color: #e0d0ff;
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.4),
    0 0 40px rgba(0, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.beer-block:hover {
  transform: translateY(-4px);
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.8),
    0 0 80px rgba(0, 255, 255, 0.6);
}

.beer-block h3 {
  font-size: 1.6rem;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
  margin-bottom: 16px;
  margin-top: 0;
}

.beer-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 1.05rem;
  line-height: 1.5;
}

.beer-block ul li {
  padding-left: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

.beer-block ul li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* ===== Промо-карточки ===== */
.promo-card {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 2px solid rgba(255, 0, 255, 0.5);
  border-radius: 20px;
  padding: 36px 24px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff7bff;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  box-shadow:
    0 0 20px rgba(255, 0, 255, 0.3),
    0 0 40px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.promo-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow:
    0 0 40px rgba(255, 0, 255, 0.7),
    0 0 80px rgba(0, 255, 255, 0.5);
}

/* ===== Адаптивность ===== */
@media (max-width: 720px) {
  .card {
    padding: 18px;
    font-size: 0.95rem;
  }
  .photo-card {
    min-height: 180px;
  }
  .beer-block {
    padding: 22px 18px;
  }
  .beer-block h3 {
    font-size: 1.3rem;
  }
  .beer-block ul {
    font-size: 0.95rem;
  }
  .page-section {
    padding: 24px 14px;
  }
}

@media (max-width: 420px) {
  .photo-card {
    min-height: 140px;
  }
  .card {
    padding: 14px;
    font-size: 0.85rem;
  }
  .beer-block h3 {
    font-size: 1.1rem;
  }
  .beer-block ul {
    font-size: 0.85rem;
  }
  .promo-card {
    padding: 24px 16px;
    font-size: 1rem;
  }
  .retro-label {
    font-size: 1rem;
    letter-spacing: 0.3em;
  }
}
</style>