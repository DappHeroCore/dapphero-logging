import { Pool } from 'pg'

const pool = new Pool()

export const addLogsToDb = async (data): Promise<any[]> => {
  const query = `
    INSERT INTO loggly_logs (data)
      VALUES ($1);
  `
  const values = [ data ]
  const result = await pool.query(query, values)
  return result
}
