import React, { useState } from "react";
import { createHouse } from "../api/houses";

export default function AddHouseForm() {
  const [form, setForm] = useState({ block: "", number: "", society: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHouse(form);
      setMessage("House added!");
      setForm({ block: "", number: "", society: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to add house");
    }
  };

  return (
    <div>
      <h3>Add House</h3>
      <form onSubmit={handleSubmit} style={{ minWidth: 220 }}>
        <input name="block" placeholder="Block" value={form.block} onChange={handleChange} required />
        <input name="number" placeholder="House Number" value={form.number} onChange={handleChange} required />
        <input name="society" placeholder="Society ID" value={form.society} onChange={handleChange} required />
        <button type="submit">Add House</button>
      </form>
      {message && <div style={{ color: message === "House added!" ? "green" : "red", marginTop: 8 }}>{message}</div>}
    </div>
  );
}
