import { useNavigate } from 'react-router-dom'

export default function PassengerDashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 20 }}>
      <h2>My Trips</h2>

      <div className="card">
        <p>Bangalore → Chennai</p>
        <button onClick={() => navigate('/live-tracking')}>
          Track Bus
        </button>
      </div>
    </div>
  )
}