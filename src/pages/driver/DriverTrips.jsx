import { useNavigate } from 'react-router-dom'

export default function DriverTrips() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h2>My Trips</h2>
      <button onClick={() => navigate('/driver/trip/123')}>
        Start Trip
      </button>
    </div>
  )
}
