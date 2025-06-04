import React from "react";

function StaffProfileCard({ staff }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", margin: "0.5rem 0", borderRadius: "6px" }}>
      <div><b>{staff.name}</b></div>
      <div>Role: {staff.role}</div>
      <button>Fire</button>
    </div>
  );
}

export default StaffProfileCard;
