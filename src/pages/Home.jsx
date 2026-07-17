import { Link } from 'react-router-dom'
import { Leaf, Sparkles, Palette, Heart, Check, Target, Globe, MessageCircle, BookOpen } from '../components/Icons'
import Animate from '../components/Animate'

const pillars = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Mental Wellness',
    desc: "Evidence-based tools, peer support circles, and resources to help you navigate life's challenges with grace.",
    color: 'bg-[#EEF7EE]',
    border: 'border-[#5DA05A]',
    iconColor: 'text-[#5DA05A]',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Personal Growth',
    desc: 'Workshops, challenges, and accountability partnerships that help you become your best self.',
    color: 'bg-[#EEF3FD]',
    border: 'border-[#8AAED8]',
    iconColor: 'text-[#8AAED8]',
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: 'Creativity',
    desc: 'Express yourself through writing, art, music, and storytelling in a space free of judgment.',
    color: 'bg-[#FEF3EA]',
    border: 'border-[#E8834A]',
    iconColor: 'text-[#E8834A]',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Connection',
    desc: 'Find your people — real friendships built on shared values, vulnerability, and mutual support.',
    color: 'bg-[#FEF9EA]',
    border: 'border-[#D4A830]',
    iconColor: 'text-[#D4A830]',
  },
]

