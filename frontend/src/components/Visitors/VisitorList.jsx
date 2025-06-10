import React, { useState, useEffect } from "react";
import VisitorCard from "./VisitorCard";
import NewVisitorModal from "./NewVisitorModal";
import SearchBar from "../Common/SearchBar";
import { fetchVisitors } from "../api/visitors";

export default function VisitorList() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [error, setError] = useState("");

  // Load visitors from backend
  const loadVisitors = () => {
    fetchVisitors()
      .then(res => setVisitors(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading visitors"));
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  const filtered = visitors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", gap: "1em", alignItems: "center", marginBottom: "1.5em" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search visitors..." />
        <button onClick={() => setOpen(true)}>+ Authorize Visitor</button>
      </div>
      <NewVisitorModal open={open} setOpen={setOpen} onVisitorCreated={loadVisitors} />
      <div className="udash-grid">
        {error && (
          <div className="udash-empty" style={{ gridColumn: "1/3", color: "red" }}>{error}</div>
        )}
        {filtered.length === 0 && !error ? (
          <div className="udash-empty" style={{ gridColumn: "1/3" }}>No visitors found.</div>
        ) : (
          filtered.map(visitor => <VisitorCard key={visitor._id} visitor={visitor} />)
        )}
      </div>
    </div>
  );
}
