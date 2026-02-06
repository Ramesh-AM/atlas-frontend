import "./SeatMap.css";

export default function SeatMap({
  type = "SEATER", // SEATER | SLEEPER
  bookedSeats = [],
  lockedSeats = [],
  selectedSeats = [],
  onSelect
}) {

  const isDisabled = seat =>
    bookedSeats.includes(seat) || lockedSeats.includes(seat);

  const getClass = seat => `
    seat
    ${bookedSeats.includes(seat) ? "booked" : ""}
    ${lockedSeats.includes(seat) ? "locked" : ""}
    ${selectedSeats.includes(seat) ? "selected" : ""}
  `;

  /* ================= SEATER LAYOUT ================= */
  const renderSeater = () => {
    const rows = Array.from({ length: 10 }); // 10 rows
    const cols = ["A", "B", "", "C", "D"]; // aisle gap

    return rows.map((_, rowIdx) => (
      <div className="seat-row" key={rowIdx}>
        {cols.map((col, colIdx) => {
          if (col === "") return <div className="aisle" key={colIdx} />;

          const seat = `${rowIdx + 1}${col}`;
          return (
            <div
              key={seat}
              className={getClass(seat)}
              onClick={() => !isDisabled(seat) && onSelect(seat)}
            >
              {seat}
            </div>
          );
        })}
      </div>
    ));
  };

  /* ================= SLEEPER LAYOUT ================= */
  const renderSleeper = deck => {
    const rows = Array.from({ length: 6 }); // 6 rows
    const cols = ["A", "", "B"]; // aisle

    return (
      <div className="deck">
        <h4>{deck === "L" ? "Lower Deck" : "Upper Deck"}</h4>

        {rows.map((_, rowIdx) => (
          <div className="seat-row sleeper-row" key={rowIdx}>
            {cols.map((col, colIdx) => {
              if (col === "") return <div className="aisle" key={colIdx} />;

              const seat = `${deck}${rowIdx + 1}${col}`;
              return (
                <div
                  key={seat}
                  className={`${getClass(seat)} sleeper`}
                  onClick={() => !isDisabled(seat) && onSelect(seat)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="seat-map">
      {type === "SEATER" && renderSeater()}
      {type === "SLEEPER" && (
        <>
          {renderSleeper("L")}
          {renderSleeper("U")}
        </>
      )}
    </div>
  );
}
