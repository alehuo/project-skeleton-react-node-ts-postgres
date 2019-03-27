import { db } from './connection'

export async function getTasks() {
  const result = await db.query('SELECT * FROM todoapp.task', null)
  return result.rows
}