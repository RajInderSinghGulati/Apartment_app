import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({
    apartmentName: "",
    houseNumber: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token");
    navigate("/home");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="auth-form">
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="auth-link" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
