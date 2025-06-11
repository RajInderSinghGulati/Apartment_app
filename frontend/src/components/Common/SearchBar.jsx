import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { searchUsers } from "../../api/users";

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (val) => {
    setQuery(val);
    if (val.trim()) {
      searchUsers(val)
        .then(res => setResults(res.data))
        .catch(() => setResults([]));
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <SearchBar value={query} onChange={handleSearch} placeholder="Search users..." />
      {/* Render results */}
    </div>
  );
}
