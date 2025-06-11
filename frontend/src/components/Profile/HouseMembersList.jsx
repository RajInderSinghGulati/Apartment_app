import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/users"; // Adjust if you have a more specific API

function HouseMembersList({ houseId }) {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // If your backend has an endpoint for house members, use it instead
    // For example: fetchHouseMembers(houseId)
    fetchUsers()
      .then(res => {
        // Filter users by houseId if needed
        const filtered = houseId
          ? res.data.filter(u => u.house === houseId)
          : res.data;
        setMembers(filtered);
      })
      .catch(err => setError(err.response?.data?.error || "Error loading members"));
  }, [houseId]);

  return (
    <div>
      <h3>House Members</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {members.length === 0 && !error ? (
          <li>No members found.</li>
        ) : (
          members.map(m => (
            <li key={m._id}>{m.name} ({m.relation || "Member"})</li>
          ))
        )}
      </ul>
      <button>Add Member</button>
    </div>
  );
}

export default HouseMembersList;
