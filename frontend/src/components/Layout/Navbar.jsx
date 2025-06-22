import React from "react";
import { Link } from "react-router-dom";
import NotificationBell from "../Notifications/NotificationBell"; // Import the bell!

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="nav-logo">ApartmentApp</span>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2em" }}>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/entry-history">Entry History</Link>
        <Link to="/visitors">Visitors</Link>
        <Link to="/maintenance">Maintenance</Link>
        <Link to="/booking">Facilities</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin/login">Admin</Link>
        <NotificationBell /> {/* The notification bell with dropdown */}
      </div>
    </nav>
  );
}
