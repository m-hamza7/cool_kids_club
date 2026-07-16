import { Link } from 'react-router-dom'
import { Check, Sparkles } from '../components/Icons'

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
  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #ede8f5 0%, #faf6ef 60%, #e8f0e7 100%)' }}
      >
        <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">Membership</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
          Choose Your Path
        </h1>
        <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
          Start free and upgrade when you're ready. Both plans give you access to an incredible community — Premium just goes deeper.
        </p>
      </section>

      {/* Plans */}
      <section className="py-20 bg-[#faf6ef]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Free */}
            <div className="bg-white rounded-3xl p-8 border border-[#f0e9dd] shadow-sm">
              <div className="inline-block px-3 py-1 rounded-full bg-[#e8f0e7] text-[#5e7d59] text-xs font-semibold mb-5">
                Free Forever
              </div>
              <h2 className="text-3xl font-bold text-[#2d2d2d] mb-1 font-display">Community</h2>
              <div className="text-5xl font-bold text-[#87a882] mt-4 mb-2">$0</div>
              <div className="text-[#888] text-sm mb-6">Always free. No credit card needed.</div>
              <Link
                to="/join"
                className="block w-full py-3 rounded-full border-2 border-[#87a882] text-[#87a882] font-semibold text-center hover:bg-[#87a882] hover:text-white transition-all mb-8"
              >
                Get Started Free
              </Link>
              <ul className="space-y-3">
                {free.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#555]">
                    <Check className="w-4 h-4 text-[#87a882] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="bg-[#2d2d2d] rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#87a882]/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#b8a9c9]/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#87a882]/20 text-[#87a882] text-xs font-semibold mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Most Popular
                </div>
                <h2 className="text-3xl font-bold text-white mb-1 font-display">Premium</h2>
                <div className="flex items-end gap-2 mt-4 mb-1">
                  <span className="text-5xl font-bold text-[#87a882]">$9</span>
                  <span className="text-gray-400 mb-2">/month</span>
                </div>
                <div className="text-gray-500 text-sm mb-1">or $79/year — save 27%</div>
                <div className="text-gray-500 text-xs mb-6">Billed monthly. Cancel anytime.</div>
                <Link
                  to="/join?plan=premium"
                  className="block w-full py-3 rounded-full bg-[#87a882] text-white font-semibold text-center hover:bg-[#5e7d59] transition-all mb-8"
                >
                  Start Premium — 7 Days Free
                </Link>
                <ul className="space-y-3">
                  {premium.map((item, i) => (
                    <li key={item} className={`flex items-start gap-3 text-sm ${i === 0 ? 'text-gray-400 font-semibold' : 'text-gray-300'}`}>
                      {i !== 0 && <Check className="w-4 h-4 text-[#87a882] mt-0.5 flex-shrink-0" />}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison note */}
          <div className="mt-8 text-center text-[#888] text-sm">
            Not sure? <Link to="/contact" className="text-[#87a882] underline hover:no-underline">Chat with us</Link> — we'll help you choose.
          </div>
        </div>
      </section>

      {/* What you get visual */}
      <section className="py-20 bg-white">
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
            ].map((card) => (
              <div key={card.title} className="rounded-2xl overflow-hidden shadow-sm border border-[#f0e9dd] hover:shadow-md transition-shadow">
                <img src={card.img} alt={card.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-2">{card.title}</h3>
                  <p className="text-[#555] text-sm">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#faf6ef]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-[#f0e9dd]">
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
