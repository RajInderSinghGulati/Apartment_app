import React, { useState } from "react";
import BookingModal from "./BookingModal";

// Dummy facilities and bookings
const facilities = [
  { id: 1, name: "Clubhouse" },
  { id: 2, name: "Party Hall" },
  { id: 3, name: "Tennis Court" },
  { id: 4, name: "Swimming Pool" }
];

const dummySlots = [
  { id: 1, facility: "Clubhouse", date: "2025-06-07", time: "18:00", status: "Booked" },
  { id: 2, facility: "Tennis Court", date: "2025-06-08", time: "08:00", status: "Available" },
  { id: 3, facility: "Party Hall", date: "2025-06-09", time: "20:00", status: "Booked" }
];

export default function FacilityCalendar() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleBook = (facility) => {
    setSelected(facility);
    setOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", flexWrap: "wrap", marginBottom: "1.5em" }}>
        {facilities.map(fac => (
          <div
            key={fac.id}
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
          {dummySlots.map(slot => (
            <div
              key={slot.id}
              className="udash-card"
              style={{
                borderTop: slot.status === "Booked" ? "6px solid var(--danger)" : "6px solid var(--success)",
                background: slot.status === "Booked"
                  ? "linear-gradient(120deg, #ffe0ed 60%, #fff 100%)"
                  : "linear-gradient(120deg, #dcfce7 60%, #fff 100%)"
              }}
            >
              <div style={{ fontWeight: 700, color: slot.status === "Booked" ? "var(--danger)" : "var(--success)" }}>
                {slot.facility}
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
          ))}
        </div>
      </div>
      <BookingModal open={open} setOpen={setOpen} facility={selected} />
    </div>
  );
}
