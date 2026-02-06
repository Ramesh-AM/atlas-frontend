import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'

export default function AssignDriver() {
  const { tripId } = useParams()
  const navigate = useNavigate()

  const [drivers, setDrivers] = useState([])
  const [driverId, setDriverId] = useState('')

  useEffect(() => {
    api.get('/partner/drivers').then(res => setDrivers(res.data))
  }, [])

  const assign = async () => {
    await api.put(`/partner/trips/${tripId}/assign-driver`, { driverId })
    navigate('/partner/trips')
  }

  return (
    <div>
      <h2>Assign Driver</h2>

      <select onChange={e => setDriverId(e.target.value)}>
        <option value="">Select Driver</option>
        {drivers.map(d => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>

      <button onClick={assign} disabled={!driverId}>Assign</button>
    </div>
  )
}