import api from 'axios'

const API_URL = 'http://localhost:5000/api';
export const getUsers = () => api.get(`${API_URL}/admin/users`)

export const updateUserStatus = (id, isActive) =>
  api.patch(`${API_URL}/admin/users/${id}/status`, { isActive })

export const getBuses = () => api.get(`${API_URL}/admin/buses`)
export const createBus = (data) => api.post(`${API_URL}/admin/buses`, data)