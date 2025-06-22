import React, { useState } from "react";
import { createVisitor } from "../../api/visitors"; // Import your API function

export default function NewVisitorModal({ open, setOpen, onVisitorCreated }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleFile = e => {
    const f = e.target.files[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("time", time);
      if (vehicle) formData.append("vehicle", vehicle);
      if (file) formData.append("photo", file);

      await createVisitor(formData);
      setLoading(false);
      setName("");
      setDate("");
      setTime("");
      setVehicle("");
      setFile(null);
      setPreview(null);
      setOpen(false);
      if (onVisitorCreated) onVisitorCreated(); // Optionally refresh visitor list
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to authorize visitor");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="udash-section-title">Authorize Visitor</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" style={{ background: "var(--primary)" }} disabled={loading}>
              {loading ? "Authorizing..." : "Authorize"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
