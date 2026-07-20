import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { events as eventsApi } from '../lib/api'
import Animate from '../components/Animate'

export default function Profile() {
  const { user, logout } = useAuth()
  const [myEvents, setMyEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { events } = await eventsApi.list()
        const withAttendance = await Promise.all(
          events.map(async (ev) => {
            try {
              const { userStatus } = await eventsApi.getAttendance(ev.id)
              return { ...ev, userStatus }
            } catch {
              return { ...ev, userStatus: null }
            }
          })
        )
        setMyEvents(withAttendance.filter((e) => e.userStatus && e.userStatus !== 'not_attending'))
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [])

  const planColors = {
    free: 'bg-[#EEF7EE] text-[#3D7840]',
    premium: 'bg-[#FEF9EA] text-[#9A7820]',
    founding: 'bg-[#1a1a2e] text-[#D4A830]',
  }

  const planLabels = {
    free: 'Community Member',
    premium: 'Premium Member',
    founding: 'Founding Member',
  }

  const statusColors = {
    active: 'bg-[#EEF7EE] text-[#3D7840]',
    inactive: 'bg-gray-100 text-gray-600',
    expired: 'bg-red-50 text-red-600',
  }

  return (
    <div className="pt-28 pb-16 px-6 bg-[#FAFAF5] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Animate animation="fade-up">
          {/* Profile header */}
          <div className="bg-white rounded-3xl border border-[#f0e9dd] shadow-sm p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#5DA05A] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {user?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#2d2d2d] font-display">
                  {user?.full_name || 'Cool Kid'}
                </h1>
                <p className="text-[#555] text-sm mt-1">{user?.email}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${planColors[user?.membership_plan] || planColors.free}`}>
                    {planLabels[user?.membership_plan] || 'Community Member'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user?.membership_status] || statusColors.active}`}>
                    {user?.membership_status || 'Active'}
                  </span>
                  {user?.role === 'admin' && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF3FD] text-[#3A6FB8]">
                      Admin
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl border border-[#e8e0d8] text-[#555] text-sm font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </Animate>

        {/* Admin link */}
        {user?.role === 'admin' && (
          <Animate animation="fade-up" delay={100}>
            <Link
              to="/admin"
              className="block bg-[#EEF3FD] rounded-2xl border border-[#8AAED8]/30 p-6 mb-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#2d2d2d] font-display">Admin Dashboard</h3>
                  <p className="text-[#555] text-sm mt-1">Manage events, letters, and users</p>
                </div>
                <span className="text-[#3A6FB8] text-2xl">→</span>
              </div>
            </Link>
          </Animate>
        )}

        {/* My Events */}
        <Animate animation="fade-up" delay={200}>
          <div className="bg-white rounded-3xl border border-[#f0e9dd] shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#2d2d2d] font-display mb-6">My Events</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-3 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : myEvents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#555]">You haven't marked interest in any events yet.</p>
                <Link
                  to="/events"
                  className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-[#5DA05A] text-white text-sm font-semibold hover:bg-[#3D7840] transition-colors"
                >
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {myEvents.map((event) => (
                  <div key={event.id} className="flex gap-4 p-4 rounded-xl border border-[#f0e9dd] hover:shadow-sm transition-shadow">
                    {event.image_url && (
                      <img src={event.image_url} alt={event.title} className="w-20 h-16 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#2d2d2d] text-sm truncate">{event.title}</h3>
                      <p className="text-xs text-[#555] mt-1 capitalize">{event.category}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-[#EEF7EE] text-[#3D7840] capitalize">
                        {event.userStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Animate>

        <p className="text-center text-xs text-[#888] mt-8">
          Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
        </p>
      </div>
    </div>
  )
}
