import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminUsers from './pages/admin/AdminUsers'
import AdminBuses from './pages/admin/AdminBuses'
// import NotFound from './pages/NotFound'

import Home from './pages/passenger/Home'

import SearchBuses from './pages/passenger/SearchBuses'
import SeatSelection from './pages/passenger/SeatSelection'
import MyBookings from './pages/passenger/MyBookings'
import LiveTracking from './pages/passenger/LiveTracking'
import SearchResults from './pages/passenger/SearchResults'

// import DriverTrips from './pages/driver/DriverTrips'
// import DriverTripDetail from './pages/driver/DriverTripDetail'

// import AdminDashboard from './pages/admin/AdminDashboard'
// import LiveOperations from './pages/admin/LiveOperations'

import PartnerDashboard from './pages/partner/PartnerDashboard'
import AssignDriver from './pages/partner/AssignDriver'

const getAuth = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  return { token, role }
}

const ProtectedRoute = ({ children, role }) => {
  const auth = getAuth()
  if (!auth.token) return <Navigate to="/login" />
  if (role && auth.role !== role) return <Navigate to="/login" />
  return children
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return <div>Loading Atlas...</div>

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" 
          element={<Home />} 
        />

        <Route path="/search-results" element={<SearchResults />} />

        <Route
          path="/"
          element={
            <ProtectedRoute role="USER">
              <SearchBuses />
            </ProtectedRoute>
          }
        />
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

        {/* <Route
          path="/driver/trips"
          element={
            <ProtectedRoute role="DRIVER">
              <DriverTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver/trip/:tripId"
          element={
            <ProtectedRoute role="DRIVER">
              <DriverTripDetail />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route path="/partner" element={
          <ProtectedRoute role="PARTNER">
            <PartnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="trips/:tripId/assign-driver" element={
          <ProtectedRoute role="PARTNER">
            <AssignDriver />
          </ProtectedRoute>
        } />

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
        {/* <Route
          path="/admin/live"
          element={
            <ProtectedRoute role="ADMIN">
              <LiveOperations />
            </ProtectedRoute>
          }
        /> */}

        {/* <Route path="*" element={<NotFound />} /> */}

      </Routes>
    </Router>
  )
}

export default App
