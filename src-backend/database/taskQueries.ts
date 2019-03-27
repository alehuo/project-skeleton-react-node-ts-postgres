import { db, sql } from './connection'

export async function getTasks() {
  const result = await db.query(sql.getTasks().text, null)
  return result.rows
}