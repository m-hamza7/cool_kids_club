import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#2d2d2d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#5DA05A] flex items-center justify-center">
                <span className="text-white text-sm font-bold">CK</span>
              </div>
              <span className="font-bold text-lg">Cool Kids Club</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A safe, inspiring space for young people to grow, connect, and thrive together.
            </p>
            <div className="flex gap-4 mt-5">
              {['Instagram', 'TikTok', 'Pinterest'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-gray-400 hover:text-[#5DA05A] transition-colors border border-gray-600 rounded-full px-3 py-1"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Membership', to: '/membership' },
                { label: 'Events', to: '/events' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 text-sm hover:text-[#5DA05A] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "Founder's Letter", to: '/founders-letter' },
                { label: 'Blog & Resources', to: '/blog' },
                { label: 'Join Us', to: '/join' },
                { label: 'Contact', to: '/contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 text-sm hover:text-[#5DA05A] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-300 mb-4">Stay Connected</h4>
            <p className="text-gray-400 text-sm mb-4">Get the monthly founder's letter delivered to your inbox.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-2.5 rounded-xl bg-[#3d3d3d] text-white text-sm placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-[#5DA05A]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#5DA05A] text-white text-sm font-semibold hover:bg-[#3D7840] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Cool Kids Club. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Mental Health Resources'].map((l) => (
              <a key={l} href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
