import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Membership', to: '/membership' },
  { label: "Founder's Letter", to: '/founders-letter' },
  { label: 'Events', to: '/events' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#87a882] to-[#b8a9c9] flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">CK</span>
          </div>
          <span className="text-[#2d2d2d] font-bold text-lg tracking-tight group-hover:text-[#87a882] transition-colors">
            Cool Kids Club
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-[#87a882] ${
                location.pathname === link.to
                  ? 'text-[#87a882] border-b-2 border-[#87a882] pb-0.5'
                  : 'text-[#555]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/join"
            className="ml-2 px-5 py-2 rounded-full bg-[#87a882] text-white text-sm font-semibold hover:bg-[#5e7d59] transition-colors shadow-sm"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-[#2d2d2d] transition-all ${open ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#2d2d2d] transition-all ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#2d2d2d] transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-[#e8e0d8] px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`py-2 text-sm font-medium border-b border-[#f0e9dd] transition-colors hover:text-[#87a882] ${
                location.pathname === link.to ? 'text-[#87a882]' : 'text-[#555]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/join"
            className="mt-2 py-3 rounded-full bg-[#87a882] text-white text-sm font-semibold text-center hover:bg-[#5e7d59] transition-colors"
          >
            Join Us
          </Link>
        </div>
      )}
    </nav>
  )
}
