import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../../utils/api'
import BusFilters from '../../components/BusFilters'
import './SearchResults.css'

export default function SearchResults() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    busType: [],
    amenities: [],
    maxFare: 2000
  })

  const from = params.get('from')
  const to = params.get('to')
  const date = params.get('date')

  useEffect(() => {
    setLoading(true)
    api.get('/search', { params: { from, to, date } })
      .then(res => setTrips(res.data))
      .finally(() => setLoading(false))
  }, [from, to, date])

  const filteredTrips = trips.filter(trip => {
    const typeMatch =
      filters.busType.length === 0 ||
      filters.busType.some(t =>
        trip.busId.type.toLowerCase().includes(t.toLowerCase())
      )

    const amenityMatch =
      filters.amenities.length === 0 ||
      filters.amenities.every(a =>
        trip.busId.amenities.includes(a)
      )

    const fareMatch = trip.fare <= filters.maxFare

    return typeMatch && amenityMatch && fareMatch
  })

  return (
    <div className="results-page">
      {/* ROUTE HEADER */}
      <div className="route-header">
        <h2>{from} → {to}</h2>
        <span>{date}</span>
      </div>

      <div className="results-layout">
        {/* FILTERS */}
        <BusFilters filters={filters} setFilters={setFilters} />

        {/* RESULTS */}
        <div className="results">
          {loading && <p className="loading">Loading buses...</p>}

          {!loading && filteredTrips.length === 0 && (
            <p className="no-results">No buses available</p>
          )}

          {filteredTrips.map(trip => (
            <div className="bus-card" key={trip._id}>
              <div className="bus-left">
                <h3>{trip.busId.operator}</h3>
                <p className="bus-type">{trip.busId.type}</p>

                <div className="amenities">
                  {trip.busId.amenities.map(a => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
              </div>

              <div className="bus-center">
                <strong>{trip.departureTime}</strong>
                <span className="arrow">→</span>
                <strong>{trip.arrivalTime}</strong>
              </div>

              <div className="bus-right">
                <h3>₹{trip.fare}</h3>
                <p>{trip.availableSeats} seats left</p>

                <button
                  className="view-seats"
                  onClick={() => navigate(`/seat-selections?tripId=${trip?._id}`)}
                >
                  View Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}