import { Router } from 'express'
import db from '../config/db.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

// GET /api/letters
router.get('/', async (req, res) => {
  const isAdmin = req.user?.role === 'admin'
  const query = isAdmin
    ? 'SELECT * FROM monthly_letters ORDER BY created_at DESC'
    : 'SELECT * FROM monthly_letters WHERE is_published = true ORDER BY created_at DESC'

  const { rows } = await db.query(query)
  res.json({ letters: rows })
})

// GET /api/letters/featured
router.get('/featured', async (req, res) => {
  let { rows } = await db.query(
    'SELECT * FROM monthly_letters WHERE is_featured = true AND is_published = true LIMIT 1'
  )
  if (!rows[0]) {
    const fallback = await db.query(
      'SELECT * FROM monthly_letters WHERE is_published = true ORDER BY created_at DESC LIMIT 1'
    )
    rows = fallback.rows
  }
  res.json({ letter: rows[0] || null })
})

// GET /api/letters/:id
router.get('/:id', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM monthly_letters WHERE id = $1', [req.params.id])
  const letter = rows[0]
  if (!letter) return res.status(404).json({ error: 'Letter not found' })
  if (!letter.is_published && req.user?.role !== 'admin') {
    return res.status(404).json({ error: 'Letter not found' })
  }
  res.json({ letter })
})

// POST /api/letters — admin only
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { title, month, content, excerpt, tag, color, is_featured, is_published } = req.body
  if (!title || !month || !content) {
    return res.status(400).json({ error: 'Title, month, and content are required' })
  }

  if (is_featured) {
    await db.query('UPDATE monthly_letters SET is_featured = false WHERE is_featured = true')
  }

  const { rows } = await db.query(
    `INSERT INTO monthly_letters (title, month, content, excerpt, tag, color, is_featured, is_published, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [title, month, content, excerpt, tag, color || 'bg-[#FAFAF5]', is_featured ?? false, is_published ?? false, req.user.id]
  )
  res.status(201).json({ letter: rows[0] })
})

// PUT /api/letters/:id — admin only
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const { title, month, content, excerpt, tag, color, is_featured, is_published } = req.body

  if (is_featured) {
    await db.query('UPDATE monthly_letters SET is_featured = false WHERE id != $1', [req.params.id])
  }

  const { rows } = await db.query(
    `UPDATE monthly_letters SET title=$1, month=$2, content=$3, excerpt=$4, tag=$5, color=$6, is_featured=$7, is_published=$8
     WHERE id=$9 RETURNING *`,
    [title, month, content, excerpt, tag, color, is_featured, is_published, req.params.id]
  )
  if (!rows[0]) return res.status(404).json({ error: 'Letter not found' })
  res.json({ letter: rows[0] })
})

// DELETE /api/letters/:id — admin only
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await db.query('DELETE FROM monthly_letters WHERE id = $1', [req.params.id])
  res.json({ message: 'Letter deleted' })
})

export default router
