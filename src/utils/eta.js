export default (distanceKm, speedKmph = 60) => {
  const hours = distanceKm / speedKmph
  return Math.round(hours * 60) // minutes
}