import { Link, useNavigate } from 'react-router-dom'
import { Check, Sparkles } from '../components/Icons'
import { useAuth } from '../context/AuthContext'
import Animate from '../components/Animate'

const free = [
  'Access to the public community feed',
  "Monthly Founder's Letter (email)",
  'Access to free blog resources',
  'Invitations to select free events',
  'Welcome wellness kit (digital)',
  'Community forum access',
]

const premium = [
  'Everything in Free, plus:',
  'Private members-only community spaces',
  'All live workshops & events (unlimited)',
  'Monthly 1:1 peer support sessions',
  'Exclusive creativity challenges & prompts',
  'Early access to new programs',
  'Premium resource library (100+ guides)',
  'Monthly accountability partner matching',
  'Discord server with curated channels',
  'Quarterly virtual retreats',
]

const faqs = [
  {
    q: 'Who is Cool Kids Club for?',
    a: 'CKC is designed for teenagers and young adults aged 14–26 who are interested in mental wellness, personal growth, creativity, and meaningful connection.',
  },
  {
    q: 'Can I cancel my premium membership anytime?',
    a: 'Absolutely. Premium membership is month-to-month and you can cancel at any time with no questions asked.',
  },
  {
    q: 'Is there a student discount?',
    a: 'Yes! Students get 30% off Premium membership. Just sign up and reach out to our team with your student ID.',
  },
  {
    q: "What if I can't afford Premium?",
    a: "We believe cost should never be a barrier. We offer financial hardship waivers — reach out to us privately and we'll work something out.",
  },
  {
    q: 'Are the events live or recorded?',
    a: 'All events are held live to preserve the community feel. Premium members also get access to all recordings within 24 hours.',
  },
]

