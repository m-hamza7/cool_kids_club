import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { letters as lettersApi } from '../../lib/api'
import Animate from '../../components/Animate'

const EMPTY_LETTER = {
  title: '', month: '', content: '', excerpt: '', tag: '',
  color: 'bg-[#FAFAF5]', is_featured: false, is_published: false,
}

const COLOR_OPTIONS = [
  { value: 'bg-[#EEF7EE]', label: 'Green' },
  { value: 'bg-[#EEF3FD]', label: 'Blue' },
  { value: 'bg-[#FEF3EA]', label: 'Peach' },
  { value: 'bg-[#FEF9EA]', label: 'Yellow' },
  { value: 'bg-[#FAFAF5]', label: 'Cream' },
]

export default function ManageLetters() {
  const [letters, setLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_LETTER)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const { letters } = await lettersApi.list()
      setLetters(letters)
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY_LETTER); setEditing('new'); setError('') }
  const openEdit = (letter) => {
    setForm({
      title: letter.title || '',
      month: letter.month || '',
      content: letter.content || '',
      excerpt: letter.excerpt || '',
      tag: letter.tag || '',
      color: letter.color || 'bg-[#FAFAF5]',
      is_featured: letter.is_featured || false,
      is_published: letter.is_published || false,
    })
    setEditing(letter)
    setError('')
  }
  const close = () => { setEditing(null); setError('') }

  const update = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: val }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (editing === 'new') {
        await lettersApi.create(form)
      } else {
        await lettersApi.update(editing.id, form)
      }
      close()
      load()
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this letter? This cannot be undone.')) return
    try {
      await lettersApi.delete(id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="pt-28 pb-16 px-6 bg-[#FAFAF5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Animate animation="fade-up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link to="/admin" className="text-[#5DA05A] text-sm font-medium hover:underline">← Dashboard</Link>
              <h1 className="text-3xl font-bold text-[#2d2d2d] font-display mt-1">Manage Letters</h1>
            </div>
            <button onClick={openNew} className="px-5 py-2.5 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors">
              + New Letter
            </button>
          </div>
        </Animate>

        {/* Editor modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={close}>
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-[#2d2d2d] font-display mb-6">
                {editing === 'new' ? 'Write New Letter' : 'Edit Letter'}
              </h2>
              {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Title *</label>
                    <input value={form.title} onChange={update('title')} required className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Month *</label>
                    <input value={form.month} onChange={update('month')} required placeholder="e.g. July 2025" className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Content *</label>
                  <textarea value={form.content} onChange={update('content')} required rows={10} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A] resize-y font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Excerpt</label>
                  <textarea value={form.excerpt} onChange={update('excerpt')} rows={2} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A] resize-none" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Tag</label>
                    <input value={form.tag} onChange={update('tag')} placeholder="e.g. Mental Wellness" className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Card Color</label>
                    <select value={form.color} onChange={update('color')} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]">
                      {COLOR_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.is_published} onChange={update('is_published')} className="w-5 h-5 rounded border-[#e8e0d8] text-[#5DA05A] focus:ring-[#5DA05A]" />
                    <span className="text-sm font-medium text-[#2d2d2d]">Published</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.is_featured} onChange={update('is_featured')} className="w-5 h-5 rounded border-[#e8e0d8] text-[#5DA05A] focus:ring-[#5DA05A]" />
                    <span className="text-sm font-medium text-[#2d2d2d]">Featured (shown as latest letter)</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors disabled:opacity-50">
                    {saving ? 'Saving...' : editing === 'new' ? 'Create Letter' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={close} className="px-6 py-2.5 rounded-xl border border-[#e8e0d8] text-[#555] font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Letters list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-16 text-[#555]">No letters yet. Write your first one.</div>
        ) : (
          <div className="space-y-3">
            {letters.map((letter) => (
              <div key={letter.id} className="bg-white rounded-2xl border border-[#f0e9dd] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-sm transition-shadow">
                <div className={`w-3 h-12 rounded-full flex-shrink-0 ${letter.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[#2d2d2d] truncate">{letter.title}</h3>
                    {letter.is_featured && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FEF9EA] text-[#9A7820]">Featured</span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${letter.is_published ? 'bg-[#EEF7EE] text-[#3D7840]' : 'bg-gray-100 text-gray-500'}`}>
                      {letter.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-[#555] mt-1">
                    {letter.month}{letter.tag ? ` · ${letter.tag}` : ''}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(letter)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#5DA05A] border border-[#5DA05A]/30 hover:bg-[#EEF7EE] transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(letter.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#D45858] border border-[#D45858]/30 hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
