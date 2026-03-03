import { useState } from 'react'
import api from '../../utils/api'
import './SeatLayout.css'

export default function SeatLayoutDesigner({ bus }) {
  const [rows, setRows] = useState(5)
  const [cols, setCols] = useState(4)
  const [seats, setSeats] = useState([])

  const generateLayout = () => {
    const layout = []
    let seatNo = 1

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        layout.push({
          seatNo: `S${seatNo++}`,
          row: r,
          col: c,
          type: 'SEAT'
        })
      }
    }
    setSeats(layout)
  }

  const saveLayout = async () => {
    await api.patch(`/partner/buses/${bus._id}`, {
      seatLayout: { rows, cols, seats }
    })
    alert('Seat layout saved')
  }

  return (
    <div>
      <h3>Seat Layout Designer</h3>

      <div className="controls">
        <input type="number" value={rows} onChange={e => setRows(e.target.value)} />
        <input type="number" value={cols} onChange={e => setCols(e.target.value)} />
        <button onClick={generateLayout}>Generate</button>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 50px)` }}
      >
        {seats.map(s => (
          <div key={s.seatNo} className="seat">
            {s.seatNo}
          </div>
        ))}
      </div>

      <button onClick={saveLayout}>Save Layout</button>
    </div>
  )
}