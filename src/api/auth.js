const API_URL = 'http://localhost:5000/api/auth'

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error('Registration failed')
    console.log('res:', res)
  return res.json()
}
