import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:5000')

export default function LiveTracking() {
  const [pos, setPos] = useState([12.9716, 77.5946])

  useEffect(() => {
    socket.on('admin:location', data => {
      setPos([data.lat, data.lng])
    })
  }, [])

  return (
    <MapContainer center={pos} zoom={8} style={{ height: '80vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={pos} />
    </MapContainer>
  )
}
