import React, { useEffect, useState } from "react";
import StaffProfileCard from "./StaffProfileCard";
import HireStaffModal from "./HireStaffModal";
import { fetchStaff } from "../../api/staff";

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState("");

  const loadStaff = () => {
    fetchStaff()
      .then(res => setStaff(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading staff"));
  };

  useEffect(() => {
    loadStaff();
  }, []);

  return (
    <div>
      <HireStaffModal onStaffHired={loadStaff} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {staff.length === 0 && !error ? (
        <div>No staff found.</div>
      ) : (
        staff.map(s => (
          <StaffProfileCard key={s._id} staff={s} />
        ))
      )}
    </div>
  );
}
