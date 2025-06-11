import React, { useState, useEffect } from "react";
import AnnouncementList from "./AnnouncementList";
import { fetchNotifications } from "../../api/notifications";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetchNotifications()
      .then(res => {
        const notifications = res.data || [];
        setAnnouncements(notifications);
        const unreadCount = notifications.filter(n => !n.isRead).length;
        setUnread(unreadCount);
      })
      .catch(() => {
        setAnnouncements([]);
        setUnread(0);
      });
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        style={{
          background: "var(--warning)",
          borderRadius: "50%",
          width: 42,
          height: 42,
          position: "relative"
        }}
        onClick={() => setOpen(o => !o)}
        aria-label="Notifications"
      >
        <span role="img" aria-label="bell" style={{ fontSize: 22 }}>🔔</span>
        {unread > 0 && (
          <span style={{
            position: "absolute",
            top: 6, right: 8,
            background: "var(--danger)",
            color: "#fff",
            borderRadius: "50%",
            fontSize: "0.85em",
            fontWeight: 700,
            padding: "2px 7px"
          }}>{unread}</span>
        )}
      </button>
      {open && (
        <div style={{
          position: "absolute", top: 50, right: 0, zIndex: 200,
          minWidth: 320, background: "var(--glass)", borderRadius: 16,
          boxShadow: "0 4px 24px rgba(17,138,178,0.13)", padding: 8
        }}>
          <AnnouncementList announcements={announcements} />
        </div>
      )}
    </div>
  );
}
