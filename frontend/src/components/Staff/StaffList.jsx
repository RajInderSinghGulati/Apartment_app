import React from "react";
import StaffProfileCard from "./StaffProfileCard";
import HireStaffModal from "./HireStaffModal";

const staff = [
  { id: 1, name: "Ramesh", role: "Security" },
  { id: 2, name: "Sunita", role: "Cleaner" }
];

export default function StaffList() {
  return (
    <div>
      <HireStaffModal />
      {staff.map(s => (
        <StaffProfileCard key={s.id} staff={s} />
      ))}
    </div>
  );
}
