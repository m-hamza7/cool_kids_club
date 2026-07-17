import { useState } from 'react'
import { Link } from 'react-router-dom'
import Animate from '../components/Animate'
import {
  Heart, Sparkles, Users, BookOpen, Leaf, Gift,
  CheckCircle, HandRaised, DollarSign, Repeat, ArrowRight,
} from '../components/Icons'

const impacts = [
  {
    icon: <Leaf className="w-7 h-7" />,
    iconBg: 'bg-[#EEF7EE]',
    iconColor: 'text-[#5DA05A]',
    title: 'Community Events',
    desc: 'Fund regular meetups, mental health awareness sessions, and community gatherings that bring people together.',
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    iconBg: 'bg-[#EEF3FD]',
    iconColor: 'text-[#5490D0]',
    title: 'Creative Workshops',
    desc: 'Cover supplies, materials, and resources needed to run art, journaling, photography, and crafting workshops.',
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    iconBg: 'bg-[#FEF3EA]',
    iconColor: 'text-[#E8834A]',
    title: 'Learning Resources',
    desc: 'Provide books, guides, and educational tools that support personal growth, creativity, and mental wellness.',
  },
  {
    icon: <Users className="w-7 h-7" />,
    iconBg: 'bg-[#FAFAF5]',
    iconColor: 'text-[#b59a6e]',
    title: 'Safe Spaces & Programs',
    desc: 'Keep the community accessible, inclusive, and supportive for every young person regardless of their background.',
  },
]

const allocationItems = [
  { label: 'Community Events & Meetups', pct: 40, color: 'bg-[#5DA05A]' },
  { label: 'Workshop Supplies & Resources', pct: 30, color: 'bg-[#5490D0]' },
  { label: 'Mental Health Programs', pct: 20, color: 'bg-[#E8834A]' },
  { label: 'Platform & Operations', pct: 10, color: 'bg-[#D4A830]' },
]

const volunteerRoles = [
  { icon: <Heart className="w-5 h-5" />, label: 'Community Support', desc: 'Be a friendly face — welcome new members and help them feel at home.' },
  { icon: <Sparkles className="w-5 h-5" />, label: 'Event Facilitation', desc: 'Help plan, organise, and run workshops and community events.' },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Content & Blog', desc: 'Write articles, share stories, or create content that inspires others.' },
  { icon: <Gift className="w-5 h-5" />, label: 'Creative Sessions', desc: 'Lead or assist with creative activities such as art, journaling, or crafts.' },
]

const PRESET_AMOUNTS = [5, 10, 25, 50]

