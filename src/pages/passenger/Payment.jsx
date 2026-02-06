import { useNavigate } from 'react-router-dom'

export default function Payment() {
  const navigate = useNavigate()

  const pay = () => {
    alert('Payment Successful')
    navigate('/dashboard')
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Payment</h2>

      <button onClick={pay}>Pay Now</button>
    </div>
  )
}
