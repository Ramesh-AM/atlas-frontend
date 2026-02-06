import { useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'
import DistrictAutocomplete from '../../components/DistrictAutoComplete'
import HeroSlider from '../../components/HeroSlider'
import '../../styles/Home.css'
export default function Home() {
  const navigate = useNavigate()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const handleSearch = () => {
    if (!from || !to || !date) {
      setError('Please select all fields')
      return
    }

    if (from === to) {
      setError('From and To cannot be same')
      return
    }

    setError('')
    navigate(`/search-results?from=${from}&to=${to}&date=${date}`)
  }

  return (
    <div className="home">

      {/* ===== HEADER ===== */}
      <header className="home-header">
        <div className="logo">RK Bus</div>
        <nav>
          <span><NavLink to="/login">Login</NavLink></span>
          <span>Bus Tickets</span>
          <span>Help</span>
          <span>Account</span>
        </nav>
      </header>

      {/* ===== HERO SEARCH ===== */}
      
      <HeroSlider />
      <div className="search-wrapper">
        <div className="search-card">
          <DistrictAutocomplete
            label="From"
            value={from}
            onChange={setFrom}
          />

          <DistrictAutocomplete
            label="To"
            value={to}
            exclude={from}
            onChange={setTo}
          />

          <div className="date-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search Buses
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>

      {/* ===== OFFERS ===== */}
      <section className="offers">
        <h2>Offers for You</h2>
        <div className="offer-cards">
          <div className="offer">Flat ₹200 OFF</div>
          <div className="offer">First Booking Deal</div>
          <div className="offer">Weekend Saver</div>
        </div>
      </section>

      {/* ===== POPULAR ROUTES ===== */}
      <section className="routes">
        <h2>Popular Bus Routes</h2>
        <div className="route-list">
          <div>Bangalore → Chennai</div>
          <div>Hyderabad → Bangalore</div>
          <div>Mumbai → Pune</div>
          <div>Delhi → Jaipur</div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© 2026 redBus Clone – Project Atlas</p>
      </footer>

    </div>
  )
}
