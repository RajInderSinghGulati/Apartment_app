import React from "react";
import "../../styles/profile.css";


const members = [
  { id: 1, name: "John Doe", relation: "Self" },
  { id: 2, name: "Jane Doe", relation: "Spouse" },
  { id: 3, name: "Jimmy Doe", relation: "Child" }
];

function HouseMembersList() {
  return (
    <div>
      <h3>House Members</h3>
      <ul>
        {members.map(m => (
          <li key={m.id}>{m.name} ({m.relation})</li>
        ))}
      </ul>
      <button>Add Member</button>
    </div>
  );
}

export default HouseMembersList;
