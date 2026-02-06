import { useParams } from 'react-router-dom'

export default function DriverTripDetail() {
  const { tripId } = useParams()

  return (
    <div className="page">
      <h2>Driver Trip Detail</h2>
      <p>Trip ID: {tripId}</p>
    </div>
  )
}