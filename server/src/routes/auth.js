import { Router } from 'express'
import bcrypt from 'bcryptjs'
import db from '../config/db.js'
import { requireAuth, signToken, COOKIE_OPTIONS } from '../middleware/auth.js'

const router = Router()

const USER_COLS = 'id, email, phone, full_name, avatar_url, age_range, reason, role, membership_plan, membership_status, created_at, updated_at'

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { email, password, full_name } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  try {
    const { age_range, reason } = req.body
    const hash = await bcrypt.hash(password, 12)
    const { rows } = await db.query(
      `INSERT INTO users (email, password_hash, full_name, age_range, reason, membership_plan)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${USER_COLS}`,
      [email.toLowerCase().trim(), hash, full_name || '', age_range || null, reason || null, 'free']
    )
    const user = rows[0]
    const token = signToken(user.id)
    res.cookie('access_token', token, COOKIE_OPTIONS)
    res.json({ user })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'An account with this email already exists' })
    }
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Could not create account' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const { rows } = await db.query(
    `SELECT id, email, phone, password_hash, full_name, avatar_url, age_range, reason, role, membership_plan, membership_status, created_at, updated_at FROM users WHERE email = $1`,
    [email.toLowerCase().trim()]
  )
  const row = rows[0]
  if (!row) return res.status(401).json({ error: 'Invalid email or password' })

  const match = await bcrypt.compare(password, row.password_hash)
  if (!match) return res.status(401).json({ error: 'Invalid email or password' })

  const { password_hash: _, ...user } = row
  const token = signToken(user.id)
  res.cookie('access_token', token, COOKIE_OPTIONS)
  res.json({ user })
})

// POST /api/auth/logout
router.post('/logout', (_req, res) => {
  res.clearCookie('access_token', COOKIE_OPTIONS)
  res.json({ message: 'Logged out' })
})

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

export default router
