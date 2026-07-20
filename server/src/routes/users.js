import { Router } from 'express'
import db from '../config/db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

const USER_COLS = 'id, email, full_name, avatar_url, role, membership_plan, membership_status, donation_amount, created_at, updated_at'

// POST /api/users/me/donate — any authenticated user
router.post('/me/donate', requireAuth, async (req, res) => {
  const { amount } = req.body
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Please enter a valid donation amount' })
  }
  const { rows } = await db.query(
    `UPDATE users SET donation_amount = COALESCE(donation_amount, 0) + $1 WHERE id = $2 RETURNING ${USER_COLS}`,
    [parseInt(amount, 10), req.user.id]
  )
  res.json({ user: rows[0] })
})

// All routes below require admin
router.use(requireAuth, requireAdmin)

// GET /api/users/stats/overview — must be above /:id
router.get('/stats/overview', async (_req, res) => {
  const { rows } = await db.query(`
    SELECT
      COUNT(*)::int AS "totalUsers",
      COUNT(*) FILTER (WHERE membership_plan IN ('premium', 'founding'))::int AS "premiumUsers",
      COUNT(*) FILTER (WHERE membership_status = 'active')::int AS "activeUsers",
      (SELECT COUNT(*)::int FROM events) AS "totalEvents",
      (SELECT COUNT(*)::int FROM monthly_letters) AS "totalLetters"
    FROM users
  `)
  res.json({ stats: rows[0] })
})

// GET /api/users
router.get('/', async (req, res) => {
  const { role, membership_plan, membership_status, search } = req.query
  let query = `SELECT ${USER_COLS} FROM users`
  const params = []
  const conditions = []

  if (role) { params.push(role); conditions.push(`role = $${params.length}`) }
  if (membership_plan) { params.push(membership_plan); conditions.push(`membership_plan = $${params.length}`) }
  if (membership_status) { params.push(membership_status); conditions.push(`membership_status = $${params.length}`) }
  if (search) {
    params.push(`%${search}%`)
    conditions.push(`(full_name ILIKE $${params.length} OR email ILIKE $${params.length})`)
  }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ')
  query += ' ORDER BY created_at DESC'

  const { rows } = await db.query(query, params)
  res.json({ users: rows })
})

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const { rows: userRows } = await db.query(`SELECT ${USER_COLS} FROM users WHERE id = $1`, [req.params.id])
  if (!userRows[0]) return res.status(404).json({ error: 'User not found' })

  const { rows: attendance } = await db.query(
    `SELECT ea.*, e.id AS event_id, e.title, e.category, e.event_date
     FROM event_attendees ea JOIN events e ON ea.event_id = e.id
     WHERE ea.user_id = $1`,
    [req.params.id]
  )

  res.json({ user: userRows[0], attendance })
})

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  const { full_name, role, membership_plan, membership_status } = req.body
  const sets = []
  const params = []

  if (full_name !== undefined) { params.push(full_name); sets.push(`full_name = $${params.length}`) }
  if (role !== undefined) { params.push(role); sets.push(`role = $${params.length}`) }
  if (membership_plan !== undefined) { params.push(membership_plan); sets.push(`membership_plan = $${params.length}`) }
  if (membership_status !== undefined) { params.push(membership_status); sets.push(`membership_status = $${params.length}`) }

  if (!sets.length) return res.status(400).json({ error: 'No fields to update' })

  params.push(req.params.id)
  const { rows } = await db.query(
    `UPDATE users SET ${sets.join(', ')} WHERE id = $${params.length} RETURNING ${USER_COLS}`,
    params
  )
  if (!rows[0]) return res.status(404).json({ error: 'User not found' })
  res.json({ user: rows[0] })
})

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete your own account' })
  }
  await db.query('DELETE FROM users WHERE id = $1', [req.params.id])
  res.json({ message: 'User deleted' })
})

export default router
