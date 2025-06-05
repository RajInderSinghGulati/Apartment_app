import React from "react";
import FacilityCalendar from "../components/Booking/FacilityCalendar";
import BookingList from "../components/Booking/BookingList";

export default function FacilityBookingPage() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h2 className="udash-title">Facility & Event Booking</h2>
        <hr className="section-divider" />
        <FacilityCalendar />
        <hr className="section-divider" />
        <BookingList />
      </div>
    </div>
  );
}
