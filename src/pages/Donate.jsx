import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { users as usersApi } from '../lib/api'
import Animate from '../components/Animate'
import {
  Heart, Sparkles, Users, BookOpen, Leaf, Gift,
  CheckCircle, HandRaised, ArrowRight,
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

export default function Donate() {
  const { user, refetchUser } = useAuth()
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleDonationSubmit = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/join')
    const val = parseInt(amount, 10)
    if (!val || val <= 0) return setError('Please enter a valid amount')

    setError('')
    setSubmitting(true)
    try {
      await usersApi.recordDonation({ amount: val })
      await refetchUser()
      setSubmitted(true)
      setAmount('')
    } catch (err) {
      setError(err.message || 'Could not record donation')
    }
    setSubmitting(false)
  }

  return (
    <div className="pt-20">

      {/* Hero */}
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

      {/* What Your Support Enables */}
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

      {/* Donation Form */}
      <section id="donate-form" className="bg-[#EEF7EE] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <Animate animation="scale-up">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#EEF7EE] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#5DA05A]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#2d2d2d] mb-3">Thank You!</h3>
                  <p className="text-[#555] mb-6">Your donation of Rs. {amount || 'your contribution'} has been recorded. You can see it on your profile.</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border-2 border-[#5DA05A] text-[#5DA05A] font-semibold hover:bg-[#5DA05A] hover:text-white transition-all"
                    >
                      Donate Again
                    </button>
                    <Link
                      to="/profile"
                      className="px-6 py-2.5 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-[#FDEAEA] flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-7 h-7 text-[#D45858]" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#2d2d2d] mb-2">
                      How to Donate
                    </h2>
                    <p className="text-[#777] text-sm">
                      Send your donation via bank transfer and let us know the amount below.
                    </p>
                  </div>

                  {/* Step 1: Bank Details */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-[#2d2d2d] mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#5DA05A] text-white text-xs flex items-center justify-center font-bold">1</span>
                      Send payment to this account
                    </h4>
                    <div className="bg-[#FAFAF5] rounded-xl p-5 border border-[#e8e0d8] space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#888]">Account Name</span>
                        <span className="font-semibold text-[#2d2d2d]">Areeba Rehman</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#888]">IBAN</span>
                        <span className="font-semibold text-[#2d2d2d] text-xs sm:text-sm">PK10UNIL0109000336793339</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#888]">Bank</span>
                        <span className="font-semibold text-[#2d2d2d]">UBL</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Record Amount */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-[#2d2d2d] mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#5DA05A] text-white text-xs flex items-center justify-center font-bold">2</span>
                      Enter the amount you donated
                    </h4>

                    {error && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {!user && (
                      <div className="mb-4 p-4 rounded-xl bg-[#FEF9EA] border border-[#D4A830]/30 text-sm text-[#555]">
                        You need to <Link to="/join" className="text-[#5DA05A] font-semibold underline">create an account</Link> or <Link to="/login" className="text-[#5DA05A] font-semibold underline">sign in</Link> first so we can record your donation on your profile.
                      </div>
                    )}

                    <form onSubmit={handleDonationSubmit}>
                      <div className="relative mb-4">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888] font-semibold text-sm">Rs.</span>
                        <input
                          type="number"
                          min="1"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-[#e8e0d8] rounded-xl text-sm text-[#2d2d2d] placeholder-[#bbb] focus:border-[#5DA05A] focus:outline-none transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting || !user}
                        className="w-full py-4 rounded-full bg-[#5DA05A] text-white font-bold text-base hover:bg-[#3D7840] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Heart className="w-5 h-5" />
                        {submitting ? 'Recording...' : 'Record My Donation'}
                      </button>
                    </form>
                  </div>

                  <p className="text-center text-xs text-[#aaa]">
                    Your donation will be visible on your profile. Thank you for supporting our community!
                  </p>
                </>
              )}
            </div>
          </Animate>
        </div>
      </section>

      {/* Where It Goes */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
                Where Every Rupee Goes
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

      {/* Volunteer Section */}
      <section id="volunteer" className="bg-[#EEF3FD] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <Animate animation="fade-up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5E6F8] text-[#3A6FB8] text-sm font-semibold mb-5">
                <HandRaised className="w-4 h-4" /> Give Your Time
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-4">
                {"Can't Donate? Become a Volunteer."}
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

      {/* Reassurance / CTA */}
      <section className="bg-[#FAFAF5] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Animate animation="fade-up">
            <div className="w-16 h-16 rounded-full bg-[#EEF7EE] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#5DA05A]" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d2d2d] mb-5">
              Every Rupee Counts
            </h2>
            <p className="text-[#666] text-lg leading-relaxed mb-3">
              We are a grassroots community at the very beginning of our journey. There are no hidden fees, no
              corporate overhead — just a small team passionate about making a real difference.
            </p>
            <p className="text-[#777] mb-10">
              Whether you give Rs. 100 or Rs. 5,000, donate your time, or simply spread the word — you are part of something meaningful.
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
