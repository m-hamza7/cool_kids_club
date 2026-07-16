import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Music, Notebook, Meditation, ExternalLink, Palette, Star } from '../components/Icons'

const categories = ['All', 'Mental Health', 'Self-Care', 'Relationships', 'Creativity', 'Growth']

const posts = [
  {
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&h=300&fit=crop',
    category: 'Mental Health',
    title: '7 Signs You Need to Slow Down (And How to Actually Do It)',
    excerpt: 'We often wait until we burn out to rest. Here are the signs your nervous system is asking for a break — and practical ways to respond.',
    author: 'Priya Nair',
    date: 'Jul 10, 2025',
    readTime: '5 min read',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=500&h=300&fit=crop',
    category: 'Creativity',
    title: 'Journaling for Anxiety: Prompts That Actually Work',
    excerpt: 'Journaling changed my relationship with my mind. These 10 prompts are specifically designed for anxious, overthinking brains.',
    author: 'Zara Okonkwo',
    date: 'Jul 3, 2025',
    readTime: '7 min read',
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=300&fit=crop',
    category: 'Relationships',
    title: 'How to Set Boundaries Without Feeling Guilty',
    excerpt: "Boundaries aren't walls — they're the clearest act of love you can give yourself and others. Here's how to set them with grace.",
    author: 'Marcus Reid',
    date: 'Jun 25, 2025',
    readTime: '6 min read',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=300&fit=crop',
    category: 'Growth',
    title: 'The 5-Minute Morning Practice That Changed Everything',
    excerpt: "You don't need a 2-hour routine. This tiny morning practice takes 5 minutes and sets the tone for your entire day.",
    author: 'Leo Santos',
    date: 'Jun 18, 2025',
    readTime: '4 min read',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=300&fit=crop',
    category: 'Self-Care',
    title: 'Rest Is Productive: Reframing How We Think About Doing Nothing',
    excerpt: "Rest is not laziness. Rest is the foundation on which everything else stands. Let's dismantle the lie that you have to earn your rest.",
    author: 'Priya Nair',
    date: 'Jun 10, 2025',
    readTime: '5 min read',
    featured: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=300&fit=crop',
    category: 'Mental Health',
    title: 'Understanding Your Inner Critic — And Quieting It',
    excerpt: "That voice in your head that says you're not enough? It has a name and a purpose. Here's how to work with it instead of against it.",
    author: 'Zara Okonkwo',
    date: 'Jun 1, 2025',
    readTime: '8 min read',
    featured: false,
  },
]

const resources = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    iconColor: 'text-[#87a882]',
    bg: 'bg-[#e8f0e7]',
    title: 'Book Club List',
    desc: '12 books CKC recommends for mental wellness & growth',
    tag: 'Reading',
  },
  {
    icon: <Music className="w-6 h-6" />,
    iconColor: 'text-[#b8a9c9]',
    bg: 'bg-[#ede8f5]',
    title: 'Mood Playlists',
    desc: 'Curated Spotify playlists for every emotional state',
    tag: 'Music',
  },
  {
    icon: <Notebook className="w-6 h-6" />,
    iconColor: 'text-[#c47b70]',
    bg: 'bg-[#fdf0ee]',
    title: 'Journal Templates',
    desc: 'Free printable and digital journaling worksheets',
    tag: 'Writing',
  },
  {
    icon: <Meditation className="w-6 h-6" />,
    iconColor: 'text-[#87a882]',
    bg: 'bg-[#e8f0e7]',
    title: 'Guided Meditations',
    desc: '5-15 minute audio meditations for anxious minds',
    tag: 'Wellness',
  },
  {
    icon: <ExternalLink className="w-6 h-6" />,
    iconColor: 'text-[#d4a853]',
    bg: 'bg-[#faf6ef]',
    title: 'Crisis Resources',
    desc: 'Global helplines and mental health crisis contacts',
    tag: 'Support',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    iconColor: 'text-[#b8a9c9]',
    bg: 'bg-[#ede8f5]',
    title: 'Creative Prompts',
    desc: '30-day creative challenge prompts to spark expression',
    tag: 'Creativity',
  },
]

export default function Blog() {
  const [active, setActive] = useState('All')

  const featured = posts.filter((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)
  const filtered =
    active === 'All'
      ? rest
      : posts.filter((p) => p.category === active && !p.featured)

  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #fdf0ee 0%, #faf6ef 60%, #e8f0e7 100%)' }}
      >
        <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">Knowledge</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
          Blog &amp; Resources
        </h1>
        <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
          Honest, evidence-informed articles on mental wellness, creativity, and growth — written by and for young people.
        </p>
      </section>

      {/* Featured posts */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Star className="w-5 h-5 text-[#b8a9c9]" />
            <h2 className="text-xl font-bold text-[#2d2d2d]">Featured This Month</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <div key={post.title} className="rounded-2xl overflow-hidden border border-[#f0e9dd] hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="px-2 py-1 rounded-full bg-[#e8f0e7] text-[#5e7d59] text-xs font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-[#2d2d2d] text-xl mt-3 mb-2 leading-snug font-display">
                    {post.title}
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#888]">
                    <span>By {post.author} · {post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="bg-[#faf6ef] border-y border-[#f0e9dd] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                active === cat
                  ? 'bg-[#87a882] text-white'
                  : 'bg-white text-[#555] hover:bg-[#e8f0e7] border border-[#f0e9dd]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* More posts */}
      <section className="py-16 bg-[#faf6ef]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <div key={post.title} className="bg-white rounded-2xl overflow-hidden border border-[#f0e9dd] hover:shadow-md transition-shadow cursor-pointer group">
                <div className="overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="px-2 py-0.5 rounded-full bg-[#ede8f5] text-[#8e7aab] text-xs font-semibold">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-[#2d2d2d] text-base mt-3 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-[#555] text-xs leading-relaxed mb-3">{post.excerpt}</p>
                  <div className="text-xs text-[#888]">{post.author} · {post.readTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#b8a9c9] text-sm font-semibold uppercase tracking-widest">Free Downloads</span>
            <h2 className="text-3xl font-bold text-[#2d2d2d] mt-2 font-display">Resource Library</h2>
            <p className="text-[#555] mt-2 max-w-xl mx-auto">
              Free tools, guides, and resources to support your mental wellness journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r) => (
              <div
                key={r.title}
                className="flex items-start gap-4 bg-[#faf6ef] rounded-2xl p-5 border border-[#f0e9dd] hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl ${r.bg} flex items-center justify-center flex-shrink-0 ${r.iconColor}`}>
                  {r.icon}
                </div>
                <div>
                  <div className="text-xs text-[#87a882] font-semibold uppercase tracking-wide mb-1">{r.tag}</div>
                  <h3 className="font-bold text-[#2d2d2d] text-sm mb-1">{r.title}</h3>
                  <p className="text-[#555] text-xs">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/join"
              className="inline-block px-6 py-3 rounded-full bg-[#87a882] text-white font-semibold hover:bg-[#5e7d59] transition-colors"
            >
              Access All Resources Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
