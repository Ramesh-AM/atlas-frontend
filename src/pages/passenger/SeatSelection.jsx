import { useEffect, useState } from "react";
import api from "../../utils/api";
import SeatMap from "../../components/SeatMap";

export default function SeatSelection({ tripId }) {
  console.log("Trip ID:", tripId);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const loadSeats = async () => {
    await api.get(`/trips/${tripId}/seats`).then(result => {
      console.log("Seat data:", result.data);
      setBookedSeats(result.data.bookedSeats);
      setLockedSeats(result.data.lockedSeats);
    }).catch(err => {
      console.error("Error fetching seat data:", err);
    });
  };

  useEffect(() => {
    loadSeats();
    const interval = setInterval(loadSeats, 3000); // refresh locks
    return () => clearInterval(interval);
  }, []);

  const toggleSeat = seat => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  const lockSeats = async () => {
    await api.post("/bookings/lock", {
      tripId,
      seats: selectedSeats
    });
    alert("Seats locked for 5 minutes");
  };

  return (
    <>
      <SeatMap
        bookedSeats={bookedSeats}
        lockedSeats={lockedSeats}
        selectedSeats={selectedSeats}
        onSelect={toggleSeat}
      />
      <button onClick={lockSeats} disabled={!selectedSeats.length}>
        Proceed to Pay
      </button>
    </>
  );
}
