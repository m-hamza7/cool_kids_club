import pg from 'pg'

const { Pool } = pg

const dbUrl = process.env.DATABASE_URL || ''
const needsSsl = dbUrl.includes('sslmode=') || process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: dbUrl,
  ssl: needsSsl ? { rejectUnauthorized: false } : false,
})

pool.on('error', (err) => {
  console.error('Unexpected pool error:', err)
})

export default pool
