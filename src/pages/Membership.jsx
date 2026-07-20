import { Link, useNavigate } from 'react-router-dom'
import { Check, Sparkles, Star, Gift } from '../components/Icons'
import { useAuth } from '../context/AuthContext'
import Animate from '../components/Animate'

const community = [
  'Access to the Cool Kids Club public community',
  'Weekly virtual community sessions and discussions',
  'Monthly public meetups and workshops (limited seats)',
  'Access to public blog articles and resources',
  'Mental wellness tips and creative inspiration',
  'Invitations to selected free online events',
  'Community discussion forum access',
  'Monthly community newsletter',
  'Sneak peeks of upcoming events and programs',
]

const premium = [
  'Everything in Community, plus:',
  'Private members-only community spaces',
  'Premium blog articles and exclusive resources',
  'Monthly 1:1 virtual peer-support session with the Founder',
  "Monthly Founder's Letter",
  'Members-only workshops and virtual events',
  'Art Days, Game Nights, Movie Nights, Music & Chill, Book Club, DIY Workshops',
  'Guided wellness and creativity workshops',
  'Monthly themed challenges and creative prompts',
  'Early access to new programs, events, and meetups',
  'Premium resource library',
  'Private Discord/WhatsApp community access',
]

const founding = [
  'Everything in Premium, plus:',
  'Welcome Kit — T-shirt, badge, and stickers',
  'Recognition as a Founding Member across platforms',
  'Name featured on the Founders Wall',
  'Priority access to all future events and programs',
  'Direct line to the founder for feedback and ideas',
  'Exclusive Founding Member badge on your profile',
  'Additional surprise perks and early drops',
]

const faqs = [
  {
    q: 'Who is Cool Kids Club for?',
    a: 'CKC is designed for teenagers and young adults aged 14–26 who are interested in mental wellness, personal growth, creativity, and meaningful connection.',
  },
  {
    q: 'Can I cancel my membership anytime?',
    a: 'Absolutely. Paid memberships are month-to-month and you can cancel at any time with no questions asked.',
  },
  {
    q: 'How do I pay for Premium or Founding Member?',
    a: 'Send the monthly fee to our bank account and share the payment screenshot via our Instagram DM. Our admin will activate your membership within 24 hours.',
  },
  {
    q: "What if I can't afford a paid plan?",
    a: "We believe cost should never be a barrier. We offer financial hardship waivers — reach out to us privately and we'll work something out.",
  },
  {
    q: 'Are the events live or recorded?',
    a: 'All events are held live to preserve the community feel. Premium and Founding members get access to recordings within 24 hours.',
  },
  {
    q: 'Are Founding Member seats really limited?',
    a: 'Yes! We are only opening a small number of Founding Member spots. Once they are filled, this tier will be closed permanently.',
  },
]

