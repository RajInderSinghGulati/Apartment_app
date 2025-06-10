import React, { useEffect, useState } from "react";
import { fetchVehicles } from "../api/vehicles";

function VehiclesList() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVehicles()
      .then(res => setVehicles(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading vehicles"));
  }, []);

  return (
    <div>
      <h3>Vehicles</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {vehicles.length === 0 && !error ? (
          <li>No vehicles found.</li>
        ) : (
          vehicles.map(v => (
            <li key={v._id}>{v.type}: {v.number}</li>
          ))
        )}
      </ul>
      <button>Add Vehicle</button>
    </div>
  );
}

export default VehiclesList;
