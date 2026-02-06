import AdminLayout from '../../components/layout/AdminLayout'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1>Welcome to Admin Dashboard</h1>

      <div className="stats">
        <div className="card">Total Buses: 42</div>
        <div className="card">Active Trips: 18</div>
        <div className="card">Bookings Today: 120</div>
      </div>
    </AdminLayout>
  )
}
