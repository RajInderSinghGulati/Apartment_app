import React from "react";
import StaffProfileCard from "./StaffProfileCard";
import HireStaffModal from "./HireStaffModal";
import "../../styles/staff.css";

// Dummy staff data
const staff = [
  { id: 1, name: "Ramesh", role: "Security" },
  { id: 2, name: "Sunita", role: "Cleaner" }
];

function StaffList() {
  return (
    <div>
      <HireStaffModal />
      <div>
        {staff.map(s => (
          <StaffProfileCard key={s.id} staff={s} />
        ))}
      </div>
    </div>
  );
}

export default StaffList;
