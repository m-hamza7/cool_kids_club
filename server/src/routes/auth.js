import { Router } from 'express'
import bcrypt from 'bcryptjs'
import db from '../config/db.js'
import { requireAuth, signToken, COOKIE_OPTIONS } from '../middleware/auth.js'
import { storeOtp, verifyOtp, sendEmailOtp, sendPhoneOtp } from '../services/otp.js'

const router = Router()

const USER_COLS = 'id, email, phone, full_name, avatar_url, role, membership_plan, membership_status, created_at, updated_at'

// ── Step 1: Send OTP ─────────────────────────────────────────

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  const { email, phone } = req.body

  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone is required' })
  }

  const type = email ? 'email' : 'phone'
  const identifier = email ? email.toLowerCase().trim() : phone.trim()

  // Check if user already exists
  const field = email ? 'email' : 'phone'
  const { rows } = await db.query(`SELECT id FROM users WHERE ${field} = $1`, [identifier])
  if (rows[0]) {
    return res.status(400).json({ error: `An account with this ${field} already exists` })
  }

  try {
    const otp = await storeOtp(identifier, type)

    if (type === 'email') {
      await sendEmailOtp(identifier, otp)
    } else {
      await sendPhoneOtp(identifier, otp)
    }

    res.json({ message: `Verification code sent to your ${type}`, type })
  } catch (err) {
    console.error('Send OTP error:', err)
    res.status(500).json({ error: 'Failed to send verification code' })
  }
})

// ── Step 2: Verify OTP & Create Account ──────────────────────

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, phone, otp, password, full_name } = req.body
  const identifier = email ? email.toLowerCase().trim() : phone?.trim()

  if (!identifier || !otp || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  const result = await verifyOtp(identifier, otp)
  if (!result.valid) {
    return res.status(400).json({ error: result.error })
  }

  // OTP verified — create the user
  try {
    const hash = await bcrypt.hash(password, 12)
    const { rows } = await db.query(
      `INSERT INTO users (email, phone, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING ${USER_COLS}`,
      [email?.toLowerCase().trim() || null, phone?.trim() || null, hash, full_name || '']
    )
    const user = rows[0]
    const token = signToken(user.id)
    res.cookie('access_token', token, COOKIE_OPTIONS)
    res.json({ user })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'An account with this email or phone already exists' })
    }
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Could not create account' })
  }
})

// ── Login ────────────────────────────────────────────────────

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, phone, password } = req.body
  if ((!email && !phone) || !password) {
    return res.status(400).json({ error: 'Email/phone and password are required' })
  }

  const field = email ? 'email' : 'phone'
  const identifier = email ? email.toLowerCase().trim() : phone.trim()

  const { rows } = await db.query(
    `SELECT id, email, phone, password_hash, full_name, avatar_url, role, membership_plan, membership_status, created_at, updated_at FROM users WHERE ${field} = $1`,
    [identifier]
  )
  const row = rows[0]
  if (!row) return res.status(401).json({ error: 'Invalid credentials' })

  const match = await bcrypt.compare(password, row.password_hash)
  if (!match) return res.status(401).json({ error: 'Invalid credentials' })

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
