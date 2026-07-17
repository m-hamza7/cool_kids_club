import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { users as usersApi } from '../../lib/api'
import Animate from '../../components/Animate'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    usersApi.stats().then((data) => setStats(data.stats)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const cards = stats
    ? [
        { label: 'Total Users', value: stats.totalUsers, color: 'bg-[#EEF7EE] text-[#3D7840]', to: '/admin/users' },
        { label: 'Premium Members', value: stats.premiumUsers, color: 'bg-[#FEF9EA] text-[#9A7820]', to: '/admin/users' },
        { label: 'Active Members', value: stats.activeUsers, color: 'bg-[#EEF3FD] text-[#3A6FB8]', to: '/admin/users' },
        { label: 'Events', value: stats.totalEvents, color: 'bg-[#FEF3EA] text-[#C06030]', to: '/admin/events' },
        { label: 'Letters', value: stats.totalLetters, color: 'bg-[#FAFAF5] text-[#555]', to: '/admin/letters' },
      ]
    : []

  return (
    <div className="pt-28 pb-16 px-6 bg-[#FAFAF5] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Animate animation="fade-up">
          <h1 className="text-3xl font-bold text-[#2d2d2d] font-display mb-2">Admin Dashboard</h1>
          <p className="text-[#555] mb-10">Manage your Cool Kids Club community</p>
        </Animate>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {cards.map((card, i) => (
                <Animate key={card.label} animation="fade-up" delay={i * 60}>
                  <Link to={card.to} className={`block rounded-2xl p-6 ${card.color} hover:shadow-md transition-shadow`}>
                    <div className="text-3xl font-bold font-display">{card.value}</div>
                    <div className="text-sm mt-1 opacity-80">{card.label}</div>
                  </Link>
                </Animate>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { to: '/admin/events', label: 'Manage Events', desc: 'Create, edit, and publish events' },
                { to: '/admin/letters', label: 'Manage Letters', desc: 'Write and publish monthly letters' },
                { to: '/admin/users', label: 'Manage Users', desc: 'View and manage member accounts' },
              ].map((item, i) => (
                <Animate key={item.to} animation="fade-up" delay={i * 80}>
                  <Link
                    to={item.to}
                    className="block bg-white rounded-2xl border border-[#f0e9dd] p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <h3 className="font-bold text-[#2d2d2d] font-display text-lg">{item.label}</h3>
                    <p className="text-[#555] text-sm mt-2">{item.desc}</p>
                    <span className="inline-block mt-4 text-[#5DA05A] font-semibold text-sm">Go →</span>
                  </Link>
                </Animate>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
