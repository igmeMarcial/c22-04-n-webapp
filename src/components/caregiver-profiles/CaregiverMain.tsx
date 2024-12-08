"use client";
import {
  actualizarEstadoReserva,
  obtenerPerfilCuidador,
  obtenerReservasCuidador,
  obtenerReseñasCuidador,
  obtenerServiciosCuidador,
} from "@/actions/caregiver-actions";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Star, Clock, MapPin, CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../ui/Badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type Service = {
  id: number;
  description: string | null;
  name: string;
  min_duration: number;
  max_duration: number;
  images: any; // Usar el tipo adecuado para JSON
};

type CaregiverRate = {
  id: number;
  caregiverId: number;
  serviceId: number;
  base_price: number;
  additional_hour_price: number;
  service: Service;
};

type CaregiverProfile = {
  id: number;
  userId: string;
  experience: string | null;
  description: string | null;
  coverage_radius_KM: number;
  verified: number;
  verification_date: string | null;
  average_rating: number;
  total_reviews: number;
  rates: CaregiverRate[];
  availability: Array<{
    weekday: number;
    start_time: string;
    end_time: string;
  }>;
};

function CaregiverMain() {
  const [profile, setProfile] = useState<CaregiverProfile | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const profileData = await obtenerPerfilCuidador();
        setProfile(profileData);

        const bookingsData = await obtenerReservasCuidador();
        setBookings(bookingsData);

        const reviewsData = await obtenerReseñasCuidador();
        setReviews(reviewsData);

        const servicesData = await obtenerServiciosCuidador();
        setServices(servicesData);
      } catch (error) {
        toast.error("Erro al cargar los datos" + error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleUpdateStatus = async (bookingId: number, newStatus: number) => {
    try {
      // Call the action to update the status
      const updatedBooking = await actualizarEstadoReserva(
        bookingId,
        newStatus
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === updatedBooking.id ? updatedBooking : booking
        )
      );

      toast.success("Reserva aceptada!");
    } catch (error) {
      toast.error(
        "Hubo un error al actualizar el estado de la reserva" + error
      );
    }
  };

  const getStatusBadge = (status: number) => {
    const statusStyles: Record<number, { bg: string; label: string }> = {
      0: { bg: "bg-yellow-100 text-yellow-800", label: "Programada" },
      1: { bg: "bg-green-100 text-green-800", label: "Activa" },
      2: { bg: "bg-blue-100 text-blue-800", label: "Completada" },
      3: { bg: "bg-red-100 text-red-800", label: "Cancelada" },
    };

    return (
      statusStyles[status] || {
        bg: "bg-gray-100 text-gray-800",
        label: "Desconocida",
      }
    );
  };
  console.log(profile);
  console.log(bookings);
  console.log(reviews);
  console.log(services);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          />
          <p className="mt-4 text-gray-600">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          {/* Header */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-[#222F92] to-[#148E8F]">
            <CardHeader className="text-white">
              <CardTitle className="text-3xl">
                Dashboard de Cuidador Pet Care
              </CardTitle>
              <CardDescription className="text-gray-100">
                Gestiona tus servicios y reservas de cuidado de mascotas
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="perfil">Perfil</TabsTrigger>
              <TabsTrigger value="reservas">Reservas</TabsTrigger>
              <TabsTrigger value="resenas">Reseñas</TabsTrigger>
              <TabsTrigger value="servicios">Servicios</TabsTrigger>
            </TabsList>

            <TabsContent value="perfil">
              <motion.div
                variants={itemVariants}
                className="grid gap-6 md:grid-cols-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="text-[#222F92]" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        {profile?.description ?? "Sin descripción"}
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="text-[#148E8F]" />
                        <span>
                          Radio de cobertura: {profile?.coverage_radius_KM} km
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="text-[#222F92]" />
                        <span>
                          Valoración: {profile?.average_rating} (
                          {profile?.total_reviews} reseñas)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="reservas">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2"
              >
                {bookings.map((booking) => (
                  <motion.div key={booking.id} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Reserva #{booking.id}
                          </CardTitle>
                          <Badge
                            variant="default"
                            className={getStatusBadge(booking.status).bg}
                          >
                            {getStatusBadge(booking.status).label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <div className="bg-[#222F92] text-white w-full h-full flex items-center justify-center">
                                {booking.owner.name.charAt(0)}
                              </div>
                            </Avatar>
                            <span>{booking.owner.name}</span>
                          </div>
                          {booking.status === 0 && (
                            <Button
                              onClick={() => handleUpdateStatus(booking.id, 1)}
                              className="w-full bg-[#148E8F] hover:bg-[#0F6A6B]"
                            >
                              Aceptar Reserva
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="resenas">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2"
              >
                {reviews.map((review) => (
                  <motion.div key={review.id} variants={itemVariants}>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="h-8 w-8">
                            <div className="bg-[#222F92] text-white w-full h-full flex items-center justify-center">
                              {review.booking.owner.name.charAt(0)}
                            </div>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {review.booking.owner.name}
                            </p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="servicios">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {services.map((service) => (
                  <motion.div key={service.serviceId} variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {service.service.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Clock className="text-[#148E8F]" />
                            <span>
                              Precio base: S/. {service.base_price}/hora
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="text-[#222F92]" />
                            <span>
                              Hora adicional: S/.{" "}
                              {service.additional_hour_price}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

export default CaregiverMain;
