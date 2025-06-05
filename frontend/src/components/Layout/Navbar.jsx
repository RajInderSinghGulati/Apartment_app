import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="nav-logo">ApartmentApp</span>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/entry-history">Entry History</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