export default function Membership() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handlePremiumClick = () => {
    if (!user) {
      navigate('/join')
    } else {
      document.getElementById('premium-instructions')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-[#EEF3FD]">
        <Animate animation="fade-up">
          <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">Membership</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
            Choose Your Path
          </h1>
          <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
            Start free and upgrade when you're ready. Both plans give you access to an incredible community — Premium just goes deeper.
          </p>
        </Animate>
      </section>

      {/* Plans */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Free */}
            <Animate animation="slide-left">
            <div className="bg-white rounded-3xl p-8 border border-[#f0e9dd] shadow-sm">
              <div className="inline-block px-3 py-1 rounded-full bg-[#EEF7EE] text-[#3D7840] text-xs font-semibold mb-5">
                Free Forever
              </div>
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-1 font-display">Community</h2>
              <div className="text-5xl font-bold text-[#5DA05A] mt-4 mb-2">$0</div>
              <div className="text-[#888] text-sm mb-6">Always free. No credit card needed.</div>
              <Link
                to={user ? '/events' : '/join'}
                className="block w-full py-3 rounded-full border-2 border-[#5DA05A] text-[#5DA05A] font-semibold text-center hover:bg-[#5DA05A] hover:text-white transition-all mb-8"
              >
                {user ? 'Browse Events' : 'Get Started Free'}
              </Link>
              <ul className="space-y-3">
                {free.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#555]">
                    <Check className="w-4 h-4 text-[#5DA05A] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </Animate>

            {/* Premium */}
            <Animate animation="slide-right">
            <div className="bg-[#2d2d2d] rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#5DA05A]/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#8AAED8]/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DA05A]/20 text-[#5DA05A] text-xs font-semibold mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
                <h2 className="text-3xl font-bold text-white mb-1 font-display">Premium</h2>
                <div className="flex items-end gap-2 mt-4 mb-1">
                  <span className="text-5xl font-bold text-[#5DA05A]">$9</span>
                  <span className="text-gray-400 mb-2">/month</span>
                </div>
                <div className="text-gray-500 text-sm mb-1">or $79/year — save 27%</div>
                <div className="text-gray-500 text-xs mb-6">Billed monthly. Cancel anytime.</div>
                <button
                  onClick={handlePremiumClick}
                  className="block w-full py-3 rounded-full bg-[#5DA05A] text-white font-semibold text-center hover:bg-[#3D7840] transition-all mb-8 cursor-pointer"
                >
                  {user ? 'Upgrade to Premium' : 'Start Premium'}
                </button>
                <ul className="space-y-3">
                  {premium.map((item, i) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${i === 0 ? 'text-gray-400 font-semibold' : 'text-gray-300'}`}>
                      {i !== 0 && <Check className="w-4 h-4 text-[#5DA05A] mt-0.5 flex-shrink-0" />}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Animate>
          </div>

          <div className="mt-8 text-center text-[#888] text-sm">
            Not sure? <Link to="/contact" className="text-[#5DA05A] underline hover:no-underline">Chat with us</Link> — we'll help you choose.
          </div>
        </div>
      </section>

      {/* Premium Payment Instructions */}
      <section id="premium-instructions" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <Animate animation="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">How to Activate Premium</h2>
              <p className="text-[#555] mt-3">Follow these simple steps to unlock your premium membership.</p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-5 bg-[#FAFAF5] rounded-2xl p-6 border border-[#f0e9dd]">
                <div className="text-3xl font-bold text-[#5DA05A]/30 font-display">01</div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] mb-1">
                    {user ? "You're already a member!" : 'Create Your Account'}
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    {user
                      ? `You're signed in as ${user.full_name || user.email}. You're all set for this step.`
                      : 'First, create a free account on our Join page. It takes under 2 minutes.'}
                  </p>
                  {!user && (
                    <Link to="/join" className="inline-block mt-3 text-[#5DA05A] text-sm font-semibold underline">
                      Create Account →
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex gap-5 bg-[#FAFAF5] rounded-2xl p-6 border border-[#f0e9dd]">
                <div className="text-3xl font-bold text-[#5DA05A]/30 font-display">02</div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] mb-1">Send Payment</h3>
                  <p className="text-[#555] text-sm leading-relaxed mb-3">
                    Transfer the membership fee to the following account:
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-[#e8e0d8] space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Account Title</span>
                      <span className="font-semibold text-[#2d2d2d]">Cool Kids Club</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Account Number</span>
                      <span className="font-semibold text-[#2d2d2d]">1234-5678-9012</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 bg-[#FAFAF5] rounded-2xl p-6 border border-[#f0e9dd]">
                <div className="text-3xl font-bold text-[#5DA05A]/30 font-display">03</div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] mb-1">Send Screenshot via Instagram</h3>
                  <p className="text-[#555] text-sm leading-relaxed mb-3">
                    Take a screenshot of your payment confirmation and send it to us via Instagram DM.
                  </p>
                  <a
                    href="https://ig.me/m/__.coolkidsclub.__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Message @__.coolkidsclub.__
                  </a>
                </div>
              </div>

              <div className="flex gap-5 bg-[#FAFAF5] rounded-2xl p-6 border border-[#f0e9dd]">
                <div className="text-3xl font-bold text-[#5DA05A]/30 font-display">04</div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] mb-1">Wait for Confirmation</h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Our admin team will verify your payment and activate your premium membership within 24 hours.
                    You'll receive a confirmation when your account has been upgraded.
                  </p>
                </div>
              </div>
            </div>

            {user && user.membership_plan === 'premium' && (
              <div className="mt-10 p-6 rounded-2xl bg-[#EEF7EE] border border-[#5DA05A]/30 text-center">
                <div className="flex items-center justify-center gap-2 text-[#3D7840] font-semibold mb-2">
                  <Sparkles className="w-5 h-5" />
                  You're a Premium Member!
                </div>
                <p className="text-[#555] text-sm">You already have full access to all premium features.</p>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* What Premium Members Experience */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">What Premium Members Experience</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=280&fit=crop',
                title: 'Live Workshops',
                desc: 'Expert-led sessions on anxiety, relationships, creativity, goal-setting, and more.',
              },
              {
                img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=280&fit=crop',
                title: 'Peer Circles',
                desc: 'Intimate, moderated groups of 6-10 people who meet weekly to share and support.',
              },
              {
                img: 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400&h=280&fit=crop',
                title: 'Creative Challenges',
                desc: 'Monthly prompts and challenges to spark your creativity and self-expression.',
              },
            ].map((card, i) => (
              <Animate key={card.title} animation="fade-up" delay={i * 90}>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-[#f0e9dd] hover:shadow-md transition-shadow h-full">
                <img src={card.img} alt={card.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-2">{card.title}</h3>
                  <p className="text-[#555] text-sm">{card.desc}</p>
                </div>
              </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[#FAFAF5] rounded-2xl p-6 border border-[#f0e9dd]">
                <h3 className="font-semibold text-[#2d2d2d] mb-2">{faq.q}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
