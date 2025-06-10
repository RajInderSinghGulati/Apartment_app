import React, { useState } from "react";
import { createStaff } from "../api/staff"; // Import your API function

export default function HireStaffModal({ onStaffHired }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createStaff({ name, role });
      setLoading(false);
      setOpen(false);
      setName("");
      setRole("");
      if (onStaffHired) onStaffHired(); // Optionally refresh staff list
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to hire staff");
    }
  };

  return (
    <div>
      <button className="staff-hire-btn" onClick={() => setOpen(true)}>
        + Hire Staff
      </button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="udash-section-title">Hire New Staff</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={e => setRole(e.target.value)}
                required
              />
              {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
              <div style={{ marginTop: "1rem", display: "flex", gap: "1em" }}>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: "var(--primary)" }}
                  disabled={loading}
                >
                  {loading ? "Hiring..." : "Hire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
