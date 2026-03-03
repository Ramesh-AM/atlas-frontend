import { useEffect, useState } from 'react'
import api from '../../utils/api'
import './PartnerBuses.css'

export default function PartnerBuses() {
  const [buses, setBuses] = useState([])
  const [form, setForm] = useState({
    operator: '',
    type: 'Seater',
    seatCount: '',
    amenities: ''
  })

  const loadBuses = async () => {
    const res = await api.get('/partner/buses')
    setBuses(res.data)
  }

  useEffect(() => {
    loadBuses()
  }, [])

  const createBus = async () => {
    if (!form.operator || !form.seatCount) return alert('Fill required fields')

    await api.post('/partner/create/buses', {
      operator: form.operator,
      type: form.type,
      seatCount: Number(form.seatCount),
      amenities: form.amenities.split(',').map(a => a.trim())
    })

    setForm({ operator: '', type: 'Seater', seatCount: '', amenities: '' })
    loadBuses()
  }

  return (
    <div className="partner-buses">
      <h2>My Buses</h2>

      {/* Add Bus */}
      <div className="add-bus-card">
        <input
          placeholder="Operator Name"
          value={form.operator}
          onChange={e => setForm({ ...form, operator: e.target.value })}
        />

        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        >
          <option>Seater</option>
          <option>Sleeper</option>
        </select>

        <input
          type="number"
          placeholder="Seat Count"
          value={form.seatCount}
          onChange={e => setForm({ ...form, seatCount: e.target.value })}
        />

        <input
          placeholder="Amenities (comma separated)"
          value={form.amenities}
          onChange={e => setForm({ ...form, amenities: e.target.value })}
        />

        <button onClick={createBus}>Add Bus</button>
      </div>

      {/* Bus List */}
      <div className="bus-grid">
        {buses.map(bus => (
          <div className="bus-card" key={bus._id}>
            <div className="bus-header">
              <h3>{bus.operator}</h3>
              <span className={`badge ${bus.type.toLowerCase()}`}>
                {bus.type}
              </span>
            </div>

            <p>{bus.seatCount} Seats</p>

            <div className="amenities">
              {bus.amenities.map(a => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}