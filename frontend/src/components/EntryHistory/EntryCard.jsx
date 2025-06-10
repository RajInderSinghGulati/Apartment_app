import React from "react";

export default function EntryCard({ entry }) {
  // Format times if they are ISO strings
  const formatTime = (time) => {
    if (!time) return "—";
    const d = new Date(time);
    return d.toLocaleString();
  };

  return (
    <div className="entry-card">
      <div className="entry-card-title">
        {entry.name}
        <span className="entry-card-type">({entry.type})</span>
      </div>
      {entry.type === "Guest" && entry.purpose && (
        <div className="entry-card-purpose">Purpose: {entry.purpose}</div>
      )}
      <div className="entry-card-time">
        <span>Entry: {formatTime(entry.entryTime)}</span>
        <span>Exit: {formatTime(entry.exitTime)}</span>
      </div>
    </div>
  );
}
