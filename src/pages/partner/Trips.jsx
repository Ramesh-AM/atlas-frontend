import { useEffect, useState } from 'react'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

export default function Trips() {
  const [trips, setTrips] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/partner/trips').then(res => setTrips(res.data))
  }, [])

  return (
    <div>
      <h2>Trips</h2>

      {trips.map(trip => (
        <div key={trip._id} className="card">
          <p>{trip.routeId.from} → {trip.routeId.to}</p>
          <p>{trip.date}</p>

          <button
            onClick={() => navigate(`/partner/trips/${trip._id}/assign-driver`)}
          >
            Assign Driver
          </button>
        </div>
      ))}
    </div>
  )
}