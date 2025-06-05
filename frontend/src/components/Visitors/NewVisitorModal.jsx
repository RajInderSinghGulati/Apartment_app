import React, { useState } from "react";

export default function NewVisitorModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [preview, setPreview] = useState(null);

  if (!open) return null;

  const handleFile = e => {
    const f = e.target.files[0];
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="udash-section-title">Authorize Visitor</h3>
        <form>
          <input
            type="text"
            placeholder="Visitor Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
            placeholder="Vehicle Number (optional)"
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleFile} />
          {preview && (
            <img src={preview} alt="Preview" style={{ width: 60, borderRadius: "50%", marginTop: 10 }} />
          )}
          <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" style={{ background: "var(--primary)" }}>Authorize</button>
          </div>
        </form>
      </div>
    </div>
  );
}
