import React from "react";
import BookingsList from "../components/BookingsList";
import CreateBookingForm from "../components/CreateBookingForm";

const BookingPage: React.FC = () => {
  return (
    <div>
      <h1>Booking Page</h1>
      <CreateBookingForm />
      <BookingsList />
    </div>
  );
};

export default BookingPage;
