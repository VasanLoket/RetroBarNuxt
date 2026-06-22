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

  const dbPath = path.resolve(process.cwd(), 'server/db/menu.db')
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  const user = await db.get('SELECT id, login, password_hash, points FROM users WHERE login = ?', login)
  if (!user) {
    await db.close()
    throw createError({ statusCode: 401, statusMessage: 'Неверный логин или пароль' })
  }

  const match = await bcrypt.compare(password, user.password_hash)
  if (!match) {
    await db.close()
    throw createError({ statusCode: 401, statusMessage: 'Неверный логин или пароль' })
  }

  delete user.password_hash
  await db.close()
  return { success: true, user }
})