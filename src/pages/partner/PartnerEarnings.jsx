import { useEffect, useState } from 'react'
import api from '../../utils/api'
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

export default function PartnerEarnings() {
  const [data, setData] = useState([])

  useEffect(() => {
    api.get('/partner/earnings').then(res => setData(res.data))
  }, [])

  return (
    <div>
      <h2>Monthly Earnings</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Line dataKey="total" stroke="#d84e55" />
      </LineChart>
    </div>
  )
}