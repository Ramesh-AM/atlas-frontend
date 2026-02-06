import { useEffect, useState } from 'react'
import '../styles/HeroSlider.css'

const banners = [
  {
    image: '/src/assets/bus4.jpg',
    title: 'Book Bus Tickets Across India',
    subtitle: 'Fast • Secure • Reliable'
  },
  {
    image: '/src/assets/bus5.jpg',
    title: 'Travel Comfortably',
    subtitle: 'AC • Sleeper • Seater Buses'
  },
  {
    image: '/src/assets/bus6.jpg',
    title: 'Live Tracking & Instant Booking',
    subtitle: 'Know where your bus is'
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-slider">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="overlay">
            <h1>{banner.title}</h1>
            <p>{banner.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={i === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  )
}