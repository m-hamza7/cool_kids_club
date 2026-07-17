import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import eventRoutes from './routes/events.js'
import letterRoutes from './routes/letters.js'
import userRoutes from './routes/users.js'
import { optionalAuth } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Attach user to every request if a valid cookie exists
app.use(optionalAuth)

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/letters', letterRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`CKC API running on port ${PORT}`)
})
