import React, { useState, useEffect } from "react";
import "../../App.css";
import { fetchUserById, updateUser } from "../../api/users"; // Import your API utilities

export default function UserDashboard() {
  const userId = "current"; // Replace with logic to get current user ID (e.g., from JWT or context)
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load user data from backend
  useEffect(() => {
    setLoading(true);
    fetchUserById(userId)
      .then(res => {
        setUser(res.data);
        setEditForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          avatar: res.data.avatar || "",
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || "Failed to load user");
        setLoading(false);
      });
  }, [userId]);

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setEditForm({ ...editForm, avatar: URL.createObjectURL(file) });
    }
  };

  // Handle profile edit form change
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Handle profile save
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("email", editForm.email);
      formData.append("phone", editForm.phone);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await updateUser(user._id, formData);
      setUser(res.data);
      setEditOpen(false);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return null;

  return (
    <div className="udash-bg">
      <div className="udash-container">
        {/* Profile Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
          <img
            src={user.avatar}
            alt="Avatar"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              marginRight: 22,
              border: "3px solid var(--accent)",
              boxShadow: "0 2px 8px var(--accent-light)"
            }}
          />
          <div>
            <h1 className="udash-title">Welcome, {user.name}!</h1>
            <p className="udash-email">{user.email}</p>
            <div style={{ color: "var(--primary)", fontWeight: 600 }}>{user.phone}</div>
          </div>
          <button style={{ marginLeft: "auto" }} onClick={() => setEditOpen(true)}>
            Edit Profile
          </button>
        </div>

        {/* Apartment Details */}
        <div className="udash-section-title">Apartment Details</div>
        <div className="udash-apartment">
          <span><b>Block:</b> {user.apartment?.block}</span>
          <span><b>Number:</b> {user.apartment?.number}</span>
          <span><b>Address:</b> {user.apartment?.address}</span>
        </div>

        {/* Main Info Cards */}
        <div className="udash-grid">
          {/* House Members */}
          <div className="udash-card">
            <h3>House Members</h3>
            <ul>
              {user.houseMembers?.length === 0 ? (
                <li className="udash-empty">No members</li>
              ) : (
                user.houseMembers?.map((m, i) => (
                  <li key={i}>
                    {m.name} <span className="udash-label">({m.relation})</span>
                    {m.age && <span className="udash-age">{m.age} yrs</span>}
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* House Helpers */}
          <div className="udash-card">
            <h3>House Helpers</h3>
            <ul>
              {user.houseHelpers?.length === 0 ? (
                <li className="udash-empty">No helpers added</li>
              ) : (
                user.houseHelpers?.map((h, i) => (
                  <li key={i}>
                    {h.name} <span className="udash-label">{h.role}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* Pets */}
          <div className="udash-card">
            <h3>Pets</h3>
            <ul>
              {user.pets?.length === 0 ? (
                <li className="udash-empty">No pets</li>
              ) : (
                user.pets?.map((p, i) => (
                  <li key={i}>
                    {p.name} <span className="udash-label">{p.type}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* Vehicles */}
          <div className="udash-card">
            <h3>Vehicles</h3>
            <ul>
              {user.vehicles?.length === 0 ? (
                <li className="udash-empty">No vehicles</li>
              ) : (
                user.vehicles?.map((v, i) => (
                  <li key={i}>
                    {v.model} <span className="udash-label">({v.type})</span>
                    <span className="udash-age">{v.number}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {editOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="udash-section-title">Edit Profile</h3>
              <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                <div style={{ marginBottom: 16, textAlign: "center" }}>
                  <img
                    src={editForm.avatar}
                    alt="Avatar preview"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      marginBottom: 8,
                      border: "2px solid var(--accent)"
                    }}
                  />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ marginTop: 8 }} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  required
                />
                {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
                <div style={{ marginTop: "1.2em", display: "flex", gap: "1em" }}>
                  <button type="button" onClick={() => setEditOpen(false)}>Cancel</button>
                  <button type="submit" style={{ background: "var(--primary)" }} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
