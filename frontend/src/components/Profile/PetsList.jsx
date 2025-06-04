import React from "react";


const pets = [
  { id: 1, name: "Bruno", type: "Dog" }
];

function PetsList() {
  return (
    <div>
      <h3>Pets</h3>
      <ul>
        {pets.map(p => (
          <li key={p.id}>{p.name} ({p.type})</li>
        ))}
      </ul>
      <button>Add Pet</button>
    </div>
  );
}

export default PetsList;
