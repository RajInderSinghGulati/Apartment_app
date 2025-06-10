import React, { useState } from "react";
import { createBooking } from "../api/bookings"; // Import your API function

export default function BookingModal({ open, setOpen, facility, onBookingCreated }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const bookingData = {
        facility: facility._id || facility, // Use facility ID or name as needed by backend
        date,
        time,
        purpose
      };
      await createBooking(bookingData);
      setLoading(false);
      setOpen(false);
      setDate("");
      setTime("");
      setPurpose("");
      if (onBookingCreated) onBookingCreated(); // Optionally refresh bookings
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to create booking");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="udash-section-title">Book {facility?.name || facility}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Purpose (optional)"
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
          />
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" style={{ background: "var(--primary)" }} disabled={loading}>
              {loading ? "Booking..." : "Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
