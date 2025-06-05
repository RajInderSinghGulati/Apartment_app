import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import StaffPage from "./pages/StaffPage";
import EntryHistoryPage from "./pages/EntryHistoryPage";
import VisitorsPage from "./pages/VisitorsPage";
import MaintenancePage from "./pages/MaintenancePage";
import FacilityBookingPage from "./pages/FacilityBookingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/entry-history" element={<EntryHistoryPage />} />
          <Route path="/visitors" element={<VisitorsPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/booking" element={<FacilityBookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
