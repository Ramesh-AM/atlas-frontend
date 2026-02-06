import { useNavigate } from 'react-router-dom'
import './Topbar.css'

export default function Topbar({toggleSidebar}) {
  const navigate = useNavigate()

  const getAuth = () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    return { token, role }
  }
  const auth = getAuth()
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <header className="topbar">
        <button onClick={toggleSidebar}>☰</button>
        <div className="title">{auth.role} Dashboard</div>

        <div className="actions">
            <span className="user">{auth.role}</span>
            <button onClick={logout}>Logout</button>
        </div>
    </header>
  )
}