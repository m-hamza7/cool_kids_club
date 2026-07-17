import { Router } from 'express'
import db from '../config/db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/events
router.get('/', async (req, res) => {
  const { category } = req.query
  const isAdmin = req.user?.role === 'admin'

  let query = 'SELECT * FROM events'
  const params = []
  const conditions = []

  if (!isAdmin) {
    conditions.push('is_published = true')
  }
  if (category) {
    params.push(category)
    conditions.push(`category = $${params.length}`)
  }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ')
  query += ' ORDER BY event_date ASC NULLS LAST'

  const { rows } = await db.query(query, params)
  res.json({ events: rows })
})

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM events WHERE id = $1', [req.params.id])
  const event = rows[0]
  if (!event) return res.status(404).json({ error: 'Event not found' })
  if (!event.is_published && req.user?.role !== 'admin') {
    return res.status(404).json({ error: 'Event not found' })
  }
  res.json({ event })
})

// POST /api/events — admin only
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { title, description, category, image_url, event_date, event_time, location, is_published } = req.body
  if (!title || !category) {
    return res.status(400).json({ error: 'Title and category are required' })
  }

  const { rows } = await db.query(
    `INSERT INTO events (title, description, category, image_url, event_date, event_time, location, is_published, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [title, description, category, image_url, event_date || null, event_time || null, location, is_published ?? false, req.user.id]
  )
  res.status(201).json({ event: rows[0] })
})

// PUT /api/events/:id — admin only
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { title, description, category, image_url, event_date, event_time, location, is_published } = req.body

  const { rows } = await db.query(
    `UPDATE events SET title=$1, description=$2, category=$3, image_url=$4, event_date=$5, event_time=$6, location=$7, is_published=$8
     WHERE id=$9 RETURNING *`,
    [title, description, category, image_url, event_date || null, event_time || null, location, is_published, req.params.id]
  )
  if (!rows[0]) return res.status(404).json({ error: 'Event not found' })
  res.json({ event: rows[0] })
})

// DELETE /api/events/:id — admin only
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await db.query('DELETE FROM events WHERE id = $1', [req.params.id])
  res.json({ message: 'Event deleted' })
})

// ── Attendance ───────────────────────────────────────────────

// GET /api/events/:id/attendance
router.get('/:id/attendance', async (req, res) => {
  const { rows: countRows } = await db.query(
    "SELECT COUNT(*)::int AS count FROM event_attendees WHERE event_id = $1 AND status IN ('interested','attending')",
    [req.params.id]
  )

  let userStatus = null
  if (req.user) {
    const { rows } = await db.query(
      'SELECT status FROM event_attendees WHERE event_id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )
    userStatus = rows[0]?.status || null
  }

  res.json({ count: countRows[0]?.count || 0, userStatus })
})

// POST /api/events/:id/attend
router.post('/:id/attend', requireAuth, async (req, res) => {
  const { status } = req.body
  if (!['interested', 'attending', 'not_attending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  const { rows } = await db.query(
    `INSERT INTO event_attendees (event_id, user_id, status) VALUES ($1, $2, $3)
     ON CONFLICT (event_id, user_id) DO UPDATE SET status = $3
     RETURNING *`,
    [req.params.id, req.user.id, status]
  )
  res.json({ attendance: rows[0] })
})

// DELETE /api/events/:id/attend
router.delete('/:id/attend', requireAuth, async (req, res) => {
  await db.query(
    'DELETE FROM event_attendees WHERE event_id = $1 AND user_id = $2',
    [req.params.id, req.user.id]
  )
  res.json({ message: 'Attendance removed' })
})

// GET /api/events/:id/attendees — admin
router.get('/:id/attendees', requireAuth, requireAdmin, async (req, res) => {
  const { rows } = await db.query(
    `SELECT ea.*, u.id AS user_id, u.full_name, u.email, u.avatar_url
     FROM event_attendees ea JOIN users u ON ea.user_id = u.id
     WHERE ea.event_id = $1`,
    [req.params.id]
  )
  res.json({ attendees: rows })
})

export default router
