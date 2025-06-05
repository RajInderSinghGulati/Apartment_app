import React, { useState } from "react";
import MaintenanceCard from "./MaintenanceCard";
import NewRequestModal from "./NewRequestModal";
import SearchBar from "../Common/SearchBar";

const dummyRequests = [
  {
    id: 1,
    title: "Leaking Kitchen Tap",
    status: "Pending",
    description: "Tap is leaking continuously.",
    image: "https://images.unsplash.com/photo-1503389152951-9c3d0bca6c62?auto=format&fit=crop&w=400&q=80",
    createdAt: "2025-06-04"
  },
  {
    id: 2,
    title: "Broken Elevator",
    status: "In Progress",
    description: "Elevator in Block B not working.",
    image: "",
    createdAt: "2025-06-03"
  },
  {
    id: 3,
    title: "AC Servicing",
    status: "Completed",
    description: "Requested AC cleaning.",
    image: "",
    createdAt: "2025-05-28"
  }
];

export default function MaintenanceList() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = dummyRequests.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", alignItems: "center", marginBottom: "1.5em" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search requests..." />
        <button onClick={() => setOpen(true)}>+ New Request</button>
      </div>
      <NewRequestModal open={open} setOpen={setOpen} />
      <div className="udash-grid">
        {filtered.length === 0 ? (
          <div className="udash-empty" style={{ gridColumn: "1/3" }}>No requests found.</div>
        ) : (
          filtered.map(req => <MaintenanceCard key={req.id} request={req} />)
        )}
      </div>
    </div>
  );
}
