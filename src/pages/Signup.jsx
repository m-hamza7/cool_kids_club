import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth as authApi } from '../lib/api'
import Animate from '../components/Animate'

export default function Signup() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { refetchUser } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')

    setLoading(true)
    try {
      await authApi.signup({ email: form.email, password: form.password, full_name: form.full_name })
      await refetchUser()
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Signup failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5] px-6 pt-24 pb-16">
      <Animate animation="fade-up">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#f0e9dd] shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2d2d2d] font-display">Join Cool Kids Club</h1>
            <p className="text-[#555] mt-2">Create your free account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.full_name}
                onChange={update('full_name')}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={update('password')}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={update('confirm')}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#555] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5DA05A] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Animate>
    </div>
  )
}