const goals = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    iconColor: 'text-[#5DA05A]',
    bg: 'bg-[#EEF7EE]',
    title: 'Create Safe Spaces',
    desc: 'Build a judgment-free environment where young people can talk openly about mental health, struggles, and growth — without shame.',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    iconColor: 'text-[#8AAED8]',
    bg: 'bg-[#EEF3FD]',
    title: 'Host Meaningful Events',
    desc: 'Run monthly workshops, creative sessions, and peer circles that give members real tools, real skills, and real relationships.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    iconColor: 'text-[#D4A830]',
    bg: 'bg-[#FAFAF5]',
    title: 'Build a Global Community',
    desc: 'Connect young people across cities and continents — united by shared values of kindness, honesty, and the desire to grow.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    iconColor: 'text-[#E8834A]',
    bg: 'bg-[#FEF3EA]',
    title: 'Make Wellness Accessible',
    desc: 'Provide free resources, guides, and community support so that cost and access are never barriers to mental wellness.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    iconColor: 'text-[#D45858]',
    bg: 'bg-[#FDEAEA]',
    title: 'Empower Young Leaders',
    desc: 'Nurture a generation of emotionally intelligent, self-aware young people who lead with empathy in every space they enter.',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    iconColor: 'text-[#5DA05A]',
    bg: 'bg-[#EEF7EE]',
    title: 'Grow With Intention',
    desc: 'Expand slowly and thoughtfully — keeping the community intimate, moderated, and genuinely valuable at every stage of growth.',
  },
]

export default function Home() {
  return (
    <div className="pt-0">
      {/* Hero — soft sage, no gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#EEF7EE]">
        {/* Subtle decorative blobs (solid-fill, no gradient) */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#C8DCF0]/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#A8D4A8]/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center py-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#5DA05A]/30 text-[#3D7840] text-sm font-medium mb-8 shadow-sm">
            <Leaf className="w-4 h-4" />
            <span>A space to grow, connect &amp; thrive</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2d2d2d] leading-tight mb-6 font-display">
            You Belong Here,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #5DA05A, #8AAED8)',
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
              className="px-8 py-4 rounded-full bg-[#5DA05A] text-white font-semibold text-base hover:bg-[#3D7840] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Be a Member
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
              src="/Hero1.jpg"
              alt="Creative art workshop with friends"
              className="rounded-2xl object-cover w-full h-40 shadow-md col-span-2"
            />
            <img
              src="/Hero4.jpg"
              alt="Young people at an outdoor gathering"
              className="rounded-2xl object-cover w-full h-40 shadow-md"
            />
            <img
              src="/Hero3.jpg"
              alt="Community creativity session"
              className="rounded-2xl object-cover w-full h-40 shadow-md"
            />
            <img
              src="/Hero2.jpg"
              alt="Kids watching a cozy movie night together"
              className="rounded-2xl object-cover w-full h-40 shadow-md col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <Animate animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">Our Pillars</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 font-display">
                What We Stand For
              </h2>
              <p className="text-[#555] mt-3 max-w-xl mx-auto">
                Everything we do is guided by four core values that create a truly transformative community.
              </p>
            </div>
          </Animate>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <Animate key={p.title} animation="fade-up" delay={i * 90}>
                <div className={`${p.color} rounded-2xl p-6 border-t-4 ${p.border} hover:shadow-lg transition-shadow h-full`}>
                  <div className={`mb-4 ${p.iconColor}`}>{p.icon}</div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-2">{p.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Animate animation="slide-left">
              <div>
                <span className="text-[#8AAED8] text-sm font-semibold uppercase tracking-widest">Community First</span>
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
                      <Check className="w-4 h-4 text-[#5DA05A] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/membership"
                  className="inline-block mt-8 px-6 py-3 rounded-full bg-[#5490D0] text-white font-semibold hover:bg-[#3A6FB8] transition-colors"
                >
                  See Membership Options
                </Link>
              </div>
            </Animate>
            <Animate animation="slide-right">
              <div className="relative">
                <img
                  src="/Hero1.jpg"
                  alt="Community members in a creative workshop"
                  className="rounded-3xl shadow-xl w-full object-cover h-[480px]"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#f0e9dd]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EEF7EE] flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-[#5DA05A]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#2d2d2d]">Now accepting</div>
                      <div className="text-xs text-[#555]">Founding members</div>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>

      {/* Vision — soft cream, no gradient */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Animate animation="fade-up">
            <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">Where We're Headed</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 mb-6 font-display">
              Our Vision
            </h2>
          </Animate>
          <Animate animation="scale-up" delay={100}>
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-[#f0e9dd]">
              <div className="w-14 h-14 rounded-full bg-[#EEF7EE] flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-7 h-7 text-[#5DA05A]" />
              </div>
              <p className="text-[#2d2d2d] text-xl leading-relaxed font-display italic">
                "A world where every young person has a safe space to be honest, grow at their own pace, and belong to a community that truly sees them."
              </p>
              <div className="mt-6 pt-6 border-t border-[#f0e9dd]">
                <p className="text-[#555] text-sm leading-relaxed">
                  We're just getting started. Cool Kids Club is a brand-new community built from the ground up with intention, care, and a deep belief that young people deserve better spaces. Every event, every resource, every conversation is designed with one question in mind: <strong className="text-[#2d2d2d]">does this make someone feel less alone?</strong>
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>

      {/* Goals — soft lavender, no gradient */}
      <section className="py-20 bg-[#EEF3FD]">
        <div className="max-w-6xl mx-auto px-6">
          <Animate animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-[#3A6FB8] text-sm font-semibold uppercase tracking-widest">What We're Building</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d2d2d] mt-2 font-display">
                Our Goals
              </h2>
              <p className="text-[#555] mt-3 max-w-xl mx-auto">
                These are the commitments we're making to every member who joins us — from day one.
              </p>
            </div>
          </Animate>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((g, i) => (
              <Animate key={g.title} animation="fade-up" delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 border border-[#f0e9dd] hover:shadow-md transition-shadow h-full">
                  <div className={`w-12 h-12 rounded-xl ${g.bg} flex items-center justify-center mb-5 ${g.iconColor}`}>
                    {g.icon}
                  </div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-2">{g.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{g.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2d2d2d]">
        <Animate animation="fade-up">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Be Part of Something Real
            </h2>
            <p className="text-gray-400 mb-2 leading-relaxed">
              We're in our early days — and that makes this moment special. The people who join now will shape what Cool Kids Club becomes.
            </p>
            <p className="text-gray-500 text-sm mb-8">No fake numbers. No inflated promises. Just a genuine community being built with care.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/join"
                className="px-8 py-4 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-all"
              >
                Join as a Founding Member
              </Link>
              <Link
                to="/founders-letter"
                className="px-8 py-4 rounded-full border border-gray-600 text-gray-300 font-semibold hover:border-[#5DA05A] hover:text-[#5DA05A] transition-all"
              >
                Read the Founder's Letter
              </Link>
            </div>
          </div>
        </Animate>
      </section>
    </div>
  )
}
