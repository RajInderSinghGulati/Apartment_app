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

    // Prepare payload for your API (adjust keys as needed by your backend)
    const payload = {
      name: form.apartmentName, // or use a separate 'name' field if needed
      houseNumber: "684864962c7f80709b2c2e28",
      email: form.email,
      phoneNum: form.phone,
      password: form.password,
    };

    try {
      const response = await fetch("/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok) {

        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
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
