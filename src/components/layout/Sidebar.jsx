import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({collapsed}) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <h2 className="logo">ATLAS</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/live">Live Operations</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/buses">Buses</NavLink>
        <NavLink to="/admin/reports">Reports</NavLink>
      </nav>
    </aside>
  )
}