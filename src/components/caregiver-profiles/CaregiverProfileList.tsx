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
  createdAt: string;
  updatedAt: string;
}

const CaregiversList = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            <p><strong>Nombre:</strong> {selectedCaregiver.user.name} {selectedCaregiver.user.last_name}</p>
            <p><strong>Email:</strong> {selectedCaregiver.user.email}</p>
            <p><strong>Teléfono:</strong> {selectedCaregiver.user.phone || "No especificado"}</p>
            <p><strong>Descripción:</strong> {selectedCaregiver.description || "No disponible"}</p>
            <p><strong>Experiencia:</strong> {selectedCaregiver.experience || "No especificada"}</p>
            <p><strong>Radio de cobertura (KM):</strong> {selectedCaregiver.coverage_radius_KM}</p>
            <p><strong>Calificación promedio:</strong> {selectedCaregiver.average_rating || "Sin calificaciones"}</p>

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
                          {new Date(slot.start_time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(slot.end_time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
    </div>
  );
};

export default CaregiversList;
