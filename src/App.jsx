import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Membership from './pages/Membership'
import FounderLetter from './pages/FounderLetter'
import Events from './pages/Events'
import Blog from './pages/Blog'
import JoinUs from './pages/JoinUs'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AdminDashboard from './pages/admin/Dashboard'
import ManageEvents from './pages/admin/ManageEvents'
import ManageLetters from './pages/admin/ManageLetters'
import ManageUsers from './pages/admin/ManageUsers'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/founders-letter" element={<FounderLetter />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Navigate to="/join" replace />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute adminOnly><ManageEvents /></ProtectedRoute>} />
          <Route path="/admin/letters" element={<ProtectedRoute adminOnly><ManageLetters /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><ManageUsers /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
