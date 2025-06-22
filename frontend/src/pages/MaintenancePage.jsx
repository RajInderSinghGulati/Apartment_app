import React from "react";
import MaintenanceList from "../components/Maintenance/MaintenanceList";

export default function MaintenancePage() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h2 className="udash-title">Maintenance Requests</h2>
        <hr className="section-divider" />
        <MaintenanceList />
      </div>
    </div>
  );
}
