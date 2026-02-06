import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { getUsers, updateUserStatus } from '../../utils/adminApi'

export default function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(res => setUsers(res.data))
  }, [])

  const toggleStatus = (id, current) => {
    updateUserStatus(id, !current).then(res => {
      setUsers(users.map(u => u._id === id ? res.data : u))
    })
  }

  return (
    <AdminLayout>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => toggleStatus(u._id, u.isActive)}>
                  {u.isActive ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  )
}
