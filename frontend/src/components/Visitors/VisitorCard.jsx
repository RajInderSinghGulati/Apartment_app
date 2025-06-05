import React from "react";

export default function VisitorCard({ visitor }) {
  return (
    <div className="udash-card">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <img
          src={visitor.photo}
          alt={visitor.name}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            marginRight: 12, border: "2px solid var(--accent)"
          }}
        />
        <div>
          <div style={{ fontWeight: 700, color: "var(--primary)" }}>{visitor.name}</div>
          <div style={{ color: "var(--gray)", fontSize: "0.97em" }}>{visitor.date} at {visitor.time}</div>
        </div>
      </div>
      {visitor.vehicle && (
        <div style={{ color: "var(--accent)", fontWeight: 600, marginBottom: 8 }}>
          Vehicle: {visitor.vehicle}
        </div>
      )}
      <span style={{
        background: visitor.status === "Upcoming" ? "var(--warning)" : "var(--success)",
        color: "#fff",
        borderRadius: 8,
        padding: "3px 14px",
        fontWeight: 700,
        fontSize: "0.97em"
      }}>
        {visitor.status}
      </span>
    </div>
  );
}
