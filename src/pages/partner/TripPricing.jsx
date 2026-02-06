import { useState } from 'react'
import api from '../../utils/api'

export default function TripPricing({ tripId }) {
  const [seater, setSeater] = useState('')
  const [sleeper, setSleeper] = useState('')

  const save = async () => {
    await api.patch(`/partner/trips/${tripId}/pricing`, {
      seater,
      sleeper
    })
    alert('Pricing updated')
  }

  return (
    <div>
      <h4>Seat Pricing</h4>

      <input
        placeholder="Seater Price"
        value={seater}
        onChange={e => setSeater(e.target.value)}
      />

      <input
        placeholder="Sleeper Price"
        value={sleeper}
        onChange={e => setSleeper(e.target.value)}
      />

      <button onClick={save}>Save</button>
    </div>
  )
}