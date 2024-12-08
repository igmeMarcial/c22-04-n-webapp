"use client"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, PawPrint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateBookingForm from "../booking/CreateBookingForm";

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

const CaregiversList = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  if (loading) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];



  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-126px)] p-4">
      {/* Columna izquierda: Lista de cuidadores */}
      <div className="col-span-1 border rounded-lg bg-white shadow p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#222F92]">Lista de cuidadores</h2>
        </div>
        <AnimatePresence>
          {caregivers.map((caregiver) => {
            const isSelected = selectedCaregiver?.id === caregiver.id;
            return (
              <motion.div
                key={caregiver.id}
                className={`p-4 border-b cursor-pointer rounded-lg ${isSelected ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => setSelectedCaregiver(caregiver)}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-lg flex items-center gap-2 text-[#222F92]">
                    <PawPrint className="w-5 h-5 text-blue-500" />
                    {caregiver.user.name} {caregiver.user.last_name}
                  </p>
                  {caregiver.average_rating && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.round(Number(caregiver.average_rating))
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                        ></i>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-[#148E8F] mb-1">A {caregiver.coverage_radius_KM} Kilometros</p>
                <p className="text-sm text-gray-500">{caregiver.total_reviews} Opiniones</p>
                {!caregiver.average_rating && (
                  <p className="text-sm text-gray-500 italic">Sin calificaciones</p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Columna derecha: Detalles del cuidador */}
      <div className="col-span-2 border rounded-lg bg-white shadow p-4">
        {selectedCaregiver ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#222F92]">
              Perfil de {selectedCaregiver.user.name} {selectedCaregiver.user.last_name}
            </h2>

            {/* Información general */}
            <div className="grid grid-cols-[1fr_2fr] gap-6">
              <div>
                <h3 className="text-xl font-semibold pb-2 border-b text-[#222F92]">
                  Información general
                </h3>
                <p>
                  <i className="fas fa-user mr-2 text-blue-500"></i>
                  <strong>Nombre:</strong> {selectedCaregiver.user.name} {selectedCaregiver.user.last_name}
                </p>
                <p>
                  <i className="fas fa-envelope mr-2 text-blue-500"></i>
                  <strong>Email:</strong> {selectedCaregiver.user.email}
                </p>
                <p>
                  <i className="fas fa-phone mr-2 text-blue-500"></i>
                  <strong>Teléfono:</strong> {selectedCaregiver.user.phone || "No especificado"}
                </p>
                <p>
                  <i className="fas fa-align-left mr-2 text-blue-500"></i>
                  <strong>Descripción:</strong> {selectedCaregiver.description || "No disponible"}
                </p>
                <p>
                  <i className="fas fa-briefcase mr-2 text-blue-500"></i>
                  <strong>Experiencia:</strong> {selectedCaregiver.experience || "No especificada"}
                </p>
                <p>
                  <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                  <strong>Distancia (KM):</strong> {selectedCaregiver.coverage_radius_KM}
                </p>
                <p>
                  <i className="fas fa-star-half-alt mr-2 text-yellow-400"></i>
                  <strong>Calificación promedio:</strong>{" "}
                  {selectedCaregiver.average_rating && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.round(Number(selectedCaregiver.average_rating))
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                        ></i>
                      ))}
                    </>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold pb-2 border-b text-[#222F92]">
                  Servicios y tarifas
                </h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                  {selectedCaregiver.rates.map((rate) => (
                    <div key={rate.id} className="p-4 bg-gray-100 rounded-lg shadow">
                      <p className="font-bold text-lg text-[#148E8F]">{rate.service.name}</p>
                      <p className="text-sm text-gray-500">{rate.service.description}</p>
                      <p>
                        <strong>Precio por hora:</strong> ${rate.base_price}
                      </p>
                      <p>
                        <strong>Precio por hora adicional:</strong> ${rate.additional_hour_price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>



            {/* Tabla de disponibilidad */}
            <h3 className="text-xl font-semibold mt-6 mb-4">Horarios disponibles</h3>
            <div className="grid grid-cols-7 gap-4">
              {weekdays.map((day, index) => {
                const slots = selectedCaregiver.availability.filter(
                  (slot) => slot.weekday === index
                );

                return (
                  <div
                    key={index}
                    className="p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center"
                  >
                    <p className="font-bold text-lg mb-2 text-center">{day}</p>
                    {slots.length > 0 ? (
                      slots.map((slot) => (
                        <span
                          key={slot.id}
                          className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-2"
                        >
                          {new Intl.DateTimeFormat("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "UTC", // Asegura que no se convierta a la zona horaria local
                          }).format(new Date(slot.start_time))}{" "}
                          -{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "UTC", // Asegura que no se convierta a la zona horaria local
                          }).format(new Date(slot.end_time))}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Sin horarios</span>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Botón para abrir el modal */}
            <button
              onClick={openModal}
              className="mt-6 px-4 py-2 bg-[#222F92] text-white rounded-lg hover:bg-blue-600"
            >
              Agendar servicio
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Seleccione un cuidador de la lista para ver detalles.</p>
        )}



      </div>
      {/* Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg ">
              <CreateBookingForm caregiver={selectedCaregiver} onClose={closeModal} />
            </div>
          </div>
        )
      }
    </div>

  );
};

export default CaregiversList;
