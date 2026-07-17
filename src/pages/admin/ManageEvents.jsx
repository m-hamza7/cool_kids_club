import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { events as eventsApi } from '../../lib/api'
import Animate from '../../components/Animate'

const EMPTY_EVENT = {
  title: '', description: '', category: 'wellness', image_url: '',
  event_date: '', event_time: '', location: '', is_published: false,
}

const CATEGORIES = [
  { value: 'wellness', label: 'Wellness' },
  { value: 'bookclub', label: 'Book Club' },
  { value: 'community', label: 'Community' },
  { value: 'creativity', label: 'Creativity' },
]

export default function ManageEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | 'new' | event object
  const [form, setForm] = useState(EMPTY_EVENT)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const { events } = await eventsApi.list()
      setEvents(events)
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY_EVENT); setEditing('new'); setError('') }
  const openEdit = (ev) => {
    setForm({
      title: ev.title || '',
      description: ev.description || '',
      category: ev.category || 'wellness',
      image_url: ev.image_url || '',
      event_date: ev.event_date || '',
      event_time: ev.event_time || '',
      location: ev.location || '',
      is_published: ev.is_published || false,
    })
    setEditing(ev)
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
        await eventsApi.create(form)
      } else {
        await eventsApi.update(editing.id, form)
      }
      close()
      load()
    } catch (err) {
      setError(err.message)
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this event? This cannot be undone.')) return
    try {
      await eventsApi.delete(id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  const togglePublish = async (ev) => {
    try {
      await eventsApi.update(ev.id, { ...ev, is_published: !ev.is_published })
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
              <h1 className="text-3xl font-bold text-[#2d2d2d] font-display mt-1">Manage Events</h1>
            </div>
            <button onClick={openNew} className="px-5 py-2.5 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors">
              + New Event
            </button>
          </div>
        </Animate>

        {/* Editor modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={close}>
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-[#2d2d2d] font-display mb-6">
                {editing === 'new' ? 'Create Event' : 'Edit Event'}
              </h2>
              {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Title *</label>
                  <input value={form.title} onChange={update('title')} required className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Description</label>
                  <textarea value={form.description} onChange={update('description')} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A] resize-none" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Category *</label>
                    <select value={form.category} onChange={update('category')} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]">
                      {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Location</label>
                    <input value={form.location} onChange={update('location')} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Date</label>
                    <input type="date" value={form.event_date} onChange={update('event_date')} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Time</label>
                    <input type="time" value={form.event_time} onChange={update('event_time')} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Image URL</label>
                  <input value={form.image_url} onChange={update('image_url')} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.is_published} onChange={update('is_published')} className="w-5 h-5 rounded border-[#e8e0d8] text-[#5DA05A] focus:ring-[#5DA05A]" />
                  <span className="text-sm font-medium text-[#2d2d2d]">Published (visible to users)</span>
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors disabled:opacity-50">
                    {saving ? 'Saving...' : editing === 'new' ? 'Create Event' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={close} className="px-6 py-2.5 rounded-xl border border-[#e8e0d8] text-[#555] font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-[#555]">No events yet. Create your first event.</div>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white rounded-2xl border border-[#f0e9dd] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-sm transition-shadow">
                {ev.image_url && (
                  <img src={ev.image_url} alt={ev.title} className="w-24 h-16 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[#2d2d2d] truncate">{ev.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ev.is_published ? 'bg-[#EEF7EE] text-[#3D7840]' : 'bg-gray-100 text-gray-500'}`}>
                      {ev.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-[#555] mt-1 capitalize">
                    {ev.category}{ev.event_date ? ` · ${new Date(ev.event_date).toLocaleDateString()}` : ''}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => togglePublish(ev)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#e8e0d8] hover:bg-gray-50 transition-colors">
                    {ev.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => openEdit(ev)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#5DA05A] border border-[#5DA05A]/30 hover:bg-[#EEF7EE] transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ev.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#D45858] border border-[#D45858]/30 hover:bg-red-50 transition-colors">
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
