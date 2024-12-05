"use client";

import { useEffect, useState } from "react";

const BookingStatusList = () => {
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
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const statusLabels = {
    0: "Agendado",
    1: "Activo",
    2: "Completado",
    3: "Cancelado",
  };

  const statusColors = {
    0: "bg-blue-100 text-blue-600",
    1: "bg-green-100 text-green-600",
    2: "bg-gray-100 text-gray-600",
    3: "bg-red-100 text-red-600",
  };

  const groupedBookings = bookings.reduce((groups, booking) => {
    groups[booking.status] = [...(groups[booking.status] || []), booking];
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando reservas...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Estado de Reservas</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {Object.keys(statusLabels).map((status) => (
          <div
            key={status}
            className="w-full md:w-1/2 lg:w-[55%] xl:w-[40%] bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            <h2
              className={`text-lg font-semibold mb-4 text-center ${statusColors[status]}`}
            >
              {statusLabels[status]}
            </h2>
            <div className="space-y-4">
              {groupedBookings[status]?.length > 0 ? (
                groupedBookings[status].map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm"
                  >
                    <p className="text-sm font-medium truncate">
                      {booking.pet_name || "Sin nombre"} &mdash; {booking.service_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.start_time).toLocaleDateString("es-ES")} - $
                      {Number(booking.total_price).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No hay reservas</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusList;
