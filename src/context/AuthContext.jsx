import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { auth as authApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const { user } = await authApi.me()
      setUser(user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchUser() }, [fetchUser])

  const login = async (email, password) => {
    const { user } = await authApi.login({ email, password })
    setUser(user)
    return user
  }

  const signup = async (email, password, full_name) => {
    const { user } = await authApi.signup({ email, password, full_name })
    setUser(user)
    return user
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
