import React from "react";


function EntryCard({ entry }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "6px", margin: "0.5rem 0", padding: "1rem" }}>
      <div><b>{entry.name}</b> ({entry.type})</div>
      {entry.type === "Guest" && <div>Purpose: {entry.purpose}</div>}
      <div>Entry: {entry.entryTime}</div>
      <div>Exit: {entry.exitTime}</div>
    </div>
  );
}

export default EntryCard;
