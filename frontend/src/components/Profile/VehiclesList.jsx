import React from "react";
import "../../styles/profile.css";


const vehicles = [
  { id: 1, type: "Car", number: "MH12AB1234" }
];

function VehiclesList() {
  return (
    <div>
      <h3>Vehicles</h3>
      <ul>
        {vehicles.map(v => (
          <li key={v.id}>{v.type}: {v.number}</li>
        ))}
      </ul>
      <button>Add Vehicle</button>
    </div>
  );
}

export default VehiclesList;
