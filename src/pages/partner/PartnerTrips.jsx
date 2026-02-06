import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function PartnerTrips() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    api.get('/partner/trips').then(res => setTrips(res.data))
  }, [])

  return (
    <div>
      <h2>Trips</h2>

      {trips.map(t => (
        <div key={t._id} className="card">
          <p>{t.routeId.from} → {t.routeId.to}</p>
          <p>Bus: {t.busId.operator}</p>
          <p>Driver: {t.driverId?.name || 'Unassigned'}</p>
        </div>
      ))}
    </div>
  )
}