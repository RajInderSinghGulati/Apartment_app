// src/components/Layout/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", background: "#f5f5f5", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/home" style={{ marginRight: "1rem", fontWeight: "bold" }}>ApartmentApp</Link>
        {loggedIn && (
          <>
            <Link to="/profile" style={{ marginRight: "1rem" }}>Profile</Link>
            <Link to="/staff" style={{ marginRight: "1rem" }}>Staff</Link>
            <Link to="/entry-history" style={{ marginRight: "1rem" }}>Entry History</Link>
          </>
        )}
      </div>
      <div>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
