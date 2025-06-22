import React, { useState } from "react";
import { createUser } from "../api/users"; // Plural path

export default function AddUserForm() {
  const [form, setForm] = useState({ name: "", email: "", phoneNum: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(form);
      setMessage("User added!");
      setForm({ name: "", email: "", phoneNum: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to add user");
    }
  };

  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phoneNum" placeholder="Phone Number" value={form.phoneNum} onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
