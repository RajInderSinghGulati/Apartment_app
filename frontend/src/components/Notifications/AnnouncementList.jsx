import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../../api/notifications"; // Import your API function

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications()
      .then(res => setAnnouncements(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading announcements"));
  }, []);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {announcements.length === 0 && !error ? (
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
