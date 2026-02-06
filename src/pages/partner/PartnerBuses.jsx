import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function PartnerBuses() {
  const [buses, setBuses] = useState([])

  useEffect(() => {
    api.get('/partner/buses').then(res => setBuses(res.data))
  }, [])

  return (
    <div>
      <h2>My Buses</h2>

      {buses.map(bus => (
        <div key={bus._id} className="card">
          <h3>{bus.operator}</h3>
          <p>{bus.type} • {bus.seatCount} seats</p>
        </div>
      ))}
    </div>
  )
}