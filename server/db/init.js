import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default defineEventHandler(async () => {
  const db = await open({
    filename: path.resolve(process.cwd(), 'server/db/menu.db'),
    driver: sqlite3.Database
  })

  const rows = await db.all('SELECT * FROM menu ORDER BY category, name')
  await db.close()
  return rows
})