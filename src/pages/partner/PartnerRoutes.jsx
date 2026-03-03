import { useEffect, useState } from 'react'
import api from '../../utils/api'
import './PartnerRoutes.css'

const cities = [
  'Chennai',
  'Madurai',
  'Coimbatore',
  'Trichy',
  'Salem',
  'Bangalore',
  'Hyderabad'
]

export default function PartnerRoutes() {
  const [routes, setRoutes] = useState([])
  const [form, setForm] = useState({
    from: '',
    to: '',
    distanceKm: ''
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadRoutes()
  }, [])

  const loadRoutes = async () => {
    const res = await api.get('/partner/routes')
    setRoutes(res.data)
  }

  /* ---------- Google Distance API (placeholder) ---------- */
  const calculateDistance = async (from, to) => {
    // 🔑 Replace with Google Maps Distance Matrix API
    // For now mock distance
    return Math.floor(Math.random() * 300) + 100
  }

  const saveRoute = async () => {
    if (!form.from || !form.to) return alert('Select cities')
    if (form.from === form.to) return alert('Cities cannot match')

    let distance = form.distanceKm
    if (!distance) {
      distance = await calculateDistance(form.from, form.to)
    }

    if (editingId) {
      await api.patch(`/partner/update/routes/${editingId}`, {
        ...form,
        distanceKm: distance
      })
    } else {
      await api.post('/partner/create/routes', {
        ...form,
        distanceKm: distance
      })
    }

    setForm({ from: '', to: '', distanceKm: '' })
    setEditingId(null)
    loadRoutes()
  }

  const editRoute = (r) => {
    setForm(r)
    setEditingId(r._id)
  }

  const deleteRoute = async (id) => {
    if (!window.confirm('Delete route?')) return
    await api.delete(`/partner/routes/${id}`)
    loadRoutes()
  }

  const toggleStatus = async (id) => {
    await api.patch(`/partner/routes/${id}/status`)
    loadRoutes()
  }

  return (
    <div className="partner-routes">
      <h2>Routes</h2>

      {/* Add / Edit */}
      <div className="add-route-card">
        <select
          value={form.from}
          onChange={e => setForm({ ...form, from: e.target.value })}
        >
          <option value="">From</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>

        <select
          value={form.to}
          onChange={e => setForm({ ...form, to: e.target.value })}
        >
          <option value="">To</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>

        <input
          placeholder="Distance (auto)"
          value={form.distanceKm}
          onChange={e => setForm({ ...form, distanceKm: e.target.value })}
        />

        <button onClick={saveRoute}>
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Route List */}
      <div className="route-grid">
        {routes.map(r => (
          <div key={r._id} className="route-card">
            <h3>{r.from} → {r.to}</h3>
            <p>{r.distanceKm} km</p>
            <p>Trips: {r.tripCount}</p>

            <span className={`status ${r.status.toLowerCase()}`}>
              {r.status}
            </span>

            <div className="actions">
              <button onClick={() => editRoute(r)}>Edit</button>
              <button onClick={() => toggleStatus(r._id)}>
                {r.status === 'ACTIVE' ? 'Disable' : 'Enable'}
              </button>
              <button className="danger" onClick={() => deleteRoute(r._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}