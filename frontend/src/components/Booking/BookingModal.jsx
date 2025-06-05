import React, { useState } from "react";

export default function BookingModal({ open, setOpen, facility }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="udash-section-title">Book {facility?.name}</h3>
        <form>
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
          <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" style={{ background: "var(--primary)" }}>Book</button>
          </div>
        </form>
      </div>
    </div>
  );
}
