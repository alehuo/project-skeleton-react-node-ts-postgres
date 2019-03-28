import { db, yesql } from './connection'

export async function getTasks() {
  const result = await db.query(yesql.getTasks().text, null)
  return result.rows
}