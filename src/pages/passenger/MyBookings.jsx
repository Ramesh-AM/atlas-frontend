import { useLocation, useNavigate } from 'react-router-dom'

export default function BookingSummary() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const seats = state?.selected || []

  const fare = seats.length * 500

  return (
    <div style={{ padding: 20 }}>
      <h2>Booking Summary</h2>

      <p>Seats: {seats.join(', ')}</p>
      <p>Total Fare: ₹{fare}</p>

      <button onClick={() => navigate('/payment', { state: { fare } })}>
        Proceed to Payment
      </button>
    </div>
  )
}
