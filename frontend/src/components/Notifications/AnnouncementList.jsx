import React from "react";

const announcements = [
  {
    id: 1,
    title: "Water Supply Shutdown",
    content: "Water will be off from 10am–2pm on June 10 for maintenance.",
    urgent: true,
    date: "2025-06-06"
  },
  {
    id: 2,
    title: "Yoga Camp Registration",
    content: "Join the free yoga camp this Sunday in the garden.",
    urgent: false,
    date: "2025-06-05"
  }
];

export default function AnnouncementList() {
  return (
    <div>
      {announcements.map(a => (
        <div
          key={a.id}
          className="udash-card"
          style={{
            marginBottom: 10,
            borderLeft: a.urgent ? "6px solid var(--danger)" : "6px solid var(--accent)",
            background: a.urgent
              ? "linear-gradient(90deg, var(--danger-bg) 60%, #fff 100%)"
              : "linear-gradient(90deg, var(--accent-light) 60%, #fff 100%)"
          }}
        >
          <div style={{ fontWeight: 700, color: a.urgent ? "var(--danger)" : "var(--accent)" }}>
            {a.title}
          </div>
          <div style={{ color: "var(--gray)", fontSize: "0.97em" }}>
            {a.content}
          </div>
          <div style={{ fontSize: "0.9em", color: "var(--gray)", marginTop: 6 }}>
            {a.date}
          </div>
        </div>
      ))}
    </div>
  );
}
