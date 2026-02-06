import { useNavigate } from 'react-router-dom'

export default function SearchBuses() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <h2>Search Buses</h2>
      <button onClick={() => navigate('/seats/123')}>
        View Seats
      </button>
    </div>
  )
}
