import { useEffect, useState } from "react";

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
        <h2 className="text-2xl font-bold mb-4">Lista de cuidadores</h2>
        {caregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedCaregiver(caregiver)}
          >
            <p className="font-semibold">{caregiver.user.name} {caregiver.user.last_name}</p>
            <p className="text-sm text-gray-500">{caregiver.user.email}</p>
          </div>
        ))}
      </div>

      {/* Columna derecha: Detalles del cuidador */}
      <div className="col-span-2 border rounded-lg bg-white shadow p-4">
        {selectedCaregiver ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Detalles del cuidador</h2>
            <h3 className="text-xl font-semibold pb-2 border-b">Información general</h3>
            <p><strong>Nombre:</strong> {selectedCaregiver.user.name} {selectedCaregiver.user.last_name}</p>
            <p><strong>Email:</strong> {selectedCaregiver.user.email}</p>
            <p><strong>Teléfono:</strong> {selectedCaregiver.user.phone || "No especificado"}</p>
            <p><strong>Descripción:</strong> {selectedCaregiver.description || "No disponible"}</p>
            <p><strong>Experiencia:</strong> {selectedCaregiver.experience || "No especificada"}</p>
            <p><strong>Radio de cobertura (KM):</strong> {selectedCaregiver.coverage_radius_KM}</p>
            <p><strong>Calificación promedio:</strong> {selectedCaregiver.average_rating || "Sin calificaciones"}</p>

            {/* Botón para abrir el modal */}
            <button
              onClick={openModal}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Agendar servicio
            </button>
            {/* Servicios que ofrece y tarifas */}
            <h3 className="text-xl font-semibold mt-6 mb-4">Servicios y tarifas</h3>
            <div className="flex flex-wrap gap-4">
              {selectedCaregiver.rates.map((rate) => (
                <div key={rate.id} className="p-4 bg-gray-100 rounded-lg shadow mb-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                  <p className="font-bold text-lg">{rate.service.name}</p>
                  <p className="text-sm text-gray-500">{rate.service.description}</p>
                  <p><strong>Precio:</strong> ${rate.base_price}</p>
                  <p><strong>Precio por hora adicional:</strong> ${rate.additional_hour_price}</p>
                </div>
              ))}
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

          </div>
        ) : (
          <p className="text-center text-gray-500">Selecciona un cuidador para ver los detalles</p>
        )}

        
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Agendar servicio</h2>
            <p className="text-gray-500 mb-4">Selecciona la fecha y hora para el servicio</p>
            <input
              type="date"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <input
              type="time"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Agendar
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-2"        
            >
              Cancelar
            </button>

            </div>
            </div>
          )}
    </div>
  );
};

export default CaregiversList;
