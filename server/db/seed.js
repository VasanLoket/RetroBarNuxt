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

  // Таблица menu
  await db.exec(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      category TEXT NOT NULL,
      image TEXT
    )
  `)

  // Таблица users
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Заполнение меню, если пусто
  const menuCount = await db.get('SELECT COUNT(*) as count FROM menu')
  if (menuCount.count === 0) {
    const items = [
      ['Стейк Рибай', 2500, 'Горячее', '/img/steak.jpg'],
      ['Картошка фри', 350, 'Гарниры', '/img/fries.jpg'],
      ['Пиво IPA', 450, 'Напитки', '/img/ipa.jpg'],
      ['Цезарь с курицей', 600, 'Салаты', '/img/caesar.jpg'],
      ['Бургер с говядиной', 750, 'Горячее', '/img/burger.jpg'],
      ['Лимонад', 300, 'Напитки', '/img/lemonade.jpg'],
    ]
    for (const [name, price, category, image] of items) {
      await db.run(
        'INSERT INTO menu (name, price, category, image) VALUES (?, ?, ?, ?)',
        name, price, category, image
      )
    }
    console.log('✅ Добавлены блюда в меню')
  }

  console.log('✅ База данных инициализирована')
  await db.close()
} catch (err) {
  console.error('❌ Ошибка при инициализации БД:', err)
}