export default function Membership() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handlePaidClick = () => {
    if (!user) {
      navigate('/join')
    } else {
      document.getElementById('payment-instructions')?.scrollIntoView({ behavior: 'smooth' })
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
            Start free and upgrade when you're ready. Every plan gives you access to an incredible community.
          </p>
        </Animate>
      </section>

      {/* Plans */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 items-start">

            {/* Community (Free) */}
            <Animate animation="fade-up" delay={0}>
            <div className="bg-white rounded-3xl p-8 border border-[#f0e9dd] shadow-sm h-full">
              <div className="inline-block px-3 py-1 rounded-full bg-[#EEF7EE] text-[#3D7840] text-xs font-semibold mb-5">
                Free Forever
              </div>
              <h2 className="text-2xl font-bold text-[#2d2d2d] mb-1 font-display">Community</h2>
              <p className="text-[#888] text-sm mb-4">A welcoming space for everyone.</p>
              <div className="flex items-end gap-1 mt-2 mb-1">
                <span className="text-4xl font-bold text-[#5DA05A]">Rs. 0</span>
              </div>
              <div className="text-[#888] text-xs mb-6">No credit card required.</div>
              <Link
                to={user ? '/events' : '/join'}
                className="block w-full py-3 rounded-full border-2 border-[#5DA05A] text-[#5DA05A] font-semibold text-center hover:bg-[#5DA05A] hover:text-white transition-all mb-8 text-sm"
              >
                {user ? 'Browse Events' : 'Get Started Free'}
              </Link>
              <ul className="space-y-3">
                {community.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#555]">
                    <Check className="w-4 h-4 text-[#5DA05A] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </Animate>

            {/* Premium */}
            <Animate animation="fade-up" delay={100}>
            <div className="bg-[#2d2d2d] rounded-3xl p-8 shadow-xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#5DA05A]/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#8AAED8]/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5DA05A]/20 text-[#5DA05A] text-xs font-semibold mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
                <h2 className="text-2xl font-bold text-white mb-1 font-display">Premium</h2>
                <p className="text-gray-500 text-sm mb-4">Go deeper with exclusive access.</p>
                <div className="flex items-end gap-1 mt-2 mb-1">
                  <span className="text-4xl font-bold text-[#5DA05A]">Rs. 1,500</span>
                  <span className="text-gray-400 mb-1 text-sm">/month</span>
                </div>
                <div className="text-gray-500 text-xs mb-6">Billed monthly. Cancel anytime.</div>
                <button
                  onClick={handlePaidClick}
                  className="block w-full py-3 rounded-full bg-[#5DA05A] text-white font-semibold text-center hover:bg-[#3D7840] transition-all mb-8 cursor-pointer text-sm"
                >
                  {user ? 'Upgrade to Premium' : 'Get Premium'}
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

            {/* Founding Member */}
            <Animate animation="fade-up" delay={200}>
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 shadow-xl relative overflow-hidden h-full border border-[#D4A830]/30">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#D4A830]/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#D4A830]/5 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A830]/20 text-[#D4A830] text-xs font-semibold mb-5">
                  <Star className="w-3.5 h-3.5" />
                  Limited Seats
                </div>
                <h2 className="text-2xl font-bold text-white mb-1 font-display">Founding Member</h2>
                <p className="text-gray-400 text-sm mb-4">Be part of the origin story.</p>
                <div className="flex items-end gap-1 mt-2 mb-1">
                  <span className="text-4xl font-bold text-[#D4A830]">Rs. 2,000</span>
                  <span className="text-gray-400 mb-1 text-sm">/month</span>
                </div>
                <div className="text-gray-500 text-xs mb-6">Limited availability. Cancel anytime.</div>
                <button
                  onClick={handlePaidClick}
                  className="block w-full py-3 rounded-full bg-[#D4A830] text-[#1a1a2e] font-semibold text-center hover:bg-[#b8922a] transition-all mb-8 cursor-pointer text-sm"
                >
                  {user ? 'Become a Founder' : 'Become a Founder'}
                </button>
                <ul className="space-y-3">
                  {founding.map((item, i) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${i === 0 ? 'text-gray-400 font-semibold' : 'text-gray-300'}`}>
                      {i !== 0 && <Check className="w-4 h-4 text-[#D4A830] mt-0.5 flex-shrink-0" />}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Animate>

          </div>

          <div className="mt-10 text-center text-[#888] text-sm">
            Not sure? <a href="https://ig.me/m/__.coolkidsclub.__" target="_blank" rel="noopener noreferrer" className="text-[#5DA05A] underline hover:no-underline">Chat with us</a> — we'll help you choose.
          </div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section id="payment-instructions" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <Animate animation="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">How to Activate Your Membership</h2>
              <p className="text-[#555] mt-3">Follow these simple steps to unlock Premium or Founding Member.</p>
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
                      Create Account &rarr;
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
                  <div className="bg-white rounded-xl p-4 border border-[#e8e0d8] space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Account Name</span>
                      <span className="font-semibold text-[#2d2d2d]">Areeba Rehman</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">IBAN</span>
                      <span className="font-semibold text-[#2d2d2d]">PK10UNIL0109000336793339</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">Bank</span>
                      <span className="font-semibold text-[#2d2d2d]">UBL</span>
                    </div>
                  </div>
                  <div className="bg-[#FEF9EA] rounded-xl p-3 border border-[#D4A830]/20">
                    <p className="text-xs text-[#888]">
                      <strong className="text-[#2d2d2d]">Premium:</strong> Rs. 1,500/month &nbsp;·&nbsp;
                      <strong className="text-[#2d2d2d]">Founding Member:</strong> Rs. 2,000/month
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 bg-[#FAFAF5] rounded-2xl p-6 border border-[#f0e9dd]">
                <div className="text-3xl font-bold text-[#5DA05A]/30 font-display">03</div>
                <div>
                  <h3 className="font-bold text-[#2d2d2d] mb-1">Send Screenshot via Instagram</h3>
                  <p className="text-[#555] text-sm leading-relaxed mb-3">
                    Take a screenshot of your payment confirmation and send it to us via Instagram DM. Mention which plan you'd like (Premium or Founding Member).
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
                    Our admin team will verify your payment and activate your membership within 24 hours.
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

            {user && user.membership_plan === 'founding' && (
              <div className="mt-10 p-6 rounded-2xl bg-[#FEF9EA] border border-[#D4A830]/30 text-center">
                <div className="flex items-center justify-center gap-2 text-[#D4A830] font-semibold mb-2">
                  <Star className="w-5 h-5" />
                  You're a Founding Member!
                </div>
                <p className="text-[#555] text-sm">Thank you for being part of the origin story.</p>
              </div>
            )}
          </Animate>
        </div>
      </section>

      {/* What Members Experience */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">What Members Experience</h2>
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
                desc: 'Intimate, moderated groups who meet regularly to share and support each other.',
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
