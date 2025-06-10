import React, { useEffect, useState } from "react";
import { fetchBookings } from "../api/bookings"; // Import your API function

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings()
      .then(res => setBookings(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading bookings"));
  }, []);

  return (
    <div>
      <h3 className="udash-section-title">My Bookings</h3>
      <div className="udash-grid">
        {error && (
          <div className="udash-empty" style={{ gridColumn: "1/3", color: "red" }}>{error}</div>
        )}
        {bookings.length === 0 && !error ? (
          <div className="udash-empty" style={{ gridColumn: "1/3" }}>No bookings yet.</div>
        ) : (
          bookings.map(booking => (
            <div key={booking._id} className="udash-card"
              style={{
                borderTop: "6px solid var(--accent)",
                background: "linear-gradient(120deg, #dbeafe 60%, #fff 100%)"
              }}>
              <div style={{ fontWeight: 700, color: "var(--accent-dark)" }}>{booking.facility?.name || booking.facility}</div>
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
