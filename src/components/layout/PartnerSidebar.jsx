import { NavLink } from 'react-router-dom'
import './PartnerSidebar.css'

export default function PartnerSidebar() {
  return (
    <aside className="sidebar">
      <h2>Partner Panel</h2>

      <NavLink to="">Dashboard</NavLink>
      <NavLink to="PartnerBuses">Buses</NavLink>
      <NavLink to="routes">Routes</NavLink>
      <NavLink to="trips">Trips</NavLink>
      <NavLink to="drivers">Drivers</NavLink>
    </aside>
  )
}