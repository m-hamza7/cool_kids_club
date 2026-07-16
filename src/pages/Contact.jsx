import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Shield, Newspaper, MailCheck, AlertTriangle } from '../components/Icons'

const faqs = [
  { q: 'How do I reset my password?', a: 'Use the "Forgot password" link on the login page and follow the instructions sent to your email.' },
  { q: 'How do I upgrade to Premium?', a: 'Go to the Membership page and click "Start Premium." You can also upgrade from your account settings.' },
  { q: 'I need urgent mental health support.', a: "If you're in crisis, please reach out to a crisis line in your country. In Nigeria: Mentally Aware NG — 08091116264. Global: Crisis Text Line — text HOME to 741741." },
  { q: 'How do I report a community issue?', a: 'Email us at safety@coolkidsclub.com or use the in-app report button. We take all reports seriously.' },
]

const contactCards = [
  {
    icon: <Mail className="w-6 h-6" />,
    iconColor: 'text-[#87a882]',
    bg: 'bg-[#e8f0e7]',
    title: 'General Enquiries',
    detail: 'hello@coolkidsclub.com',
    desc: 'For questions about membership, events, or the community.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    iconColor: 'text-[#b8a9c9]',
    bg: 'bg-[#ede8f5]',
    title: 'Safety & Support',
    detail: 'safety@coolkidsclub.com',
    desc: 'For urgent matters, reporting, or sensitive situations.',
  },
  {
    icon: <Newspaper className="w-6 h-6" />,
    iconColor: 'text-[#c47b70]',
    bg: 'bg-[#fdf0ee]',
    title: 'Press & Partnerships',
    detail: 'press@coolkidsclub.com',
    desc: 'Media inquiries, collaboration requests, and partnerships.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #e8f0e7 0%, #faf6ef 60%, #ede8f5 100%)' }}
      >
        <span className="text-[#87a882] text-sm font-semibold uppercase tracking-widest">We're Here</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2d2d2d] mt-3 mb-4 font-display">
          Get in Touch
        </h1>
        <p className="text-[#555] max-w-xl mx-auto text-lg leading-relaxed">
          We read every message. Whether you have a question, need support, or just want to say hi — our team is here.
        </p>
      </section>

      {/* Contact cards */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((c) => (
            <div key={c.title} className="text-center bg-[#faf6ef] rounded-2xl p-7 border border-[#f0e9dd]">
              <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4 ${c.iconColor}`}>
                {c.icon}
              </div>
              <h3 className="font-bold text-[#2d2d2d] mb-1">{c.title}</h3>
              <a href={`mailto:${c.detail}`} className="text-[#87a882] text-sm font-medium hover:underline block mb-2">
                {c.detail}
              </a>
              <p className="text-[#555] text-xs">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact form + FAQs */}
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#2d2d2d] mb-6 font-display">Send Us a Message</h2>
            {sent ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#e8f0e7] flex items-center justify-center">
                    <MailCheck className="w-8 h-8 text-[#87a882]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2d2d2d] mb-2 font-display">Message Received!</h3>
                <p className="text-[#555] text-sm">
                  Thank you, {form.name}! We'll get back to you at {form.email} within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#faf6ef] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#87a882] placeholder-[#bbb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#faf6ef] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#87a882] placeholder-[#bbb]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#faf6ef] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#87a882]"
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Question</option>
                    <option value="events">Events & Workshops</option>
                    <option value="safety">Safety / Reporting</option>
                    <option value="press">Press & Partnerships</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#faf6ef] text-[#2d2d2d] text-sm focus:outline-none focus:border-[#87a882] placeholder-[#bbb] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#87a882] text-white font-bold hover:bg-[#5e7d59] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-[#2d2d2d] mb-6 font-display">Quick Answers</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-[#faf6ef] rounded-2xl p-5 border border-[#f0e9dd]">
                  <h3 className="font-semibold text-[#2d2d2d] text-sm mb-2">{faq.q}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Crisis box */}
            <div className="mt-6 bg-[#fdf0ee] border border-[#e8c5c1] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-[#c47b70] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-[#2d2d2d] text-sm mb-1">In Crisis Right Now?</h3>
                  <p className="text-[#555] text-xs leading-relaxed mb-2">
                    If you're in immediate danger or experiencing a mental health crisis, please contact emergency services or a crisis helpline in your country.
                  </p>
                  <a
                    href="https://www.findahelpline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c47b70] text-xs font-semibold hover:underline"
                  >
                    Find a helpline near you →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social + community */}
      <section className="py-16 bg-[#2d2d2d] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-3 font-display">Connect With Us Online</h2>
          <p className="text-gray-400 text-sm mb-8">Follow along, share your journey, and tag us in your growth.</p>
          <div className="flex justify-center gap-4">
            {[
              { name: 'Instagram', handle: '@coolkidsclub' },
              { name: 'TikTok', handle: '@coolkidsclub' },
              { name: 'Pinterest', handle: 'coolkidsclub' },
            ].map((s) => (
              <a
                key={s.name}
                href="#"
                className="bg-[#3d3d3d] hover:bg-[#87a882] rounded-2xl px-5 py-4 transition-colors group"
              >
                <div className="text-white font-semibold text-sm group-hover:text-white">{s.name}</div>
                <div className="text-gray-500 text-xs group-hover:text-white/80">{s.handle}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
