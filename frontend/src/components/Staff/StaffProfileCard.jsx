import React, { useState } from "react";
import { deleteStaff } from "../api/staff"; // Import your API function

export default function StaffProfileCard({ staff, onStaffFired }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFire = async () => {
    if (!window.confirm(`Are you sure you want to fire ${staff.name}?`)) return;
    setLoading(true);
    setError("");
    try {
      await deleteStaff(staff._id);
      setLoading(false);
      if (onStaffFired) onStaffFired(); // Refresh staff list in parent
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to fire staff");
    }
  };

  return (
    <div className="staff-card">
      <div className="staff-card-info">
        <span className="staff-card-name">{staff.name}</span>
        <span className="staff-card-role">{staff.role}</span>
      </div>
      <button
        className="staff-fire-btn"
        onClick={handleFire}
        disabled={loading}
        style={{ background: "var(--danger)", color: "#fff" }}
      >
        {loading ? "Firing..." : "Fire"}
      </button>
      {error && <div style={{ color: "red", marginTop: 6 }}>{error}</div>}
    </div>
  );
}
