import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, BookOpen, Globe, Palette, Bell } from '../components/Icons'
import { useAuth } from '../context/AuthContext'
import { events as eventsApi } from '../lib/api'
import Animate from '../components/Animate'

const categoryMeta = {
  wellness: {
    label: 'Wellness Events',
    icon: <Leaf className="w-7 h-7" />,
    iconColor: 'text-[#5DA05A]',
    iconBg: 'bg-[#EEF7EE]',
    border: 'border-[#5DA05A]',
    tag: 'text-[#3D7840] bg-[#EEF7EE]',
    tagLabel: 'Wellness',
    desc: 'A space to explore mindfulness, self-care, emotional awareness, and healthy lifestyle habits.',
  },
  bookclub: {
    label: 'Book Club Events',
    icon: <BookOpen className="w-7 h-7" />,
    iconColor: 'text-[#3A6FB8]',
    iconBg: 'bg-[#EEF3FD]',
    border: 'border-[#8AAED8]',
    tag: 'text-[#3A6FB8] bg-[#EEF3FD]',
    tagLabel: 'Book Club',
    desc: 'A welcoming place for readers to discuss ideas, stories, and personal reflections through books.',
  },
  community: {
    label: 'Community Events',
    icon: <Globe className="w-7 h-7" />,
    iconColor: 'text-[#D4A830]',
    iconBg: 'bg-[#FEF9EA]',
    border: 'border-[#D4A830]',
    tag: 'text-[#9A7820] bg-[#FEF9EA]',
    tagLabel: 'Community',
    desc: 'Events designed to build friendships, meaningful conversations, and a sense of belonging.',
  },
  creativity: {
    label: 'Creativity Club Workshops',
    icon: <Palette className="w-7 h-7" />,
    iconColor: 'text-[#E8834A]',
    iconBg: 'bg-[#FEF3EA]',
    border: 'border-[#E8834A]',
    tag: 'text-[#C06030] bg-[#FEF3EA]',
    tagLabel: 'Creativity',
    desc: 'Creative sessions that encourage imagination, artistic expression, and discovering new talents.',
  },
}

const CATEGORY_ORDER = ['wellness', 'bookclub', 'community', 'creativity']

