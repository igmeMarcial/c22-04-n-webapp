"use client";

import { User } from "next-auth";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "../ui/Badge";

interface Booking {
  id: string;
  pet_name: string;
  service_name: string;
  caregiver_name: string;
  start_time: string;
  total_price: number;
  status: number;
  caregiver_image?: string;
}

const BookingStatusList = ({ user }: { user: User }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
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

  const statusLabels: Record<number, string> = {
    0: "Agendado",
    1: "En Progreso",
    2: "Completado",
    3: "Cancelado",
  };
  type StatusStyle = {
    badge: string;
    icon: string;
  };

  const statusStyles: Record<number, StatusStyle> = {
    0: {
      badge: "bg-[#222F92]/10 text-[#222F92] hover:bg-[#222F92]/20",
      icon: "🕒",
    },
    1: {
      badge: "bg-[#148E8F]/10 text-[#148E8F] hover:bg-[#148E8F]/20",
      icon: "🐾",
    },
    2: {
      badge: "bg-green-100 text-green-700 hover:bg-green-200",
      icon: "✅",
    },
    3: {
      badge: "bg-red-100 text-red-700 hover:bg-red-200",
      icon: "❌",
    },
  };

  const groupedBookings = bookings.reduce<Record<number, Booking[]>>(
    (groups, booking) => {
      groups[booking.status] = [...(groups[booking.status] || []), booking];
      return groups;
    },
    {}
  );

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#222F92] mb-8">
          Estado de Reservas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-8 w-32 mb-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-20 w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-[#222F92] mb-8"
      >
        Estado de Reservas
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {Object.keys(statusLabels).map((status: any) => (
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="w-full h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <span>{statusStyles[status].icon}</span>
                    <Badge
                      variant="default"
                      className={statusStyles[status].badge}
                    >
                      {statusLabels[status]}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {groupedBookings[status]?.length > 0 ? (
                      groupedBookings[status].map((booking: Booking) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={booking.caregiver_image}
                                alt={booking.caregiver_name}
                              />
                              <AvatarFallback className="bg-[#222F92]/10 text-[#222F92]">
                                {booking.caregiver_name
                                  ?.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-[#222F92]">
                                {booking.pet_name || "Sin nombre"}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {booking.service_name}
                              </p>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-500">
                                  {format(new Date(booking.start_time), "PPP", {
                                    locale: es,
                                  })}
                                </p>
                                <p className="font-medium text-[#148E8F]">
                                  ${Number(booking.total_price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-500 py-4"
                      >
                        No hay reservas {statusLabels[status].toLowerCase()}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BookingStatusList;
