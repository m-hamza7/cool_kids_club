import { Link } from 'react-router-dom'
import { Leaf, Sparkles, Palette, Heart, Check } from '../components/Icons'

const stats = [
  { number: '2,400+', label: 'Community Members' },
  { number: '120+', label: 'Events Hosted' },
  { number: '48', label: 'Countries Represented' },
  { number: '98%', label: 'Feel More Connected' },
]

const pillars = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Mental Wellness',
    desc: "Evidence-based tools, peer support circles, and resources to help you navigate life's challenges with grace.",
    color: 'bg-[#e8f0e7]',
    border: 'border-[#87a882]',
    iconColor: 'text-[#87a882]',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Personal Growth',
    desc: 'Workshops, challenges, and accountability partnerships that help you become your best self.',
    color: 'bg-[#ede8f5]',
    border: 'border-[#b8a9c9]',
    iconColor: 'text-[#b8a9c9]',
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Creativity',
    desc: 'Express yourself through writing, art, music, and storytelling in a space free of judgment.',
    color: 'bg-[#fdf0ee]',
    border: 'border-[#e8c5c1]',
    iconColor: 'text-[#c47b70]',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Connection',
    desc: 'Find your people — real friendships built on shared values, vulnerability, and mutual support.',
    color: 'bg-[#faf6ef]',
    border: 'border-[#d4bc8a]',
    iconColor: 'text-[#d4a853]',
  },
]

const testimonials = [
  {
    quote: "Cool Kids Club gave me a safe space to be honest about my anxiety. I've never felt so understood.",
    name: 'Amara, 19',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: "The monthly workshops literally changed how I see myself. I feel so much more confident now.",
    name: 'Jaylen, 21',
    location: 'Atlanta, USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    quote: "I joined not knowing anyone. Now I have friends across the world who truly get me.",
    name: 'Sofia, 17',
    location: 'Lisbon, Portugal',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
]

export default function Home() {
  return (
    <div className="pt-0">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #e8f0e7 0%, #faf6ef 40%, #ede8f5 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#b8a9c9]/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#87a882]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#e8c5c1]/10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 text-center py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#87a882]/30 text-[#5e7d59] text-sm font-medium mb-8 shadow-sm">
            <Leaf className="w-4 h-4" />
            <span>A space to grow, connect &amp; thrive</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2d2d2d] leading-tight mb-6 font-display">
            You Belong Here,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #87a882, #b8a9c9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Always.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#555] max-w-2xl mx-auto mb-10 leading-relaxed">
            Cool Kids Club is a mental wellness community for teenagers and young adults — where you can heal, grow, create, and build real friendships that last.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="px-8 py-4 rounded-full bg-[#87a882] text-white font-semibold text-base hover:bg-[#5e7d59] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Join for Free Today
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-full bg-white text-[#2d2d2d] font-semibold text-base hover:bg-[#f0e9dd] transition-all border border-[#e8e0d8] shadow-sm"
            >
              Learn More
            </Link>
          </div>

          {/* Hero image grid */}
          <div className="mt-16 grid grid-cols-3 gap-3 max-w-3xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop"
              alt="Friends laughing together"
              className="rounded-2xl object-cover w-full h-40 shadow-md col-span-2"
            />
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop"
              alt="Young people in conversation"
              className="rounded-2xl object-cover w-full h-40 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400&h=300&fit=crop"
              alt="Creative journaling"
              className="rounded-2xl object-cover w-full h-40 shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop"
              alt="Reading and growth"
              className="rounded-2xl object-cover w-full h-40 shadow-md col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-[#87a882] mb-1">{s.number}</div>
              <div className="text-sm text-[#555]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-[#faf6ef]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">Our Pillars</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 font-display">
              What We Stand For
            </h2>
            <p className="text-[#555] mt-3 max-w-xl mx-auto">
              Everything we do is guided by four core values that create a truly transformative community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className={`${p.color} rounded-2xl p-6 border-t-4 ${p.border} hover:shadow-lg transition-shadow`}
              >
                <div className={`mb-4 ${p.iconColor}`}>{p.icon}</div>
                <h3 className="font-bold text-[#2d2d2d] text-lg mb-2">{p.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#b8a9c9] text-sm font-semibold uppercase tracking-widest">Community First</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 mb-6 font-display">
                A Community That Actually Gets You
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                We're not just another online group. Cool Kids Club is a curated, intentional space where every member is welcomed, seen, and celebrated exactly as they are.
              </p>
              <ul className="space-y-3">
                {[
                  'Weekly virtual hangouts & peer support circles',
                  'Monthly workshops on mental health & personal growth',
                  'Creative challenges, book clubs, and journal prompts',
                  'A private members-only community platform',
                  "Direct access to the founder's monthly letter",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#555] text-sm">
                    <Check className="w-4 h-4 text-[#87a882] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/membership"
                className="inline-block mt-8 px-6 py-3 rounded-full bg-[#b8a9c9] text-white font-semibold hover:bg-[#8e7aab] transition-colors"
              >
                See Membership Options
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=700&fit=crop"
                alt="Community members connecting"
                className="rounded-3xl shadow-xl w-full object-cover h-[480px]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#f0e9dd]">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#2d2d2d]">Join 2,400+ members</div>
                    <div className="text-xs text-[#555]">from 48 countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #ede8f5 0%, #faf6ef 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#b8a9c9] text-sm font-semibold uppercase tracking-widest">Voices</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 font-display">
              What Our Members Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm border border-[#f0e9dd] hover:shadow-md transition-shadow">
                <svg className="w-8 h-8 text-[#b8a9c9] mb-4" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5C7.5 11.515 9.015 9.5 11 9.5L10 8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-2.485 1.515-4.5 3.5-4.5L24 8z" />
                </svg>
                <p className="text-[#555] text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-[#2d2d2d] text-sm">{t.name}</div>
                    <div className="text-xs text-[#888]">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2d2d2d]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Ready to Find Your People?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Join thousands of young people building a healthier, more connected life — starting today. It's free to begin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="px-8 py-4 rounded-full bg-[#87a882] text-white font-semibold hover:bg-[#5e7d59] transition-all"
            >
              Join the Community
            </Link>
            <Link
              to="/founders-letter"
              className="px-8 py-4 rounded-full border border-gray-600 text-gray-300 font-semibold hover:border-[#87a882] hover:text-[#87a882] transition-all"
            >
              Read the Founder's Letter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
