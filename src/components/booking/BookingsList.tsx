"use client";

import { useEffect, useState } from "react";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Bookings List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Owner</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Caregiver</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Pet</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Service</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Start Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">End Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Total Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-800 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-200">
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{booking.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{booking.owner_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{booking.caregiver_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{booking.pet_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">{booking.service_name || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {new Date(booking.start_time).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {new Date(booking.end_time).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {`$${Number(booking.total_price).toFixed(2)}`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700">
                    {booking.status === 1 ? "Active" : "Completed"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border border-gray-300 px-4 py-2 text-center text-gray-700">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsList;
