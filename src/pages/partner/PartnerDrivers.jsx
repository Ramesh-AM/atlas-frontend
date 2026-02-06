import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function PartnerDrivers() {
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    api.get('/partner/drivers').then(res => setDrivers(res.data))
  }, [])

  return (
    <div>
      <h2>Drivers</h2>
      {drivers.map(d => (
        <p key={d._id}>{d.name} • {d.phone}</p>
      ))}
    </div>
  )
}