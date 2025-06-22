import React, { useState } from "react";
import { createSociety } from "../api/societies";

export default function AddSocietyForm() {
  const [form, setForm] = useState({ name: "", address: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSociety(form);
      setMessage("Society added!");
      setForm({ name: "", address: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to add society");
    }
  };

  return (
    <div>
      <h3>Add Society</h3>
      <form onSubmit={handleSubmit} style={{ minWidth: 220 }}>
        <input name="name" placeholder="Society Name" value={form.name} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Add Society</button>
      </form>
      {message && <div style={{ color: message === "Society added!" ? "green" : "red", marginTop: 8 }}>{message}</div>}
    </div>
  );
}
