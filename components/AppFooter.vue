<template>
  <footer class="page-section page-bg-5 fifth-screen">
    <div class="grid-footer">
      <!-- Первая строка: подписи категорий -->
      <div class="footer-label">📍 Адреса заведений</div>
      <div class="footer-label">📱 Соцсети и телефоны</div>
      <div class="footer-label">🕒 Время работы</div>

      <!-- Вторая строка: информация -->
      <div class="footer-info">
        <ul class="footer-list">
          <li>г. Н. Новгород, пер. Вахитова, 4Б</li>
        </ul>
        <a
          href="https://yandex.ru/maps/org/retrowave_bar/79939704384/?ll=43.992053%2C56.329911&z=17"
          target="_blank"
          class="map-link"
        >Открыть на карте →</a>
      </div>

      <div class="footer-info">
        <ul class="footer-list">
          <li>
            <span class="icon">VK</span>
            <a href="https://vk.com/retrowavebar" target="_blank">@retrowavebar</a>
          </li>
          <li>
            <span class="icon">📞</span>
            <a href="tel:+79092939995">+7 (909) 293-99-95</a>
          </li>
          <li>
            <span class="icon">📧</span>
            <a href="mailto:info@retrowave-bar.ru">info@retrowave-bar.ru</a>
          </li>
        </ul>
      </div>

      <div class="footer-info">
        <ul class="footer-list">
          <li><strong>Ежедневно</strong> 16:00 – 04:00</li>
          <li>🕹️ Игровая зона до последнего клиента</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
/* ===== Сетка футера ===== */
.grid-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Стили для ячеек-заголовков (подписи категорий) */
.footer-label {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ff7bff;
  text-shadow: 0 0 30px rgba(255, 0, 255, 0.25);
  text-align: center;
  padding: 12px 0 8px 0;
  border-bottom: 2px solid rgba(255, 0, 255, 0.2);
}

/* Стили для ячеек с информацией */
.footer-info {
  padding: 20px;
  background: rgba(20, 10, 40, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 0, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(255, 0, 255, 0.2), 0 0 60px rgba(0, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.footer-info:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 60px rgba(255, 0, 255, 0.35), 0 0 80px rgba(0, 255, 255, 0.2);
}


.footer-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #88ddff;
}

.footer-list li {
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
}

.footer-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.icon {
  display: inline-block;
  min-width: 28px;
  font-weight: 600;
  color: #ff7bff;
}

.footer-list a {
  color: #88ddff;
  text-decoration: none;
  transition: color 0.2s, text-shadow 0.2s;
}

.footer-list a:hover {
  color: #ff7bff;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
}

.map-link {
  display: inline-block;
  margin-top: 4px;
  color: #88ddff;
  text-decoration: none;
  font-size: 0.95rem;
  border: 1px solid rgba(255, 0, 255, 0.2);
  padding: 6px 16px;
  border-radius: 30px;
  transition: all 0.3s ease;
  background: rgba(255, 0, 255, 0.05);
}

.map-link:hover {
  background: rgba(255, 0, 255, 0.15);
  border-color: #ff7bff;
  color: #ff7bff;
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.2);
}

/* ===== Адаптив ===== */
@media (max-width: 720px) {
  .grid-footer {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .footer-label {
    font-size: 1.1rem;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 0, 255, 0.15);
  }
  .footer-info {
    padding: 16px;
  }
}

@media (max-width: 420px) {
  .footer-info {
    padding: 14px;
  }
  .footer-list li {
    font-size: 0.9rem;
  }
  .map-link {
    font-size: 0.85rem;
    padding: 4px 12px;
  }
}
</style>