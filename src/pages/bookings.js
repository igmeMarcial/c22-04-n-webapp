
import BookingsList from "../components/BookingsList";
import CreateBookingForm from "../components/CreateBookingForm";

export default function BookingPage() {
  return (
    <div>
      <h1>Booking Page</h1>
      <CreateBookingForm />
      <BookingsList />
    </div>
  );
}
