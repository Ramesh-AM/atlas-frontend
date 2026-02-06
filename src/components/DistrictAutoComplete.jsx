import { useState } from 'react'
import '../styles/DistrictAutoComplete.css'

export default function DistrictAutocomplete({
  label,
  value,
  onChange,
  exclude
}) {
  const districts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Trichy",
    "Perambalur",
    "Cuddalore",
    "Kallakurichi",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Erode",
    "Tirunelveli",
    "Thanjavur",
    "Vellore",
    "Kanchipuram",
    "Villupuram",
    "Dindigul",
    "Karur",
    "Namakkal",
    "Tiruppur",
    "Ramanathapuram",
    "Sivaganga",
    "Nagapattinam",
    "Tiruvarur",
    "Krishnagiri",
    "Dharmapuri",
    "Theni",
    "Virudhunagar",
    "Pudukkottai",
    "Ranipet",
    "Tiruvallur",
    "Thiruvarur"
  ];
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)

  const filtered =
    query.length >= 2
      ? districts.filter(d =>
          d.toLowerCase().startsWith(query.toLowerCase()) &&
          d !== exclude
        )
      : []

  const selectDistrict = d => {
    onChange(d)
    setQuery(d)
    setShow(false)
  }

  return (
    <div className="autocomplete">
      <label>{label}</label>
      <input
        value={query || value}
        onChange={e => {
          setQuery(e.target.value)
          setShow(true)
        }}
        placeholder={`Enter ${label}`}
      />

      {show && filtered.length > 0 && (
        <ul className="dropdown">
          {filtered.map(d => (
            <li key={d} onClick={() => selectDistrict(d)}>
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}