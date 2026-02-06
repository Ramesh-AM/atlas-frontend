import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import './AdminLayout.css'

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <div className="admin-container">
      <Sidebar collapsed={collapsed} />

      <div className={`main-section ${collapsed ? 'shifted' : ''}`}>
        <Topbar toggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  )
}