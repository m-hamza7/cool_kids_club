import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth as authApi } from '../lib/api'
import Animate from '../components/Animate'

export default function Signup() {
  const [step, setStep] = useState('details') // 'details' | 'otp'
  const [method, setMethod] = useState('email') // 'email' | 'phone'
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', password: '', confirm: '' })
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { refetchUser } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) return setError('Passwords do not match')
    if (form.password.length < 6) return setError('Password must be at least 6 characters')

    const identifier = method === 'email' ? form.email : form.phone
    if (!identifier) return setError(`Please enter your ${method}`)

    setLoading(true)
    try {
      const body = method === 'email' ? { email: form.email } : { phone: form.phone }
      await authApi.sendOtp(body)
      setStep('otp')
    } catch (err) {
      setError(err.message || 'Failed to send verification code')
    }
    setLoading(false)
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) return setError('Please enter the 6-digit code')

    setLoading(true)
    try {
      await authApi.verifyOtp({
        ...(method === 'email' ? { email: form.email } : { phone: form.phone }),
        otp,
        password: form.password,
        full_name: form.full_name,
      })
      await refetchUser()
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Verification failed')
    }
    setLoading(false)
  }

  const resendOtp = async () => {
    setError('')
    setLoading(true)
    try {
      const body = method === 'email' ? { email: form.email } : { phone: form.phone }
      await authApi.sendOtp(body)
      setError('')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5] px-6 pt-24 pb-16">
      <Animate animation="fade-up">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#f0e9dd] shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#2d2d2d] font-display">Join Cool Kids Club</h1>
            <p className="text-[#555] mt-2">
              {step === 'details' ? 'Create your free account' : `Enter the code sent to your ${method}`}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              {/* Method toggle */}
              <div className="flex rounded-xl border border-[#e8e0d8] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    method === 'email' ? 'bg-[#5DA05A] text-white' : 'bg-[#FAFAF5] text-[#555] hover:bg-[#f0e9dd]'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    method === 'phone' ? 'bg-[#5DA05A] text-white' : 'bg-[#FAFAF5] text-[#555] hover:bg-[#f0e9dd]'
                  }`}
                >
                  Phone
                </button>
              </div>

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

              {method === 'email' ? (
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
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                    placeholder="+923245434223"
                  />
                </div>
              )}

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
                {loading ? 'Sending code...' : 'Send Verification Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-[#555] mb-1">Code sent to</p>
                <p className="font-semibold text-[#2d2d2d]">
                  {method === 'email' ? form.email : form.phone}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2d2d2d] mb-1.5 text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-4 rounded-xl border border-[#e8e0d8] bg-[#FAFAF5] text-[#2d2d2d] text-center text-2xl tracking-[0.5em] font-bold focus:outline-none focus:border-[#5DA05A] focus:ring-2 focus:ring-[#5DA05A]/20 transition"
                  placeholder="000000"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 rounded-xl bg-[#5DA05A] text-white font-semibold hover:bg-[#3D7840] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => { setStep('details'); setOtp(''); setError('') }}
                  className="text-[#555] hover:text-[#2d2d2d] transition-colors"
                >
                  ← Go back
                </button>
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={loading}
                  className="text-[#5DA05A] font-semibold hover:underline disabled:opacity-50"
                >
                  Resend code
                </button>
              </div>
            </form>
          )}

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
