import { Pool } from 'pg'
const connectionString = 'postgresql://todoapplicationdev:passwd@localhost:2345/tododbdev'

const pool = new Pool({
  connectionString: connectionString,
})

export const db = {
  query: (text: any, params: any) => pool.query(text, params)
}