import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function PartnerRoutes() {
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    api.get('/partner/routes').then(res => setRoutes(res.data))
  }, [])

  return (
    <div>
      <h2>Routes</h2>
      {routes.map(r => (
        <p key={r._id}>{r.from} → {r.to}</p>
      ))}
    </div>
  )
}