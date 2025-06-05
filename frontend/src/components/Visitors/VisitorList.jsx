import React, { useState } from "react";
import VisitorCard from "./VisitorCard";
import NewVisitorModal from "./NewVisitorModal";
import SearchBar from "../Common/SearchBar";

const dummyVisitors = [
  {
    id: 1,
    name: "Amit Sharma",
    date: "2025-06-07",
    time: "15:00",
    vehicle: "MH12AB1234",
    status: "Upcoming",
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya Singh",
    date: "2025-06-05",
    time: "12:30",
    vehicle: "",
    status: "Visited",
    photo: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

export default function VisitorList() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = dummyVisitors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", alignItems: "center", marginBottom: "1.5em" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search visitors..." />
        <button onClick={() => setOpen(true)}>+ Authorize Visitor</button>
      </div>
      <NewVisitorModal open={open} setOpen={setOpen} />
      <div className="udash-grid">
        {filtered.length === 0 ? (
          <div className="udash-empty" style={{ gridColumn: "1/3" }}>No visitors found.</div>
        ) : (
          filtered.map(visitor => <VisitorCard key={visitor.id} visitor={visitor} />)
        )}
      </div>
    </div>
  );
}
