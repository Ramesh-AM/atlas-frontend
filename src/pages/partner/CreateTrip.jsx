import { useEffect, useState } from 'react'
import api from '../../utils/api'

export default function CreateTrip() {
  const [buses, setBuses] = useState([])
  const [routes, setRoutes] = useState([])
  const [form, setForm] = useState({})

  useEffect(() => {
    api.get('/partner/buses').then(r => setBuses(r.data))
    api.get('/partner/routes').then(r => setRoutes(r.data))
  }, [])

  const createTrip = async () => {
    await api.post('/partner/trips', form)
    alert('Trip created')
  }

  return (
    <div>
      <h2>Create Trip</h2>

      <select onChange={e => setForm({ ...form, busId: e.target.value })}>
        <option>Select Bus</option>
        {buses.map(b => <option key={b._id} value={b._id}>{b.operator}</option>)}
      </select>

      <select onChange={e => setForm({ ...form, routeId: e.target.value })}>
        <option>Select Route</option>
        {routes.map(r => (
          <option key={r._id} value={r._id}>
            {r.from} → {r.to}
          </option>
        ))}
      </select>

      <input type="datetime-local"
        onChange={e => setForm({ ...form, departureTime: e.target.value })}
      />

      <input type="number" placeholder="Price"
        onChange={e => setForm({ ...form, pricePerSeat: e.target.value })}
      />

      <button onClick={createTrip}>Create</button>
    </div>
  )
}