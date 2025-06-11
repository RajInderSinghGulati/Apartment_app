import React, { useState, useEffect } from "react";
import MaintenanceCard from "./MaintenanceCard";
import NewRequestModal from "./NewRequestModal";
import SearchBar from "../Common/SearchBar";
import { fetchMaintenances } from "../../api/maintenance"; // Import your API function

export default function MaintenanceList() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  // Fetch maintenance requests from backend
  const loadRequests = () => {
    fetchMaintenances()
      .then(res => setRequests(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading requests"));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filtered = requests.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", alignItems: "center", marginBottom: "1.5em" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search requests..." />
        <button onClick={() => setOpen(true)}>+ New Request</button>
      </div>
      <NewRequestModal open={open} setOpen={setOpen} onRequestCreated={loadRequests} />
      <div className="udash-grid">
        {error && <div className="udash-empty" style={{ gridColumn: "1/3", color: "red" }}>{error}</div>}
        {filtered.length === 0 && !error ? (
          <div className="udash-empty" style={{ gridColumn: "1/3" }}>No requests found.</div>
        ) : (
          filtered.map(req => <MaintenanceCard key={req._id} request={req} />)
        )}
      </div>
    </div>
  );
}
