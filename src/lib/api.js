const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new ApiError(data?.error || `Request failed (${res.status})`, res.status)
  }

  return data
}

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

// ── Auth ─────────────────────────────────────────────────────
export const auth = {
  sendOtp: (body) => request('/auth/send-otp', { method: 'POST', body: JSON.stringify(body) }),
  verifyOtp: (body) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
}

// ── Events ───────────────────────────────────────────────────
export const events = {
  list: (category) => request(`/events${category ? `?category=${category}` : ''}`),
  get: (id) => request(`/events/${id}`),
  create: (body) => request('/events', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/events/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/events/${id}`, { method: 'DELETE' }),
  getAttendance: (id) => request(`/events/${id}/attendance`),
  attend: (id, status) => request(`/events/${id}/attend`, { method: 'POST', body: JSON.stringify({ status }) }),
  removeAttendance: (id) => request(`/events/${id}/attend`, { method: 'DELETE' }),
  getAttendees: (id) => request(`/events/${id}/attendees`),
}

// ── Letters ──────────────────────────────────────────────────
export const letters = {
  list: () => request('/letters'),
  featured: () => request('/letters/featured'),
  get: (id) => request(`/letters/${id}`),
  create: (body) => request('/letters', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/letters/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/letters/${id}`, { method: 'DELETE' }),
}

// ── Users (admin) ────────────────────────────────────────────
export const users = {
  list: (params) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/users${qs ? `?${qs}` : ''}`)
  },
  get: (id) => request(`/users/${id}`),
  update: (id, body) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
  stats: () => request('/users/stats/overview'),
}
