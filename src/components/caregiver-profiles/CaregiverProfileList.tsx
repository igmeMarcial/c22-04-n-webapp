"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import CreateBookingForm from "../booking/CreateBookingForm";
import { User } from "../../../types/types";

import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, MapPin, Star, Mail, Phone, Briefcase } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/Badge";
import { Separator } from "@radix-ui/react-select";
interface Caregiver {
  id: number;
  userId: string;
  experience: string | null;
  description: string;
  coverage_radius_KM: number;
  verified: number;
  verification_date: string | null;
  average_rating: string | null;
  total_reviews: number;
  user: {
    id: string;
    email: string;
    emailVerified: string | null;
    password: string;
    name: string;
    last_name: string;
    phone: string | null;
    address: string | null;
    latitude: string | null;
    longitude: string | null;
    last_login: string | null;
    role: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: string | null;
  };
  availability: Array<{
    id: number;
    caregiverId: number;
    weekday: number;
    start_time: string;
    end_time: string;
  }>;
  rates: Array<{
    id: number;
    caregiverId: number;
    serviceId: number;
    base_price: string;
    additional_hour_price: string;
    service: {
      id: number;
      name: string;
      description: string;
      min_duration: number;
      max_duration: number;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

interface CaregiverListProps {
  user: User;
}
const CaregiversList: React.FC<CaregiverListProps> = ({ user }) => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await fetch("/api/caregiver-profiles");
        if (!response.ok) {
          throw new Error("Error fetching caregiver profiles");
        }
        const data: Caregiver[] = await response.json();
        setCaregivers(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  const weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-md mt-8">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Lista de cuidadores */}
        <Card className="md:col-span-1 h-[calc(100vh-2rem)] overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#222F92] to-[#148E8F]">
            <CardTitle className="text-white">Cuidadores Pet Care</CardTitle>
            <CardDescription className="text-gray-100">
              Encuentra el cuidador perfecto para tu mascota
            </CardDescription>
          </CardHeader>
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            <AnimatePresence>
              {caregivers.map((caregiver) => (
                <motion.div
                  key={caregiver.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border-b cursor-pointer"
                  onClick={() => setSelectedCaregiver(caregiver)}
                >
                  <Card
                    className={`transition-all ${
                      selectedCaregiver?.id === caregiver.id
                        ? "border-[#222F92] shadow-lg"
                        : "hover:border-[#148E8F]"
                    }`}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <PawPrint className="text-[#222F92]" />
                        <div>
                          <h3 className="font-semibold">
                            {caregiver.user.name} {caregiver.user.last_name}
                          </h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i <
                                  Math.round(Number(caregiver.average_rating))
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="text-sm text-gray-500">
                              ({caregiver.total_reviews})
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-[#148E8F]/10 text-[#148E8F]"
                      >
                        <MapPin size={14} className="mr-1" />
                        {caregiver.coverage_radius_KM} km de cobertura
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Detalles del cuidador */}
        <Card className="md:col-span-2 h-[calc(100vh-2rem)] overflow-y-auto">
          {selectedCaregiver ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="border-b">
                <CardTitle className="text-[#222F92] flex items-center gap-2">
                  <PawPrint />
                  {selectedCaregiver.user.name}{" "}
                  {selectedCaregiver.user.last_name}
                </CardTitle>
                <CardDescription>
                  Cuidador profesional de mascotas
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="services">Servicios</TabsTrigger>
                    <TabsTrigger value="schedule">Horarios</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="text-[#222F92]" />
                        <span>{selectedCaregiver.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="text-[#222F92]" />
                        <span>
                          {selectedCaregiver.user.phone ?? "No especificado"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="text-[#222F92]" />
                        <span>
                          {selectedCaregiver.experience ??
                            "Experiencia no especificada"}
                        </span>
                      </div>
                      <Separator />
                      <p className="text-gray-700">
                        {selectedCaregiver.description}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="services">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCaregiver.rates.map((rate) => (
                        <Card key={rate.id}>
                          <CardHeader>
                            <CardTitle className="text-[#148E8F]">
                              {rate.service.name}
                            </CardTitle>
                            <CardDescription>
                              {rate.service.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="flex justify-between">
                                <span>Precio base:</span>
                                <Badge variant="default">
                                  ${rate.base_price}
                                </Badge>
                              </p>
                              <p className="flex justify-between">
                                <span>Hora adicional:</span>
                                <Badge variant="default">
                                  ${rate.additional_hour_price}
                                </Badge>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                      {weekdays.map((day, index) => {
                        const slots = selectedCaregiver.availability.filter(
                          (slot) => slot.weekday === index
                        );

                        return (
                          <Card key={index}>
                            <CardHeader>
                              <CardTitle className="text-sm font-medium">
                                {day}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {slots.length > 0 ? (
                                  slots.map((slot) => (
                                    <Badge
                                      key={slot.id}
                                      variant="default"
                                      className="block text-center"
                                    >
                                      {new Intl.DateTimeFormat("es", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                        timeZone: "UTC",
                                      }).format(new Date(slot.start_time))}
                                    </Badge>
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-500 text-center">
                                    No disponible
                                  </p>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end">
                  <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                      <Button className="bg-[#222F92] hover:bg-[#222F92]/90">
                        Agendar servicio
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg">
                      <SheetHeader>
                        <SheetTitle>
                          Agendar servicio con {selectedCaregiver.user.name}
                        </SheetTitle>
                      </SheetHeader>
                      <CreateBookingForm
                        caregiver={selectedCaregiver}
                        onClose={() => setIsSheetOpen(false)}
                        user={user}
                      />
                    </SheetContent>
                  </Sheet>
                </div>
              </CardContent>
            </motion.div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <PawPrint size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  Selecciona un cuidador para ver sus detalles
                </p>
              </CardContent>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default CaregiversList;
