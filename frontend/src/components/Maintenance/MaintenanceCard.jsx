import React from "react";

function getStatusColor(status) {
  if (status === "Pending") return { background: "var(--warning)", color: "#fff" };
  if (status === "In Progress") return { background: "var(--accent)", color: "#fff" };
  if (status === "Completed") return { background: "var(--success)", color: "#fff" };
  return {};
}

export default function MaintenanceCard({ request }) {
  return (
    <div className="udash-card">
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.7em" }}>
        <span style={{
          ...getStatusColor(request.status),
          borderRadius: 8,
          padding: "4px 14px",
          fontWeight: 700,
          fontSize: "0.98em",
          marginRight: 10
        }}>
          {request.status}
        </span>
        <span style={{ color: "var(--gray)", fontSize: "0.95em" }}>
          {new Date(request.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h3 style={{ color: "var(--primary)", marginBottom: 8 }}>{request.title}</h3>
      <div style={{ marginBottom: 10 }}>{request.description}</div>
      {request.image && (
        <img src={request.image} alt="Request" style={{
          width: "100%",
          borderRadius: 12,
          marginBottom: 10,
          boxShadow: "0 2px 8px rgba(6,214,160,0.09)"
        }} />
      )}
      {/* Add feedback/rating UI here if needed */}
    </div>
  );
}
