import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import { fetchFacilities } from "../api/facilities";
import { fetchBookings } from "../api/bookings";

export default function FacilityCalendar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  // Fetch facilities from backend
  useEffect(() => {
    fetchFacilities()
      .then(res => setFacilities(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading facilities"));
  }, []);

  // Fetch bookings from backend
  const loadBookings = () => {
    fetchBookings()
      .then(res => setBookings(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading bookings"));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleBook = (facility) => {
    setSelected(facility);
    setOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", flexWrap: "wrap", marginBottom: "1.5em" }}>
        {facilities.map(fac => (
          <div
            key={fac._id}
            className="udash-card"
            style={{
              minWidth: 180,
              borderTop: "6px solid var(--accent)",
              background: "linear-gradient(120deg, var(--accent-light) 60%, #fff 100%)"
            }}
          >
            <h3 style={{ color: "var(--accent)" }}>{fac.name}</h3>
            <button style={{ width: "100%" }} onClick={() => handleBook(fac)}>
              Book
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3 className="udash-section-title">Upcoming Bookings</h3>
        <div className="udash-grid">
          {error && (
            <div className="udash-empty" style={{ gridColumn: "1/3", color: "red" }}>{error}</div>
          )}
          {bookings.length === 0 && !error ? (
            <div className="udash-empty" style={{ gridColumn: "1/3" }}>No bookings yet.</div>
          ) : (
            bookings.map(slot => (
              <div
                key={slot._id}
                className="udash-card"
                style={{
                  borderTop: slot.status === "Booked" ? "6px solid var(--danger)" : "6px solid var(--success)",
                  background: slot.status === "Booked"
                    ? "linear-gradient(120deg, #ffe0ed 60%, #fff 100%)"
                    : "linear-gradient(120deg, #dcfce7 60%, #fff 100%)"
                }}
              >
                <div style={{ fontWeight: 700, color: slot.status === "Booked" ? "var(--danger)" : "var(--success)" }}>
                  {slot.facility?.name || slot.facility}
                </div>
                <div style={{ color: "var(--accent-dark)", margin: "0.2em 0" }}>
                  {slot.date} at {slot.time}
                </div>
                <span style={{
                  background: slot.status === "Booked" ? "var(--danger)" : "var(--success)",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "3px 14px",
                  fontWeight: 700,
                  fontSize: "0.97em"
                }}>
                  {slot.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <BookingModal
        open={open}
        setOpen={setOpen}
        facility={selected}
        onBookingCreated={loadBookings}
      />
    </div>
  );
}
