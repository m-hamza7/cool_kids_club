import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Leaf, CheckCircle } from '../components/Icons'
import Animate from '../components/Animate'

const pastLetters = [
  {
    month: 'June 2025',
    title: "On Feeling Behind   And Why You're Not",
    excerpt: "This month I want to talk about comparison. About that gnawing feeling that everyone else has figured it out while you're still...",
    tag: 'Self-Compassion',
    color: 'bg-[#EEF3FD]',
  },
  {
    month: 'May 2025',
    title: 'The Art of Doing Nothing',
    excerpt: 'We live in a world that glorifies busyness. But what if the most radical thing you could do this month was rest without guilt...',
    tag: 'Rest & Recovery',
    color: 'bg-[#EEF7EE]',
  },
  {
    month: 'April 2025',
    title: 'Friendships That Fill You Up',
    excerpt: "I've been thinking about what makes a friendship truly nourishing. Not just fun   but the kind that makes you feel more like yourself...",
    tag: 'Relationships',
    color: 'bg-[#FEF3EA]',
  },
  {
    month: 'March 2025',
    title: 'Your Grief Is Valid, No Matter the Loss',
    excerpt: "Grief isn't just for death. We grieve versions of ourselves, relationships that ended, dreams that shifted. This month, I wanted to...",
    tag: 'Healing',
    color: 'bg-[#FAFAF5]',
  },
]

export default function FounderLetter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <div>
      {/* Hero — soft blush, no gradient */}
      <section className="pt-32 pb-16 px-6 bg-[#FEF3EA]">
        <Animate animation="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">Monthly Column</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
            The Founder's Letter
          </h1>
          <p className="text-[#555] text-lg max-w-xl mx-auto leading-relaxed">
            Every month, Areeba writes an honest, personal letter to the community   about growth, mental health, creativity, and life. Real talk from a real person.
          </p>
          {/* Author card */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white/80 backdrop-blur rounded-2xl px-6 py-4 border border-[#f0e9dd] shadow-sm">
            <img
              /*src="https://imagesunsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face"*/
              alt="Areeba Khan"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#5DA05A]"
            />
            <div className="text-left">
              <div className="font-semibold text-[#2d2d2d]">Areeba Rehman</div>
              <div className="text-sm text-[#555]">Founder, Cool Kids Club</div>
            </div>
          </div>
        </div>
        </Animate>
      </section>

      {/* Featured / Latest Letter */}
      <section className="py-20 bg-white">
        <Animate animation="fade-in">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border-l-4 border-[#5DA05A] pl-6 mb-10">
            <div className="text-[#5DA05A] text-xs font-semibold uppercase tracking-widest mb-2">Latest Letter   July 2025</div>
            <h2 className="text-3xl font-bold text-[#2d2d2d] font-display mb-4">
              You Don't Have to Be "Okay" to Show Up
            </h2>
          </div>

          <div className="prose prose-sm max-w-none text-[#555] leading-relaxed space-y-5">
            <p className="text-lg text-[#444] italic font-display">
              "Dear Cool Kid, I want to tell you something I wish someone had told me at 17..."
            </p>
            <p>
              This month, I've been sitting with something heavy and I decided not to dress it up or make it neat for you. Because you deserve honesty more than you deserve a perfectly packaged message.
            </p>
            <p>
              I've been exhausted. The kind of tired that sleep doesn't fix. I've been questioning decisions I made, missing people who've moved on, and feeling that hollow ache that comes when you're trying to hold everything together.
            </p>
            <p>
              And here's what I'm learning: <strong>you don't have to be okay to show up.</strong>
            </p>
            <p>
              We live in a world that constantly asks us to perform wellness. To post the aesthetic morning routine. To say "I'm good!" with a smile. And there's nothing wrong with aspiring to those things   but there's something deeply harmful about the pressure to arrive there before we're actually ready.
            </p>
            <p>
              This month, I'm inviting all of us   myself included   to practice showing up as we actually are. Not the curated version. Not the brave face. Just... you. Messy, trying, real.
            </p>
            <p>
              The Cool Kids Club was built on this radical idea: that belonging doesn't require being better first. That community is a place where you can fall apart and be caught.
            </p>
            <p>
              I love you. Keep going.
            </p>
            <p className="font-semibold text-[#2d2d2d]">  Areeba</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-[#EEF7EE] text-[#3D7840] text-xs font-semibold">Mental Wellness</span>
            <span className="px-3 py-1 rounded-full bg-[#EEF3FD] text-[#3A6FB8] text-xs font-semibold">Authenticity</span>
            <span className="px-3 py-1 rounded-full bg-[#FEF3EA] text-[#D45858] text-xs font-semibold">Community</span>
          </div>
        </div>
        </Animate>
      </section>

      {/* Subscribe */}
      <section className="py-20 bg-[#2d2d2d]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#5DA05A]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 font-display">Get Each Letter in Your Inbox</h2>
          <p className="text-gray-400 mb-8">
            The monthly letter is always free. No spam, no sales   just honest words from Areeba, once a month.
          </p>
          {subscribed ? (
            <div className="bg-[#5DA05A]/20 border border-[#5DA05A]/40 rounded-2xl p-6">
              <div className="flex justify-center mb-3">
                <CheckCircle className="w-10 h-10 text-[#5DA05A]" />
              </div>
              <div className="font-semibold text-[#5DA05A]">You're subscribed!</div>
              <div className="text-sm mt-1 text-gray-400">Areeba's next letter will land in your inbox soon.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 rounded-full bg-[#3d3d3d] text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-[#5DA05A] text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Past Letters */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">Past Letters</h2>
            <p className="text-[#555] mt-2">Every letter is available to all members   free and premium.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pastLetters.map((letter, i) => (
              <Animate key={letter.month} animation="fade-up" delay={i * 90}>
              <div className={`${letter.color} rounded-2xl p-7 border border-[#f0e9dd] hover:shadow-md transition-shadow cursor-pointer h-full`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#888]">{letter.month}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#555] text-xs">{letter.tag}</span>
                </div>
                <h3 className="font-bold text-[#2d2d2d] text-lg mb-2 font-display">{letter.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{letter.excerpt}</p>
                <button className="mt-4 text-[#5DA05A] text-sm font-semibold hover:underline">Read full letter →</button>
              </div>
              </Animate>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/join"
              className="inline-block px-6 py-3 rounded-full bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors"
            >
              Join to Access All Letters
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
