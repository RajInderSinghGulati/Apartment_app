import React from "react";
import HouseMembersList from "../components/Profile/HouseMembersList";
import PetsList from "../components/Profile/PetsList";
import VehiclesList from "../components/Profile/VehiclesList";
import HelpersList from "../components/Profile/HelpersList";

function ProfilePage() {
  // Dummy data
  const house = {
    apartmentName: "Sunshine Residency",
    houseNumber: "A-101",
    email: "john@example.com",
    phone: "9876543210"
  };

  return (
    <div className="centered-container">
      <h2>My Profile</h2>
      <div>
        <div><b>Apartment:</b> {house.apartmentName}</div>
        <div><b>House Number:</b> {house.houseNumber}</div>
        <div><b>Email:</b> {house.email}</div>
        <div><b>Phone:</b> {house.phone}</div>
      </div>
      <hr />
      <HouseMembersList />
      <PetsList />
      <VehiclesList />
      <HelpersList />
    </div>
  );
}

export default ProfilePage;
