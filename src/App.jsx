import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Passenger
import Home from './pages/passenger/Home'
import SearchResults from './pages/passenger/SearchResults'
import SeatSelection from './pages/passenger/SeatSelection'
import MyBookings from './pages/passenger/MyBookings'
import LiveTracking from './pages/passenger/LiveTracking'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminBuses from './pages/admin/AdminBuses'

// Partner
import PartnerLayout from './components/layout/PartnerLayout'
import PartnerDashboard from './pages/partner/PartnerDashboard'
import PartnerBuses from './pages/partner/PartnerBuses'
import PartnerRoutes from './pages/partner/PartnerRoutes'
import PartnerTrips from './pages/partner/PartnerTrips'
import PartnerDrivers from './pages/partner/PartnerDrivers'

/* ---------------- AUTH ---------------- */

const getAuth = () => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role')
})

const ProtectedRoute = ({ children, role }) => {
  const auth = getAuth()
  if (!auth.token) return <Navigate to="/login" />
  if (role && auth.role !== role) return <Navigate to="/login" />
  return children
}

/* ---------------- APP ---------------- */

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => setLoading(false), [])

  if (loading) return <div>Loading Atlas...</div>

  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search-results" element={<SearchResults />} />

        {/* Passenger */}
        <Route
          path="/seats/:tripId"
          element={
            <ProtectedRoute role="USER">
              <SeatSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute role="USER">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/track/:tripId"
          element={
            <ProtectedRoute role="USER">
              <LiveTracking />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/buses"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminBuses />
            </ProtectedRoute>
          }
        />

        {/* Partner (NESTED + LAYOUT) */}
        <Route
          path="/partner"
          element={
            <ProtectedRoute role="PARTNER">
              <PartnerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PartnerDashboard />} />
          <Route path="dashboard" element={<PartnerDashboard />} />
          <Route path="buses" element={<PartnerBuses />} />
          <Route path="routes" element={<PartnerRoutes />} />
          <Route path="trips" element={<PartnerTrips />} />
          <Route path="drivers" element={<PartnerDrivers />} />
        </Route>

      </Routes>
    </Router>
  )
}
