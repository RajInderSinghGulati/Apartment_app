import React from "react";
import "../../styles/UserDashboard.css";

// Example user data (replace with fetched data)
const user = {
  name: "Raj Inder",
  email: "raj@example.com",
  apartment: {
    number: "B-304",
    block: "B",
    address: "Sunrise Residency, 123 Main Street, Mumbai",
  },
  houseMembers: [
    { name: "Rajesh Verma", relation: "Father", age: 50 },
    { name: "Sunita Verma", relation: "Mother", age: 48 },
    { name: "Aditi Verma", relation: "Self", age: 22 },
  ],
  houseHelpers: [
    { name: "Sita", role: "Maid" },
    { name: "Ramu", role: "Cook" },
  ],
  pets: [
    { name: "Bruno", type: "Dog" },
  ],
  vehicles: [
    { type: "Car", number: "MH12AB1234", model: "Hyundai i20" },
    { type: "Scooter", number: "MH12XY5678", model: "Honda Activa" },
  ],
};

export default function UserDashboard() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h1 className="udash-title">Welcome, {user.name}!</h1>
        <p className="udash-email">{user.email}</p>
        <div className="udash-section">
          <h2 className="udash-section-title">Apartment Details</h2>
          <div className="udash-apartment">
            <span><b>Block:</b> {user.apartment.block}</span>
            <span><b>Number:</b> {user.apartment.number}</span>
            <span><b>Address:</b> {user.apartment.address}</span>
          </div>
        </div>
        <div className="udash-grid">
          <div className="udash-card">
            <h3>House Members</h3>
            <ul>
              {user.houseMembers.map((m, i) => (
                <li key={i}>
                  {m.name} <span className="udash-label">({m.relation})</span>
                  <span className="udash-age">{m.age} yrs</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="udash-card">
            <h3>House Helpers</h3>
            <ul>
              {user.houseHelpers.length === 0 ? (
                <li className="udash-empty">No helpers added</li>
              ) : (
                user.houseHelpers.map((h, i) => (
                  <li key={i}>
                    {h.name} <span className="udash-label">{h.role}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="udash-card">
            <h3>Pets</h3>
            <ul>
              {user.pets.length === 0 ? (
                <li className="udash-empty">No pets</li>
              ) : (
                user.pets.map((p, i) => (
                  <li key={i}>
                    {p.name} <span className="udash-label">{p.type}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="udash-card">
            <h3>Vehicles</h3>
            <ul>
              {user.vehicles.length === 0 ? (
                <li className="udash-empty">No vehicles</li>
              ) : (
                user.vehicles.map((v, i) => (
                  <li key={i}>
                    {v.model} <span className="udash-label">({v.type})</span>
                    <span className="udash-age">{v.number}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
