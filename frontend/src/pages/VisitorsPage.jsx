import React from "react";
import VisitorList from "../components/Visitors/VisitorList";

export default function VisitorsPage() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h2 className="udash-title">Visitor Management</h2>
        <hr className="section-divider" />
        <VisitorList />
      </div>
    </div>
  );
}
