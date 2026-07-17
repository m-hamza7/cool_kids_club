import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { users as usersApi } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'
import Animate from '../../components/Animate'

export default function ManageUsers() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterPlan, setFilterPlan] = useState('')
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (filterRole) params.role = filterRole
      if (filterPlan) params.membership_plan = filterPlan
      const { users } = await usersApi.list(params)
      setUsers(users)
    } catch { /* ignore */ }
    setLoading(false)
  }

  useEffect(() => { load() }, [filterRole, filterPlan])

  const handleSearch = (e) => {
    e.preventDefault()
    load()
  }

  const openEdit = (u) => {
    setEditForm({
      full_name: u.full_name || '',
      role: u.role || 'user',
      membership_plan: u.membership_plan || 'free',
      membership_status: u.membership_status || 'active',
    })
    setEditing(u)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await usersApi.update(editing.id, editForm)
      setEditing(null)
      load()
    } catch (err) {
      alert(err.message)
    }
    setSaving(false)
  }

  const handleDelete = async (u) => {
    if (u.id === currentUser?.id) return alert('Cannot delete yourself')
    if (!confirm(`Delete ${u.full_name || u.email}? This will permanently remove their account.`)) return
    try {
      await usersApi.delete(u.id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  const planBadge = {
    free: 'bg-[#EEF7EE] text-[#3D7840]',
    premium: 'bg-[#FEF9EA] text-[#9A7820]',
  }
  const statusBadge = {
    active: 'bg-[#EEF7EE] text-[#3D7840]',
    inactive: 'bg-gray-100 text-gray-500',
    expired: 'bg-red-50 text-red-600',
  }

  return (
    <div className="pt-28 pb-16 px-6 bg-[#FAFAF5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Animate animation="fade-up">
          <Link to="/admin" className="text-[#5DA05A] text-sm font-medium hover:underline">← Dashboard</Link>
          <h1 className="text-3xl font-bold text-[#2d2d2d] font-display mt-1 mb-6">Manage Users</h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[200px]">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-white focus:outline-none focus:border-[#5DA05A]"
              />
              <button type="submit" className="px-4 py-2.5 rounded-xl bg-[#5DA05A] text-white font-medium hover:bg-[#3D7840] transition-colors">
                Search
              </button>
            </form>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-white focus:outline-none focus:border-[#5DA05A]">
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-white focus:outline-none focus:border-[#5DA05A]">
              <option value="">All Plans</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </Animate>

        {/* Edit modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setEditing(null)}>
            <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-[#2d2d2d] font-display mb-6">Edit User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Full Name</label>
                  <input value={editForm.full_name} onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Role</label>
                  <select value={editForm.role} onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Membership Plan</label>
                  <select value={editForm.membership_plan} onChange={(e) => setEditForm((f) => ({ ...f, membership_plan: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]">
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1">Membership Status</label>
                  <select value={editForm.membership_status} onChange={(e) => setEditForm((f) => ({ ...f, membership_status: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] focus:outline-none focus:border-[#5DA05A]">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-xl border border-[#e8e0d8] text-[#555] font-medium hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-[#555]">No users found.</div>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="bg-white rounded-2xl border border-[#f0e9dd] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-sm transition-shadow">
                <div className="w-10 h-10 rounded-full bg-[#5DA05A] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {u.full_name?.charAt(0)?.toUpperCase() || u.email?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-[#2d2d2d] truncate">{u.full_name || 'Unnamed'}</h3>
                    {u.role === 'admin' && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#EEF3FD] text-[#3A6FB8]">Admin</span>
                    )}
                  </div>
                  <p className="text-sm text-[#555] mt-0.5">{u.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${planBadge[u.membership_plan] || planBadge.free}`}>
                      {u.membership_plan || 'free'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[u.membership_status] || statusBadge.active}`}>
                      {u.membership_status || 'active'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(u)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#5DA05A] border border-[#5DA05A]/30 hover:bg-[#EEF7EE] transition-colors">
                    Edit
                  </button>
                  {u.id !== currentUser?.id && (
                    <button onClick={() => handleDelete(u)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#D45858] border border-[#D45858]/30 hover:bg-red-50 transition-colors">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
