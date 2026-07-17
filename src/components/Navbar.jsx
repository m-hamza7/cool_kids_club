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
  { label: 'Donate', to: '/donate', highlight: true },
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
          <div className="w-20 h-20 rounded-full from-[#5DA05A] to-[#8AAED8] flex items-center justify-center shadow-sm">
            <img src="/logo.png" alt="CKC"/>
          </div>
          <span className="text-[#2d2d2d] font-bold text-lg group-hover:text-[#5DA05A] transition-colors">
            Cool Kids Club
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.highlight ? (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold transition-colors px-4 py-1.5 rounded-full border-2 ${
                  location.pathname === link.to
                    ? 'bg-[#D45858] border-[#D45858] text-white'
                    : 'border-[#D45858] text-[#D45858] hover:bg-[#FDEAEA]'
                }`}
              >
                ♥ {link.label}
              </Link>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-[#5DA05A] ${
                  location.pathname === link.to
                    ? 'text-[#5DA05A] border-b-2 border-[#5DA05A] pb-0.5'
                    : 'text-[#555]'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/join"
            className="ml-2 px-5 py-2 rounded-full bg-[#5DA05A] text-white text-sm font-semibold hover:bg-[#3D7840] transition-colors shadow-sm"
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
          {navLinks.map((link) =>
            link.highlight ? (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 text-sm font-semibold border-b border-[#f0e9dd] transition-colors ${
                  location.pathname === link.to ? 'text-[#D45858]' : 'text-[#D45858] hover:text-[#A83838]'
                }`}
              >
                ♥ {link.label}
              </Link>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 text-sm font-medium border-b border-[#f0e9dd] transition-colors hover:text-[#5DA05A] ${
                  location.pathname === link.to ? 'text-[#5DA05A]' : 'text-[#555]'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/join"
            className="mt-2 py-3 rounded-full bg-[#5DA05A] text-white text-sm font-semibold text-center hover:bg-[#3D7840] transition-colors"
          >
            Join Us
          </Link>
        </div>
      )}
    </nav>
  )
}
