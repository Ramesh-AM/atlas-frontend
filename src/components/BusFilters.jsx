import '../styles/BusFilters.css'

export default function BusFilters({ filters, setFilters }) {
  const toggle = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }))
  }

  return (
    <div className="filters">
      <h3>Filters</h3>

      {/* Bus Type */}
      <div className="filter-section">
        <h4>Bus Type</h4>
        {['AC', 'Non-AC', 'Sleeper', 'Seater'].map(type => (
          <label key={type}>
            <input
              type="checkbox"
              onChange={() => toggle('busType', type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Amenities */}
      <div className="filter-section">
        <h4>Amenities</h4>
        {['WiFi', 'Charging', 'Blanket'].map(a => (
          <label key={a}>
            <input
              type="checkbox"
              onChange={() => toggle('amenities', a)}
            />
            {a}
          </label>
        ))}
      </div>

      {/* Fare */}
      <div className="filter-section">
        <h4>Max Fare</h4>
        <input
          type="range"
          min="300"
          max="2000"
          step="100"
          value={filters.maxFare}
          onChange={e =>
            setFilters(prev => ({
              ...prev,
              maxFare: Number(e.target.value)
            }))
          }
        />
        <span>₹{filters.maxFare}</span>
      </div>

      <button
        className="reset-btn"
        onClick={() =>
          setFilters({
            busType: [],
            amenities: [],
            maxFare: 2000
          })
        }
      >
        Reset
      </button>
    </div>
  )
}