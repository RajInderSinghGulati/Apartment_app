import React from "react";

export default function AnnouncementList({ announcements = [] }) {
  return (
    <div>
      {announcements.length === 0 ? (
        <div>No announcements at this time.</div>
      ) : (
        announcements.map(a => (
          <div
            key={a._id}
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
              {a.date ? a.date : new Date(a.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
