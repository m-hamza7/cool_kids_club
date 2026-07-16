import { Link } from 'react-router-dom'
import { Lock, Handshake, Sprout, MessageCircle, Target, Globe, Leaf } from '../components/Icons'

const team = [
  {
    name: 'Zara Okonkwo',
    role: 'Founder & CEO',
    bio: 'Mental health advocate, author, and youth speaker. Zara started CKC after her own journey with anxiety as a teenager.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Marcus Reid',
    role: 'Community Director',
    bio: 'Social worker and certified life coach with 7 years experience supporting teens and young adults.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Priya Nair',
    role: 'Wellness Lead',
    bio: 'Mindfulness instructor and therapist-in-training. She designs our wellness workshops and peer circles.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Leo Santos',
    role: 'Creative Director',
    bio: 'Artist, storyteller, and creative facilitator who leads our monthly creativity challenges.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
]

const values = [
  {
    icon: <Lock className="w-7 h-7" />,
    iconColor: 'text-[#87a882]',
    bg: 'bg-[#e8f0e7]',
    title: 'Safety First',
    desc: 'Every space we hold is moderated and intentionally curated so every member feels protected.',
  },
  {
    icon: <Handshake className="w-7 h-7" />,
    iconColor: 'text-[#b8a9c9]',
    bg: 'bg-[#ede8f5]',
    title: 'Radical Inclusion',
    desc: 'No matter your background, identity, or story — you are welcome and celebrated here.',
  },
  {
    icon: <Sprout className="w-7 h-7" />,
    iconColor: 'text-[#87a882]',
    bg: 'bg-[#e8f0e7]',
    title: 'Authentic Growth',
    desc: "We don't believe in toxic positivity. Real growth comes from honest, supported reflection.",
  },
  {
    icon: <MessageCircle className="w-7 h-7" />,
    iconColor: 'text-[#b8a9c9]',
    bg: 'bg-[#ede8f5]',
    title: 'Open Dialogue',
    desc: "Mental health shouldn't be taboo. We talk about it openly, with care and compassion.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    iconColor: 'text-[#c47b70]',
    bg: 'bg-[#fdf0ee]',
    title: 'Intentional Community',
    desc: 'Every event, resource, and interaction is thoughtfully designed for impact.',
  },
  {
    icon: <Globe className="w-7 h-7" />,
    iconColor: 'text-[#d4a853]',
    bg: 'bg-[#faf6ef]',
    title: 'Global Perspective',
    desc: 'We bring together young people from every corner of the world for richer conversations.',
  },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-20 px-6"
        style={{ background: 'linear-gradient(135deg, #e8f0e7 0%, #faf6ef 60%, #ede8f5 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-6 font-display">
            Built by Young People,{' '}
            <span style={{ color: '#87a882' }}>For Young People</span>
          </h1>
          <p className="text-[#555] text-lg leading-relaxed max-w-2xl mx-auto">
            Cool Kids Club was born from a simple truth: being young today is hard. Between social pressure, mental health struggles, and the search for identity — young people deserve a real community that sees them.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=500&fit=crop"
              alt="Founder story"
              className="rounded-3xl shadow-xl w-full object-cover h-[420px]"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#2d2d2d] mb-5 font-display">How It All Started</h2>
            <p className="text-[#555] leading-relaxed mb-4">
              In 2021, founder Zara Okonkwo was 22 years old and struggling with anxiety after college. She looked for communities online and found either toxic positivity or clinical detachment — nothing that felt real and safe.
            </p>
            <p className="text-[#555] leading-relaxed mb-4">
              She started a small WhatsApp group of 12 friends. They talked honestly about their mental health, shared resources, celebrated small wins, and held space for hard days. Within months, it had grown to 300 people across three continents.
            </p>
            <p className="text-[#555] leading-relaxed mb-6">
              Today, Cool Kids Club is a global community of over 2,400 members — and still growing with the same heart it started with.
            </p>
            <Link
              to="/join"
              className="inline-block px-6 py-3 rounded-full bg-[#87a882] text-white font-semibold hover:bg-[#5e7d59] transition-colors"
            >
              Be Part of the Story
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#faf6ef]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-[#f0e9dd]">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#e8f0e7] flex items-center justify-center">
                <Leaf className="w-8 h-8 text-[#87a882]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#2d2d2d] mb-4 font-display">Our Mission</h2>
            <p className="text-[#555] text-xl italic leading-relaxed font-display">
              "To create a world where every young person has access to community, resources, and support that helps them flourish — not just survive."
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#b8a9c9] text-sm font-semibold uppercase tracking-widest">What We Believe</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 font-display">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-[#faf6ef] border border-[#f0e9dd] hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center mb-4 ${v.iconColor}`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#2d2d2d] text-lg mb-2">{v.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #ede8f5 0%, #faf6ef 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">The Humans Behind CKC</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 font-display">Meet the Team</h2>
            <p className="text-[#555] mt-3 max-w-xl mx-auto">
              Every person on our team has been through their own journey — and is here because they genuinely believe in this community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-[#f0e9dd]"
                />
                <h3 className="font-bold text-[#2d2d2d] mb-1">{t.name}</h3>
                <div className="text-[#87a882] text-xs font-semibold uppercase tracking-wide mb-3">{t.role}</div>
                <p className="text-[#555] text-xs leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2d2d2d] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4 font-display">Come As You Are</h2>
          <p className="text-gray-400 mb-8">
            No prerequisites. No perfect version of yourself required. Just show up, and let the community do the rest.
          </p>
          <Link
            to="/join"
            className="inline-block px-8 py-4 rounded-full bg-[#87a882] text-white font-semibold hover:bg-[#5e7d59] transition-all"
          >
            Join Us Today
          </Link>
        </div>
      </section>
    </div>
  )
}
