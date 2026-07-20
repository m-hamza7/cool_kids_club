import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Leaf, CheckCircle } from '../components/Icons'
import { letters as lettersApi } from '../lib/api'
import Animate from '../components/Animate'

export default function FounderLetter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [featured, setFeatured] = useState(null)
  const [pastLetters, setPastLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [readingLetter, setReadingLetter] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const [featuredRes, allRes] = await Promise.all([
          lettersApi.featured(),
          lettersApi.list(),
        ])
        setFeatured(featuredRes.letter)
        setPastLetters(
          (allRes.letters || []).filter((l) => l.id !== featuredRes.letter?.id)
        )
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  const formatContent = (content) => {
    if (!content) return null
    return content.split('\n').filter(Boolean).map((para, i) => (
      <p key={i}>{para}</p>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-4 border-[#5DA05A] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#FEF3EA]">
        <Animate animation="fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#5DA05A] text-sm font-semibold uppercase tracking-widest">Monthly Column</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
            The Founder's Letter
          </h1>
          <p className="text-[#555] text-lg max-w-xl mx-auto leading-relaxed">
            Every month, Areeba writes an honest, personal letter to the community  about growth, mental health, creativity, and life. Real talk from a real person.
          </p>
          <div className="mt-8 inline-flex items-center gap-4 bg-white/80 backdrop-blur rounded-2xl px-6 py-4 border border-[#f0e9dd] shadow-sm">
            <img
              src="/areeba_rehman.jpg"
              alt="Areeba Rehman"
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
      {featured && (
        <section className="py-20 bg-white">
          <Animate animation="fade-in">
          <div className="max-w-3xl mx-auto px-6">
            <div className="border-l-4 border-[#5DA05A] pl-6 mb-10">
              <div className="text-[#5DA05A] text-xs font-semibold uppercase tracking-widest mb-2">
                Latest Letter  {featured.month}
              </div>
              <h2 className="text-3xl font-bold text-[#2d2d2d] font-display mb-4">
                {featured.title}
              </h2>
            </div>

            <div className="prose prose-sm max-w-none text-[#555] leading-relaxed space-y-5">
              {formatContent(featured.content)}
            </div>

            {featured.tag && (
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-[#EEF7EE] text-[#3D7840] text-xs font-semibold">{featured.tag}</span>
              </div>
            )}
          </div>
          </Animate>
        </section>
      )}

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
            The monthly letter is always free. No spam, no sales  just honest words from Areeba, once a month.
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

      {/* Reading modal */}
      {readingLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={() => setReadingLetter(null)}>
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs text-[#888]">{readingLetter.month}</div>
                <h2 className="text-2xl font-bold text-[#2d2d2d] font-display mt-1">{readingLetter.title}</h2>
              </div>
              <button onClick={() => setReadingLetter(null)} className="text-[#888] hover:text-[#2d2d2d] text-2xl font-light">×</button>
            </div>
            <div className="prose prose-sm max-w-none text-[#555] leading-relaxed space-y-4">
              {formatContent(readingLetter.content)}
            </div>
            {readingLetter.tag && (
              <div className="mt-8">
                <span className="px-3 py-1 rounded-full bg-[#EEF7EE] text-[#3D7840] text-xs font-semibold">{readingLetter.tag}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Past Letters */}
      {pastLetters.length > 0 && (
        <section className="py-20 bg-[#FAFAF5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2d2d2d] font-display">Past Letters</h2>
              <p className="text-[#555] mt-2">Every letter is available to all members  free and premium.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {pastLetters.map((letter, i) => (
                <Animate key={letter.id} animation="fade-up" delay={i * 90}>
                <div className={`${letter.color || 'bg-[#FAFAF5]'} rounded-2xl p-7 border border-[#f0e9dd] hover:shadow-md transition-shadow cursor-pointer h-full`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#888]">{letter.month}</span>
                    {letter.tag && (
                      <span className="px-2 py-0.5 rounded-full bg-white text-[#555] text-xs">{letter.tag}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-[#2d2d2d] text-lg mb-2 font-display">{letter.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{letter.excerpt}</p>
                  <button
                    onClick={() => setReadingLetter(letter)}
                    className="mt-4 text-[#5DA05A] text-sm font-semibold hover:underline"
                  >
                    Read full letter →
                  </button>
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
      )}
    </div>
  )
}
