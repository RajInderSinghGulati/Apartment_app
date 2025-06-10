import React, { useEffect, useState } from "react";
import { fetchPets } from "../api/pets";

function PetsList() {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPets()
      .then(res => setPets(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading pets"));
  }, []);

  return (
    <div>
      <h3>Pets</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {pets.length === 0 && !error ? (
          <li>No pets found.</li>
        ) : (
          pets.map(p => (
            <li key={p._id}>{p.name} ({p.type})</li>
          ))
        )}
      </ul>
      <button>Add Pet</button>
    </div>
  );
}

export default PetsList;
