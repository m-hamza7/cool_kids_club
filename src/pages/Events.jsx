import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, CheckCircle, Zap, Leaf } from '../components/Icons'

const categories = ['All', 'Wellness', 'Creativity', 'Growth', 'Social', 'Retreat']

const events = [
  {
    date: 'Jul 24, 2025',
    time: '7:00 PM WAT',
    title: 'Anxiety to Action: Tools for Managing Overwhelm',
    type: 'Workshop',
    category: 'Wellness',
    host: 'Priya Nair',
    access: 'Free',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=240&fit=crop',
    spots: 'Open',
    color: 'bg-[#e8f0e7]',
    badge: 'text-[#5e7d59] bg-[#e8f0e7]',
  },
  {
    date: 'Jul 28, 2025',
    time: '5:00 PM WAT',
    title: 'Creative Writing Circle: Finding Your Voice',
    type: 'Workshop',
    category: 'Creativity',
    host: 'Leo Santos',
    access: 'Premium',
    img: 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400&h=240&fit=crop',
    spots: '8 left',
    color: 'bg-[#ede8f5]',
    badge: 'text-[#8e7aab] bg-[#ede8f5]',
  },
  {
    date: 'Aug 2, 2025',
    time: '6:00 PM WAT',
    title: 'Monthly Community Hangout: August Edition',
    type: 'Social',
    category: 'Social',
    host: 'Marcus Reid',
    access: 'Free',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=240&fit=crop',
    spots: 'Open',
    color: 'bg-[#fdf0ee]',
    badge: 'text-[#c47b70] bg-[#fdf0ee]',
  },
  {
    date: 'Aug 9, 2025',
    time: '4:00 PM WAT',
    title: 'Goal-Setting Workshop: Your Next 90 Days',
    type: 'Workshop',
    category: 'Growth',
    host: 'Zara Okonkwo',
    access: 'Premium',
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=240&fit=crop',
    spots: '12 left',
    color: 'bg-[#faf6ef]',
    badge: 'text-[#888] bg-[#faf6ef]',
  },
  {
    date: 'Aug 16, 2025',
    time: '3:00 PM WAT',
    title: 'Peer Support Circle: Open Mic on Mental Health',
    type: 'Circle',
    category: 'Wellness',
    host: 'Priya Nair',
    access: 'Premium',
    img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=240&fit=crop',
    spots: '5 left',
    color: 'bg-[#e8f0e7]',
    badge: 'text-[#5e7d59] bg-[#e8f0e7]',
  },
  {
    date: 'Sep 6–7, 2025',
    time: 'Full Weekend',
    title: 'Virtual Wellness Retreat: Rest, Reset, Reconnect',
    type: 'Retreat',
    category: 'Retreat',
    host: 'Full CKC Team',
    access: 'Premium',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=240&fit=crop',
    spots: '20 left',
    color: 'bg-[#ede8f5]',
    badge: 'text-[#8e7aab] bg-[#ede8f5]',
  },
]

export default function Events() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? events : events.filter((e) => e.category === active)

  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #e8f0e7 0%, #faf6ef 60%, #ede8f5 100%)' }}
      >
        <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">What's On</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
          Events &amp; Workshops
        </h1>
        <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
          Live, interactive experiences designed to help you grow, heal, create, and connect — wherever you are in the world.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[#f0e9dd] sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                active === cat
                  ? 'bg-[#87a882] text-white'
                  : 'bg-[#faf6ef] text-[#555] hover:bg-[#e8f0e7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 bg-[#faf6ef]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div key={event.title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0e9dd] hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={event.img} alt={event.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.badge}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.access === 'Free' ? 'bg-[#87a882] text-white' : 'bg-[#2d2d2d] text-white'}`}>
                      {event.access}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#888] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#2d2d2d] text-base mb-2 leading-snug">{event.title}</h3>
                  <div className="text-xs text-[#555] mb-4">Hosted by <span className="font-semibold">{event.host}</span></div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#888] flex items-center gap-1">
                      {event.spots === 'Open' ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-[#87a882]" />
                          Open registration
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-[#d4a853]" />
                          {event.spots} spots
                        </>
                      )}
                    </span>
                    <Link
                      to={event.access === 'Free' ? '/join' : '/membership'}
                      className="px-4 py-2 rounded-full bg-[#87a882] text-white text-xs font-semibold hover:bg-[#5e7d59] transition-colors"
                    >
                      {event.access === 'Free' ? 'Register' : 'Join Premium'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#888]">
              <div className="flex justify-center mb-3">
                <Leaf className="w-10 h-10 text-[#b5cdb2]" />
              </div>
              <p>No events in this category right now. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#2d2d2d] mb-4 font-display">
            Never Miss an Event
          </h2>
          <p className="text-[#555] mb-8">
            Premium members get first access to all events and automatic calendar invites. Free members can attend select events each month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/membership"
              className="px-8 py-4 rounded-full bg-[#87a882] text-white font-semibold hover:bg-[#5e7d59] transition-all"
            >
              Explore Membership
            </Link>
            <Link
              to="/join"
              className="px-8 py-4 rounded-full border-2 border-[#87a882] text-[#87a882] font-semibold hover:bg-[#87a882] hover:text-white transition-all"
            >
              Join Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
