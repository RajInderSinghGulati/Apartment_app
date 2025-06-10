import React, { useEffect, useState } from "react";
import EntryCard from "./EntryCard";
import { fetchVisitors } from "../api/visitors"; // Import your API function

export default function EntryHistoryList() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVisitors()
      .then(res => setEntries(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading entries"));
  }, []);

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {entries.length === 0 && !error ? (
        <div>No entry history available.</div>
      ) : (
        entries.map(entry => (
          <EntryCard key={entry._id} entry={entry} />
        ))
      )}
    </div>
  );
}