export default function Donate() {
  const [frequency, setFrequency] = useState('one-time')
  const [selected, setSelected] = useState(10)
  const [custom, setCustom] = useState('')

  const displayAmount = custom !== '' ? custom : selected

  return (
    <div className="pt-20">

      {/* ── Hero ── */}
      <section className="relative bg-[#FAFAF5] overflow-hidden">
        <div className="absolute top-16 left-8 w-72 h-72 rounded-full bg-[#EEF7EE]/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-8 w-80 h-80 rounded-full bg-[#EEF3FD]/50 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <Animate animation="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDEAEA] text-[#D45858] text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> Make a Difference
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d] mb-6 leading-tight">
              Support Our Mission
            </h1>
            <p className="text-xl text-[#666] mb-4 max-w-2xl mx-auto leading-relaxed">
              Every small act of kindness helps us create a more supportive, creative, and mentally healthy community.
            </p>
            <p className="text-base text-[#777] max-w-2xl mx-auto leading-relaxed mb-10">
              At Cool Kids Club, our goal is to make meaningful activities, awareness sessions, creative workshops, and
              community events accessible to everyone. Your support helps us organise more events, provide resources,
              and continue building a safe space where people can connect, learn, and grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#donate-form"
                className="px-8 py-3 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors shadow-sm"
              >
                Donate Now
              </a>
              <a
                href="#volunteer"
                className="px-8 py-3 rounded-full border-2 border-[#8AAED8] text-[#3A6FB8] font-semibold hover:bg-[#EEF3FD] transition-colors"
              >
                Become a Volunteer
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── What Your Support Enables ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
                What Your Support Enables
              </h2>
              <p className="text-[#777] max-w-xl mx-auto">
                Every contribution — big or small — goes directly towards building a healthier, more creative, and more
                connected community.
              </p>
            </div>
          </Animate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((item, i) => (
              <Animate key={item.title} animation="fade-up" delay={i * 80}>
                <div className="bg-[#fafafa] rounded-2xl p-6 border border-[#f0ebe2] hover:shadow-md transition-shadow h-full">
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#777] leading-relaxed">{item.desc}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donation Form ── */}
      <section id="donate-form" className="bg-[#EEF7EE] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Animate animation="scale-up">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-[#FDEAEA] flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-[#D45858]" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-2">
                  Choose Your Contribution
                </h2>
                <p className="text-[#777] text-sm">
                  Donations are used to support community programs, event resources, and future initiatives.
                </p>
              </div>

              {/* Frequency toggle */}
              <div className="flex rounded-full border border-[#e0d8ce] p-1 mb-8 bg-[#FAFAF5]">
                {['one-time', 'monthly'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFrequency(opt)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      frequency === opt
                        ? 'bg-white shadow-sm text-[#2d2d2d]'
                        : 'text-[#888] hover:text-[#555]'
                    }`}
                  >
                    {opt === 'monthly' && <Repeat className="w-4 h-4" />}
                    {opt === 'one-time' ? 'One-Time' : 'Monthly'}
                  </button>
                ))}
              </div>

              {/* Preset amounts */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelected(amt); setCustom('') }}
                    className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                      selected === amt && custom === ''
                        ? 'border-[#5DA05A] bg-[#EEF7EE] text-[#3D7840]'
                        : 'border-[#e8e0d8] text-[#555] hover:border-[#5DA05A]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="mb-8">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] font-semibold">$</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter custom amount"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
                    className="w-full pl-8 pr-4 py-3 border-2 border-[#e8e0d8] rounded-xl text-sm text-[#2d2d2d] placeholder-[#bbb] focus:border-[#5DA05A] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button className="w-full py-4 rounded-full bg-[#5DA05A] text-white font-bold text-base hover:bg-[#3D7840] transition-colors shadow-sm flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                {frequency === 'monthly'
                  ? `Donate $${displayAmount || '...'} / month`
                  : `Donate $${displayAmount || '...'} Once`}
              </button>

              <p className="text-center text-xs text-[#aaa] mt-4">
                This is a community initiative. All contributions are voluntary and gratefully received.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Where It Goes ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
                Where Every Penny Goes
              </h2>
              <p className="text-[#777] max-w-xl mx-auto">
                We are committed to full transparency. Here is how we plan to use the funds raised by our community.
              </p>
            </div>
          </Animate>
          <div className="space-y-5">
            {allocationItems.map((item, i) => (
              <Animate key={item.label} animation="slide-left" delay={i * 80}>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#555] w-52 shrink-0">{item.label}</span>
                  <div className="flex-1 bg-[#f0ebe2] rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-[#2d2d2d] w-10 text-right">{item.pct}%</span>
                </div>
              </Animate>
            ))}
          </div>
          <Animate animation="fade-up" delay={400}>
            <p className="text-center text-sm text-[#999] mt-10">
              Allocations are approximate and may adjust as the community grows. We will always keep you informed.
            </p>
          </Animate>
        </div>
      </section>

      {/* ── Volunteer Section ── */}
      <section id="volunteer" className="bg-[#EEF3FD] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5E6F8] text-[#3A6FB8] text-sm font-semibold mb-5">
                <HandRaised className="w-4 h-4" /> Give Your Time
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
                Can't Donate? Become a Volunteer.
              </h2>
              <p className="text-[#777] max-w-xl mx-auto">
                Your time, energy, and passion are just as valuable as any financial contribution.
                We welcome anyone who wants to help build this community.
              </p>
            </div>
          </Animate>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {volunteerRoles.map((role, i) => (
              <Animate key={role.label} animation="fade-up" delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-[#C5D8F0] hover:shadow-md transition-shadow h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF3FD] text-[#5490D0] flex items-center justify-center mb-4">
                    {role.icon}
                  </div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2 text-sm">{role.label}</h3>
                  <p className="text-xs text-[#777] leading-relaxed">{role.desc}</p>
                </div>
              </Animate>
            ))}
          </div>

          <Animate animation="scale-up">
            <div className="text-center">
              <Link
                to="/join"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#5490D0] text-white font-bold text-base hover:bg-[#3A6FB8] transition-colors shadow-sm"
              >
                <HandRaised className="w-5 h-5" />
                Become a Volunteer
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-[#999] mt-4">
                Fill in your details on the Join Us page and let us know you'd like to volunteer.
              </p>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── Reassurance / CTA ── */}
      <section className="bg-[#FAFAF5] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <div className="w-16 h-16 rounded-full bg-[#EEF7EE] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#5DA05A]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-5">
              Every Penny Counts
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-3">
              We are a grassroots community at the very beginning of our journey. There are no hidden fees, no
              corporate overhead — just a small team passionate about making a real difference.
            </p>
            <p className="text-[#777] mb-10">
              Whether you give $5 or $50, donate your time, or simply spread the word — you are part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#donate-form"
                className="px-8 py-3 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors shadow-sm"
              >
                Support Us Today
              </a>
              <Link
                to="/contact"
                className="px-8 py-3 rounded-full border-2 border-[#e8e0d8] text-[#555] font-semibold hover:bg-[#f0ebe2] transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </Animate>
        </div>
      </section>

    </div>
  )
}
