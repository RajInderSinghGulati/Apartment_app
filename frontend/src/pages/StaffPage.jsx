import React from "react";
import StaffList from "../components/Staff/StaffList";

export default function StaffPage() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h2 className="udash-section-title">Staff Management</h2>
        <StaffList />
      </div>
    </div>
  );
}
