import React from "react";

export default function StaffProfileCard({ staff }) {
  return (
    <div className="staff-card">
      <div className="staff-card-info">
        <span className="staff-card-name">{staff.name}</span>
        <span className="staff-card-role">{staff.role}</span>
      </div>
      <button className="staff-fire-btn">Fire</button>
    </div>
  );
}