export default function Events() {
  const { user } = useAuth()
  const [eventsByCategory, setEventsByCategory] = useState({})
  const [attendance, setAttendance] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { events } = await eventsApi.list()
        const grouped = {}
        for (const ev of events) {
          if (!grouped[ev.category]) grouped[ev.category] = []
          grouped[ev.category].push(ev)
        }
        setEventsByCategory(grouped)

        if (user) {
          const att = {}
          await Promise.all(
            events.map(async (ev) => {
              try {
                const data = await eventsApi.getAttendance(ev.id)
                att[ev.id] = data
              } catch { /* ignore */ }
            })
          )
          setAttendance(att)
        }
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [user])

  const handleAttend = async (eventId, status) => {
    if (!user) return
    try {
      await eventsApi.attend(eventId, status)
      const data = await eventsApi.getAttendance(eventId)
      setAttendance((a) => ({ ...a, [eventId]: data }))
    } catch { /* ignore */ }
  }

  const removeAttendance = async (eventId) => {
    try {
      await eventsApi.removeAttendance(eventId)
      setAttendance((a) => ({ ...a, [eventId]: { count: (a[eventId]?.count || 1) - 1, userStatus: null } }))
    } catch { /* ignore */ }
  }

  const categories = CATEGORY_ORDER.filter((id) => eventsByCategory[id]?.length)

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center bg-[#EEF7EE]">
        <Animate animation="fade-up">
          <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">What's Coming</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
            Events &amp; Workshops
          </h1>
          <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
            We're building a calendar of live, interactive experiences across wellness, creativity, community, and books. Stay tuned — these are launching soon.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#5DA05A]/30 text-[#3D7840] text-sm font-medium shadow-sm">
            <Bell className="w-4 h-4" />
            <span>All events are free for members</span>
          </div>
        </Animate>
      </section>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Category quick-nav */}
          <div className="bg-white border-b border-[#f0e9dd] sticky top-16 z-30">
            <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
              {categories.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-[#FAFAF5] text-[#555] hover:bg-[#EEF7EE] hover:text-[#2d2d2d]"
                >
                  {categoryMeta[id]?.label || id}
                </a>
              ))}
            </div>
          </div>

          {/* Category sections */}
          {categories.map((catId, ci) => {
            const cat = categoryMeta[catId]
            const catEvents = eventsByCategory[catId] || []
            return (
              <section
                key={catId}
                id={catId}
                className={`py-20 scroll-mt-32 ${ci % 2 === 0 ? 'bg-[#FAFAF5]' : 'bg-white'}`}
              >
                <div className="max-w-6xl mx-auto px-6">
                  <Animate animation="fade-up">
                    <div className="flex flex-col md:flex-row md:items-center gap-5 mb-12">
                      <div className={`w-16 h-16 rounded-2xl ${cat.iconBg} flex items-center justify-center flex-shrink-0 ${cat.iconColor}`}>
                        {cat.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#2d2d2d] font-display">{cat.label}</h2>
                        <p className="text-[#555] mt-1 max-w-xl">{cat.desc}</p>
                      </div>
                    </div>
                  </Animate>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {catEvents.map((event, i) => {
                      const att = attendance[event.id]
                      const userStatus = att?.userStatus
                      return (
                        <Animate key={event.id} animation="fade-up" delay={i * 80}>
                          <div className={`bg-white rounded-2xl border border-[#f0e9dd] border-t-4 ${cat.border} overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full`}>
                            <div className="relative overflow-hidden">
                              <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full h-44 object-cover"
                              />
                              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${cat.tag} bg-opacity-90`}>
                                {cat.tagLabel}
                              </span>
                              {att?.count > 0 && (
                                <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-[#555] backdrop-blur-sm">
                                  {att.count} interested
                                </span>
                              )}
                            </div>

                            <div className="px-4 py-4 flex flex-col flex-1">
                              <h3 className="font-bold text-[#2d2d2d] text-sm leading-snug mb-1 flex-1">{event.title}</h3>
                              {event.event_date && (
                                <p className="text-xs text-[#888] mb-3">
                                  {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  {event.event_time ? ` at ${event.event_time}` : ''}
                                </p>
                              )}

                              <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0e9dd]">
                                {event.event_date ? (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF7EE] text-[#3D7840] text-xs font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DA05A] inline-block" />
                                    Upcoming
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef3cd] text-[#92650a] text-xs font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A830] inline-block" />
                                    Coming Soon
                                  </span>
                                )}

                                {user ? (
                                  userStatus && userStatus !== 'not_attending' ? (
                                    <button
                                      onClick={() => removeAttendance(event.id)}
                                      className="text-xs font-semibold text-[#3D7840] bg-[#EEF7EE] px-2.5 py-1 rounded-full hover:bg-[#d6edd6] transition-colors"
                                    >
                                      ✓ {userStatus === 'attending' ? 'Attending' : 'Interested'}
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleAttend(event.id, 'interested')}
                                      className="text-xs font-semibold text-[#5DA05A] hover:underline"
                                    >
                                      I'm interested →
                                    </button>
                                  )
                                ) : (
                                  <Link
                                    to="/login"
                                    className="text-xs font-semibold text-[#5DA05A] hover:underline"
                                  >
                                    Sign in to RSVP →
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </Animate>
                      )
                    })}
                  </div>
                </div>
              </section>
            )
          })}
        </>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#2d2d2d]">
        <Animate animation="fade-up">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5">
              <Bell className="w-7 h-7 text-[#5DA05A]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 font-display">
              Be the First to Know
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Join the community now and you'll get notified the moment events are scheduled. Members always get first access and early registration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={user ? '/profile' : '/join'}
                className="px-8 py-4 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-all"
              >
                {user ? 'View My Events' : 'Join Free & Get Notified'}
              </Link>
              <Link
                to="/membership"
                className="px-8 py-4 rounded-full border border-gray-600 text-gray-300 font-semibold hover:border-[#5DA05A] hover:text-[#5DA05A] transition-all"
              >
                Explore Membership
              </Link>
            </div>
          </div>
        </Animate>
      </section>
    </div>
  )
}
