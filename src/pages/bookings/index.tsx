import React from "react";
import BookingsList from "@/components/booking/BookingsList";
import BookingForm from "@/components/booking/CreateBookingForm";

const Register: React.FC = () => {
  return (
    <div>
      <h1
      style={{ backgroundColor: "lightblue" }}
      >Booking Page</h1>
      <BookingForm />
      <BookingsList />

    </div>
  );
};

export default Register;
