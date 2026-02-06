import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { getBuses, createBus } from '../../utils/adminApi'

export default function AdminBuses() {
  const [buses, setBuses] = useState([])
  const [form, setForm] = useState({})

  useEffect(() => {
    getBuses().then(res => setBuses(res.data))
  }, [])

  const submit = () => {
    createBus(form).then(res => setBuses([...buses, res.data]))
  }

  return (
    <AdminLayout>
      <h2>Buses</h2>

      <input placeholder="Bus Number" onChange={e => setForm({ ...form, busNumber: e.target.value })} />
      <input placeholder="Operator" onChange={e => setForm({ ...form, operator: e.target.value })} />
      <input placeholder="Type" onChange={e => setForm({ ...form, type: e.target.value })} />
      <input type="number" placeholder="Seats" onChange={e => setForm({ ...form, totalSeats: e.target.value })} />

      <button onClick={submit}>Add Bus</button>

      <ul>
        {buses.map(b => (
          <li key={b._id}>
            {b.busNumber} | {b.operator} | {b.totalSeats} seats
          </li>
        ))}
      </ul>
    </AdminLayout>
  )
}