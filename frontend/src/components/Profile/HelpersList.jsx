import React from "react";


const helpers = [
  { id: 1, name: "Sita", role: "Maid" }
];

function HelpersList() {
  return (
    <div>
      <h3>House Helpers</h3>
      <ul>
        {helpers.map(h => (
          <li key={h.id}>{h.name} ({h.role})</li>
        ))}
      </ul>
      <button>Add Helper</button>
    </div>
  );
}

export default HelpersList;
