import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Animate from '../components/Animate'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5] px-6 pt-24 pb-16">
      <Animate animation="fade-up">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#f0e9dd] shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2d2d2d] font-display">Welcome Back</h1>
            <p className="text-[#555] mt-2">Sign in to your Cool Kids Club account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#555] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#5DA05A] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </Animate>
    </div>
  )
}
