import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import PartnerSidebar from './PartnerSidebar'
import Topbar from './Topbar'
import './PartnerLayout.css'

export default function PartnerLayout() {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <div className="partner-layout">
      <PartnerSidebar collapsed={collapsed} />
      <div className={`main-section ${collapsed ? 'shifted' : ''}`}>
        <Topbar toggleSidebar={() => setCollapsed(!collapsed)} />
        <Outlet />
      </div>
    </div>
  )
}