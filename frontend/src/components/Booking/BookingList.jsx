import React from "react";

const myBookings = [
  { id: 1, facility: "Clubhouse", date: "2025-06-07", time: "18:00", status: "Booked" },
  { id: 2, facility: "Swimming Pool", date: "2025-06-10", time: "08:00", status: "Booked" }
];

export default function BookingList() {
  return (
    <div>
      <h3 className="udash-section-title">My Bookings</h3>
      <div className="udash-grid">
        {myBookings.length === 0 ? (
          <div className="udash-empty" style={{ gridColumn: "1/3" }}>No bookings yet.</div>
        ) : (
          myBookings.map(booking => (
            <div key={booking.id} className="udash-card"
              style={{
                borderTop: "6px solid var(--accent)",
                background: "linear-gradient(120deg, #dbeafe 60%, #fff 100%)"
              }}>
              <div style={{ fontWeight: 700, color: "var(--accent-dark)" }}>{booking.facility}</div>
              <div style={{ color: "var(--primary-dark)", margin: "0.2em 0" }}>
                {booking.date} at {booking.time}
              </div>
              <span style={{
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 8,
                padding: "3px 14px",
                fontWeight: 700,
                fontSize: "0.97em"
              }}>
                {booking.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
