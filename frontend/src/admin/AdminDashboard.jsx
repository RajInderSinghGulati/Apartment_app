import React from "react";
import AddUserForm from "./AddUserForm";
import AddHouseForm from "./AddHouseForm";
import AddSocietyForm from "./AddSocietyForm";

export default function AdminDashboard() {
  // Optionally, check localStorage for "admin" to protect this page
  if (localStorage.getItem("admin") !== "true") {
    window.location.href = "/admin/login";
    return null;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <AddUserForm />
      <AddHouseForm />
      <AddSocietyForm />
    </div>
  );
}
