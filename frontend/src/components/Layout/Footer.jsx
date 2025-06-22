import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      &copy; {new Date().getFullYear()} ApartmentApp. All rights reserved.
    </footer>
  );
}
