import React from "react";
import EntryCard from "./EntryCard";

// Dummy entry data
const entries = [
  { id: 1, name: "Amit", type: "Guest", purpose: "Birthday Party", entryTime: "10:00 AM", exitTime: "1:00 PM" },
  { id: 2, name: "Ramesh", type: "Staff", entryTime: "9:00 AM", exitTime: "5:00 PM" }
];

function EntryHistoryList() {
  return (
    <div>
      {entries.map(entry => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default EntryHistoryList;
