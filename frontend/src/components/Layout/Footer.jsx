// src/components/Layout/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer style={{ background: "#f5f5f5", padding: "1rem", textAlign: "center" }}>
      <small>&copy; {new Date().getFullYear()} ApartmentApp. All rights reserved.</small>
    </footer>
  );
}

export default Footer;
