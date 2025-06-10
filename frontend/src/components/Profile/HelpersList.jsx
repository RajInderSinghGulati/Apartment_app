import React, { useEffect, useState } from "react";
import { fetchStaff } from "../api/staff"; // Import your API function

function HelpersList() {
  const [helpers, setHelpers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaff()
      .then(res => setHelpers(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading helpers"));
  }, []);

  return (
    <div>
      <h3>House Helpers</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {helpers.length === 0 && !error ? (
          <li>No helpers found.</li>
        ) : (
          helpers.map(h => (
            <li key={h._id}>{h.name} ({h.role})</li>
          ))
        )}
      </ul>
      <button>Add Helper</button>
    </div>
  );
}

export default HelpersList;
