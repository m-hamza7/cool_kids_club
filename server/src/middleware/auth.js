import jwt from 'jsonwebtoken'
import db from '../config/db.js'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET env var')

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export { COOKIE_OPTIONS }

export function signToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT from cookie and attach user to req
export async function requireAuth(req, res, next) {
  const token = req.cookies?.access_token
  if (!token) return res.status(401).json({ error: 'Not authenticated' })

  try {
    const { sub } = jwt.verify(token, JWT_SECRET)
    const { rows } = await db.query(
      'SELECT id, email, full_name, avatar_url, role, membership_plan, membership_status, created_at, updated_at FROM users WHERE id = $1',
      [sub]
    )
    if (!rows[0]) {
      res.clearCookie('access_token', COOKIE_OPTIONS)
      return res.status(401).json({ error: 'User not found' })
    }
    req.user = rows[0]
    next()
  } catch {
    res.clearCookie('access_token', COOKIE_OPTIONS)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// Must be admin
export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

// Optionally attach user if a valid cookie exists (non-blocking)
export async function optionalAuth(req, _res, next) {
  const token = req.cookies?.access_token
  if (token) {
    try {
      const { sub } = jwt.verify(token, JWT_SECRET)
      const { rows } = await db.query(
        'SELECT id, email, full_name, avatar_url, role, membership_plan, membership_status, created_at, updated_at FROM users WHERE id = $1',
        [sub]
      )
      if (rows[0]) req.user = rows[0]
    } catch { /* not authenticated */ }
  }
  next()
}
