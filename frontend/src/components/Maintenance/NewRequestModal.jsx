import React, { useState } from "react";

export default function NewRequestModal({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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
        <h3 className="udash-section-title">New Maintenance Request</h3>
        <form>
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
          <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
            <button type="button" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" style={{ background: "var(--primary)" }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
