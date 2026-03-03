import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function AdminTrips() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    api.get('/admin/trips/pending').then(res => setTrips(res.data))
  }, [])

  const approve = async (id) => {
    await api.patch(`/admin/trips/${id}/approve`)
    setTrips(t => t.map(tr =>
      tr._id === id ? { ...tr, status: 'APPROVED' } : tr
    ))
  }

  return (
    <div>
      <h2>Pending Trips</h2>

      {trips.map(t => (
        <div key={t._id}>
          <span>{t.routeId.from} → {t.routeId.to}</span>
          <span>{t.status}</span>

          {t.status === 'PENDING' && (
            <button onClick={() => approve(t._id)}>Approve</button>
          )}
        </div>
      ))}
    </div>
  )
}