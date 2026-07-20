import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaceSad, FaceWorried, Sprout, Palette, MessageCircle,
  Sparkles, Leaf, Lock, Heart, LogOut, Check,
} from '../components/Icons'
import { useAuth } from '../context/AuthContext'
import { auth as authApi } from '../lib/api'
import Animate from '../components/Animate'

const steps = [
  { num: '01', title: 'Create Your Account', desc: 'Sign up in under 2 minutes. Completely free.' },
  { num: '02', title: 'Set Up Your Profile', desc: 'Tell us a little about yourself so we can connect you with the right people and resources.' },
  { num: '03', title: 'Join Your First Event', desc: 'Your welcome email includes an invite to our next community hangout. Say hi!' },
  { num: '04', title: 'Find Your Circle', desc: 'Get matched with a peer support circle and accountability partner who gets you.' },
]

const feelings = [
  { icon: <FaceSad className="w-5 h-5" />, iconColor: 'text-[#8AAED8]', label: 'Lonely or disconnected' },
  { icon: <FaceWorried className="w-5 h-5" />, iconColor: 'text-[#D45858]', label: 'Anxious or overwhelmed' },
  { icon: <Sprout className="w-5 h-5" />, iconColor: 'text-[#5DA05A]', label: 'Ready to grow' },
  { icon: <Palette className="w-5 h-5" />, iconColor: 'text-[#8AAED8]', label: 'Wanting to be creative' },
  { icon: <MessageCircle className="w-5 h-5" />, iconColor: 'text-[#5DA05A]', label: 'Looking for real community' },
  { icon: <Sparkles className="w-5 h-5" />, iconColor: 'text-[#D4A830]', label: 'Just curious' },
]

const reassurances = [
  {
    icon: <Lock className="w-6 h-6" />,
    iconColor: 'text-[#5DA05A]',
    bg: 'bg-[#EEF7EE]',
    title: 'Safe & Private',
    desc: 'Your data is never sold. Our community is moderated by trained team members.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    iconColor: 'text-[#D45858]',
    bg: 'bg-[#FEF3EA]',
    title: 'Judgment-Free',
    desc: 'This is a space built on kindness, compassion, and radical acceptance.',
  },
  {
    icon: <LogOut className="w-6 h-6" />,
    iconColor: 'text-[#8AAED8]',
    bg: 'bg-[#EEF3FD]',
    title: 'Leave Anytime',
    desc: "You're never locked in. Cancel or delete your account at any time.",
  },
]

export default function JoinUs() {
  const { user, refetchUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', age: '', why: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')

    setLoading(true)
    try {
      await authApi.signup({
        email: form.email,
        password: form.password,
        full_name: form.name,
        age_range: form.age,
        reason: form.why,
      })
      await refetchUser()
    } catch (err) {
      setError(err.message || 'Could not create account')
    }
    setLoading(false)
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center bg-[#EEF7EE]">
        <Animate animation="fade-up">
          <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">Welcome Home</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
            Join Cool Kids Club
          </h1>
          <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
            This might be the most important thing you do for yourself today. And it's free to start.
          </p>
        </Animate>
      </section>

      {/* Who is this for */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#2d2d2d] font-display">This Is For You If You're Feeling...</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {feelings.map((f) => (
              <div key={f.label} className="flex items-center gap-3 bg-[#FAFAF5] rounded-xl p-4 border border-[#f0e9dd]">
                <span className={`flex-shrink-0 ${f.iconColor}`}>{f.icon}</span>
                <span className="text-sm text-[#555] font-medium">{f.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-[#888] text-sm">
            Whatever brought you here — you're welcome exactly as you are.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#FAFAF5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#2d2d2d] font-display">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((s, i) => (
              <Animate key={s.num} animation="fade-up" delay={i * 90}>
              <div className="flex gap-5 bg-white rounded-2xl p-6 border border-[#f0e9dd] shadow-sm h-full">
                <div className="text-3xl font-bold text-[#5DA05A]/30 font-display">{s.num}</div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] mb-1">{s.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up Form / Welcome */}
      <section className="py-20 bg-white">
        <div className="max-w-xl mx-auto px-6">
          {user ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-[#EEF7EE] flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-[#5DA05A]" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-3 font-display">
                Welcome to the Club, {user.full_name?.split(' ')[0] || 'Cool Kid'}!
              </h2>
              <p className="text-[#555] mb-6 leading-relaxed">
                You're already a member. Explore events, read the founder's letter, or upgrade your membership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/events"
                  className="px-6 py-3 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors"
                >
                  Browse Events
                </Link>
                <Link
                  to="/membership"
                  className="px-6 py-3 rounded-full border-2 border-[#5DA05A] text-[#5DA05A] font-semibold hover:bg-[#5DA05A] hover:text-white transition-all"
                >
                  View Plans
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">Create Your Account</h2>
                <p className="text-[#555] mt-2">Join the Community plan — completely free.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#5DA05A] placeholder-[#bbb]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#5DA05A] placeholder-[#bbb]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      placeholder="Min 6 characters"
                      className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#5DA05A] placeholder-[#bbb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#5DA05A] placeholder-[#bbb]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Age</label>
                  <select
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#5DA05A]"
                  >
                    <option value="">Select your age range</option>
                    <option value="14-16">14–16</option>
                    <option value="17-19">17–19</option>
                    <option value="20-22">20–22</option>
                    <option value="23-26">23–26</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">
                    What brought you here? <span className="text-[#aaa] font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="why"
                    value={form.why}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Share as much or as little as you'd like..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#5DA05A] placeholder-[#bbb] resize-none"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" required className="mt-1 accent-[#5DA05A]" />
                  <span className="text-xs text-[#555] leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-[#5DA05A] underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-[#5DA05A] underline">Privacy Policy</a>. I confirm I am 14 or older.
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#5DA05A] text-white font-bold text-base hover:bg-[#3D7840] transition-colors shadow-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Join the Club — Free'}
                </button>
              </form>

              <p className="text-center text-xs text-[#aaa] mt-4">
                Already a member?{' '}
                <Link to="/login" className="text-[#5DA05A] underline">Sign in here</Link>
              </p>

              <p className="text-center text-xs text-[#888] mt-3">
                Looking for Premium or Founding Member?{' '}
                <Link to="/membership" className="text-[#5DA05A] underline">View all plans</Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Reassurance */}
      <section className="py-16 bg-[#FAFAF5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {reassurances.map((item, i) => (
              <Animate key={item.title} animation="fade-up" delay={i * 90}>
              <div className="bg-white rounded-2xl p-6 border border-[#f0e9dd] h-full">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-4 ${item.iconColor}`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#2d2d2d] mb-2">{item.title}</h3>
                <p className="text-[#555] text-sm">{item.desc}</p>
              </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
