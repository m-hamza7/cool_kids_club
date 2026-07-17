import { Link } from 'react-router-dom'
import { Leaf, BookOpen, Globe, Palette, Bell } from '../components/Icons'
import Animate from '../components/Animate'

const categories = [
  {
    id: 'wellness',
    label: 'Wellness Events',
    icon: <Leaf className="w-7 h-7" />,
    iconColor: 'text-[#5DA05A]',
    iconBg: 'bg-[#EEF7EE]',
    border: 'border-[#5DA05A]',
    tag: 'text-[#3D7840] bg-[#EEF7EE]',
    tagLabel: 'Wellness',
    desc: 'A space to explore mindfulness, self-care, emotional awareness, and healthy lifestyle habits.',
    events: [
      {
        title: 'Mindful Moments Workshop',
        // group yoga / meditation class in session
        img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=280&fit=crop',
      },
      {
        title: 'Self-Care & Stress Management Session',
        // woman doing yoga / stretching
        img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=280&fit=crop',
      },
      {
        title: 'Emotional Wellness Circle',
        // people sitting together in an open supportive group
        img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=280&fit=crop',
      },
      {
        title: 'Confidence & Personal Growth Workshop',
        // woman confidently presenting at a workshop
        img: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=500&h=280&fit=crop',
      },
    ],
  },
  {
    id: 'bookclub',
    label: 'Book Club Events',
    icon: <BookOpen className="w-7 h-7" />,
    iconColor: 'text-[#3A6FB8]',
    iconBg: 'bg-[#EEF3FD]',
    border: 'border-[#8AAED8]',
    tag: 'text-[#3A6FB8] bg-[#EEF3FD]',
    tagLabel: 'Book Club',
    desc: 'A welcoming place for readers to discuss ideas, stories, and personal reflections through books.',
    events: [
      {
        title: 'Monthly Book Discussion Meetup',
        // small group of friends/students talking over books
        img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=500&h=280&fit=crop',
      },
      {
        title: 'Character & Story Analysis Workshop',
        // person intently reading a book with a cup of coffee
        img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=280&fit=crop',
      },
      {
        title: 'Book-to-Life Reflection Session',
        // person reading thoughtfully in a cozy setting
        img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=280&fit=crop',
      },
      {
        title: 'Creative Writing & Storytelling Workshop',
        // person actively writing in a workshop environment
        img: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=280&fit=crop',
      },
    ],
  },
  {
    id: 'community',
    label: 'Community Events',
    icon: <Globe className="w-7 h-7" />,
    iconColor: 'text-[#D4A830]',
    iconBg: 'bg-[#FEF9EA]',
    border: 'border-[#D4A830]',
    tag: 'text-[#9A7820] bg-[#FEF9EA]',
    tagLabel: 'Community',
    desc: 'Events designed to build friendships, meaningful conversations, and a sense of belonging.',
    events: [
      {
        title: 'Community Connection Day',
        // diverse group of young people laughing together outdoors
        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=280&fit=crop',
      },
      {
        title: 'Friendship & Support Gathering',
        // close friends hugging and supporting each other
        img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=280&fit=crop',
      },
      {
        title: 'Mental Health Awareness Meetup',
        // people in an open, supportive group conversation
        img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=280&fit=crop',
      },
      {
        title: 'Community Celebration Event',
        // group of people celebrating joyfully together
        img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&h=280&fit=crop',
      },
    ],
  },
  {
    id: 'creativity',
    label: 'Creativity Club Workshops',
    icon: <Palette className="w-7 h-7" />,
    iconColor: 'text-[#E8834A]',
    iconBg: 'bg-[#FEF3EA]',
    border: 'border-[#E8834A]',
    tag: 'text-[#C06030] bg-[#FEF3EA]',
    tagLabel: 'Creativity',
    desc: 'Creative sessions that encourage imagination, artistic expression, and discovering new talents.',
    events: [
      {
        title: 'Art & Painting Workshop',
        // people painting on canvases together in a class
        img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=280&fit=crop',
      },
      {
        title: 'Journaling & Vision Board Session',
        // person cutting and arranging a vision board with magazines
        img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&h=280&fit=crop',
      },
      {
        title: 'DIY Crafts & Creative Activities',
        // hands crafting / making things in a workshop
        img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=280&fit=crop',
      },
      {
        title: 'Photography & Storytelling Workshop',
        // person looking through camera viewfinder
        img: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=500&h=280&fit=crop',
      },
    ],
  },
]

export default function Events() {
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

      {/* Category quick-nav */}
      <div className="bg-white border-b border-[#f0e9dd] sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-[#FAFAF5] text-[#555] hover:bg-[#EEF7EE] hover:text-[#2d2d2d]"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </div>

      {/* Category sections */}
      {categories.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`py-20 scroll-mt-32 ${ci % 2 === 0 ? 'bg-[#FAFAF5]' : 'bg-white'}`}
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Category header */}
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

            {/* Event cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.events.map((event, i) => (
                <Animate key={event.title} animation="fade-up" delay={i * 80}>
                  <div className={`bg-white rounded-2xl border border-[#f0e9dd] border-t-4 ${cat.border} overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full`}>
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-44 object-cover"
                      />
                      {/* Category badge over image */}
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${cat.tag} bg-opacity-90`}>
                        {cat.tagLabel}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="px-4 py-4 flex flex-col flex-1">
                      <h3 className="font-bold text-[#2d2d2d] text-sm leading-snug mb-3 flex-1">{event.title}</h3>

                      {/* Coming Soon + Notify */}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0e9dd]">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef3cd] text-[#92650a] text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A830] inline-block" />
                          Coming Soon
                        </span>
                        <Link
                          to="/join"
                          className="text-xs font-semibold text-[#5DA05A] hover:underline"
                        >
                          Notify me →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ))}

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
                to="/join"
                className="px-8 py-4 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-all"
              >
                Join Free &amp; Get Notified
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
