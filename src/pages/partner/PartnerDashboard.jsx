import { useEffect, useState } from 'react'
import PartnerLayout from "../../components/layout/PartnerLayout"
//import api from '../../utils/api'

export default function PartnerDashboard() {
  const [data, setData] = useState({ total: 0, count: 0 })

  // useEffect(() => {
  //   api.get('/partner/earnings').then(res => setData(res.data))
  // }, [])
  return (
    <PartnerLayout>
      <h1>Welcome, Operator</h1>

      <div className="stats">
        <div className="card">Total Buses</div>
        <div className="card">Active Trips</div>
        <div className="card">Drivers</div>
        <div className="card">Bookings: {data.count}</div>
        <div className="card">Revenue: ₹{data.total}</div>

      </div>
    </PartnerLayout>
  )
}