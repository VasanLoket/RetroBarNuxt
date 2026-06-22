// server/api/menu.get.js
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import fs from 'fs'

export default defineEventHandler(async (event) => {
  try {
    // Путь от корня проекта
    const dbPath = path.resolve(process.cwd(), 'server/db/menu.db')
    console.log('🔍 Путь к БД:', dbPath)

    if (!fs.existsSync(dbPath)) {
      console.error('❌ Файл БД не найден!')
      return { error: 'База данных не найдена' }
    }

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })

    const rows = await db.all('SELECT * FROM menu ORDER BY category, name')
    await db.close()
    return rows
  } catch (error) {
    console.error('❌ Ошибка в /api/menu:', error)
    return {
      error: error.message,
      stack: error.stack
    }
  }
})