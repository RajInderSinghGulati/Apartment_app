// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import StaffPage from "./pages/StaffPage";
import EntryHistoryPage from "./pages/EntryHistoryPage";

// Example: Simple authentication context (replace with real logic later)
const isAuthenticated = () => true;


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={isAuthenticated() ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/staff" element={isAuthenticated() ? <StaffPage /> : <Navigate to="/login" />} />
          <Route path="/entry-history" element={isAuthenticated() ? <EntryHistoryPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
