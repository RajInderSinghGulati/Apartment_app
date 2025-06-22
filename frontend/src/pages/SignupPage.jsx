import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../api/users"; // Plural path

export default function SignupPage() {
  const [form, setForm] = useState({
    apartmentName: "",
    houseNumber: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const payload = {
      name: form.apartmentName,
      houseNumber: form.houseNumber, // Use the value from the input
      email: form.email,
      phoneNum: form.phone,
      password: form.password,
    };
    try {
      await signupUser(payload);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
    setLoading(false);
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {message && <div style={{ marginTop: 10, color: message.includes("successful") ? "green" : "red" }}>{message}</div>}
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
