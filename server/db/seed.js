import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'menu.db')

console.log('🔧 Создаю/обновляю БД по пути:', dbPath)

try {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  // Таблица menu с новыми колонками
  await db.exec(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      category TEXT NOT NULL,
      image TEXT,
      portion_value INTEGER,
      portion_unit TEXT
    )
  `)

  // Добавляем колонки, если их нет (для безопасного обновления существующей БД)
  try {
    await db.exec(`ALTER TABLE menu ADD COLUMN portion_value INTEGER`)
  } catch (e) { /* колонка уже существует */ }
  try {
    await db.exec(`ALTER TABLE menu ADD COLUMN portion_unit TEXT`)
  } catch (e) { /* колонка уже существует */ }

  // Заполняем меню тестовыми данными, если таблица пуста
  const menuCount = await db.get('SELECT COUNT(*) as count FROM menu')
  if (menuCount.count === 0) {
    const items = [
      ['Стейк Рибай', 2500, 'Горячее', '/img/steak.jpg', 300, 'г'],
      ['Картошка фри', 350, 'Гарниры', '/img/fries.jpg', 150, 'г'],
      ['Пиво IPA', 450, 'Напитки', '/img/ipa.jpg', 500, 'мл'],
      ['Цезарь с курицей', 600, 'Салаты', '/img/caesar.jpg', 280, 'г'],
      ['Бургер с говядиной', 750, 'Горячее', '/img/burger.jpg', 350, 'г'],
      ['Лимонад', 300, 'Напитки', '/img/lemonade.jpg', 400, 'мл'],
      ['Сырные палочки', 420, 'Закуски', '/img/cheese-sticks.jpg', 12, 'шт'],
      ['Куриные крылышки', 550, 'Горячее', '/img/wings.jpg', 6, 'шт'],
    ]
    for (const [name, price, category, image, portion_value, portion_unit] of items) {
      await db.run(
        'INSERT INTO menu (name, price, category, image, portion_value, portion_unit) VALUES (?, ?, ?, ?, ?, ?)',
        name, price, category, image, portion_value, portion_unit
      )
    }
    console.log('✅ Добавлены блюда с указанием порции (вес/количество)')
  }

  console.log('✅ База данных инициализирована')
  await db.close()
} catch (err) {
  console.error('❌ Ошибка при инициализации БД:', err)
}