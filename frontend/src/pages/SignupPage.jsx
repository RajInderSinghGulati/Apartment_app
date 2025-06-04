// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const [form, setForm] = useState({
    apartmentName: "",
    houseNumber: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Dummy signup (replace with real API call)
    if (form.email && form.password && form.apartmentName && form.houseNumber && form.phone) {
      localStorage.setItem("token", "dummy-token");
      navigate("/home");
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <div className="centered-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="form">
        <input
          type="text"
          name="apartmentName"
          placeholder="Apartment Name"
          value={form.apartmentName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="houseNumber"
          placeholder="House Number"
          value={form.houseNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default SignupPage;
