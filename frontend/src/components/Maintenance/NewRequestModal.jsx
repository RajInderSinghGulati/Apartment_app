import React, { useState } from "react";
import { createMaintenance } from "../api/maintenance"; // Import your API function

export default function NewRequestModal({ open, setOpen, onRequestCreated }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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
      formData.append("title", title);
      formData.append("description", desc);
      if (file) formData.append("image", file);

      await createMaintenance(formData);
      setLoading(false);
      setTitle("");
      setDesc("");
      setFile(null);
      setPreview(null);
      setOpen(false);
      if (onRequestCreated) onRequestCreated(); // Refresh the list
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to submit request");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="udash-section-title">New Maintenance Request</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Describe the issue..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={3}
            required
          />
          <input type="file" accept="image/*,video/*" onChange={handleFile} />
          {preview && (
            <img src={preview} alt="Preview" style={{ width: "100%", borderRadius: 10, marginTop: 10 }} />
          )}
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" style={{ background: "var(--primary)" }} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
