import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'path'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  if (!login || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Необходимо указать логин и пароль' })
  }
  if (login.length < 3 || password.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'Логин ≥3 символов, пароль ≥6' })
  }

  const dbPath = path.resolve(process.cwd(), 'server/db/menu.db')
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  const existing = await db.get('SELECT id FROM users WHERE login = ?', login)
  if (existing) {
    await db.close()
    throw createError({ statusCode: 409, statusMessage: 'Пользователь уже существует' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.run(
    'INSERT INTO users (login, password_hash, points) VALUES (?, ?, ?)',
    login, passwordHash, 0
  )

  const newUser = await db.get('SELECT id, login, points FROM users WHERE login = ?', login)
  await db.close()
  return { success: true, user: newUser }
})