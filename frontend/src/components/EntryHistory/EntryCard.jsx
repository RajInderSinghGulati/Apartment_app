import React from "react";

export default function EntryCard({ entry }) {
  return (
    <div className="entry-card">
      <div className="entry-card-title">
        {entry.name}
        <span className="entry-card-type">({entry.type})</span>
      </div>
      {entry.type === "Guest" && (
        <div className="entry-card-purpose">Purpose: {entry.purpose}</div>
      )}
      <div className="entry-card-time">
        <span>Entry: {entry.entryTime}</span>
        <span>Exit: {entry.exitTime}</span>
      </div>
    </div>
  );
}
