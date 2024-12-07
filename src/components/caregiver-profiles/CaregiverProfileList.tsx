import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "1rem",
        height: "calc(100vh - 126px)",
        padding: "1rem",
      }}
    >


      {/* Columna Derecha: Lista de cuidadores */}
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <h2 className="text-xl font-bold mb-4">Lista de cuidadores</h2>
        {caregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            style={{
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCaregiver(caregiver)}
          >
            <p><strong>{caregiver.user.name} {caregiver.user.last_name}</strong></p>
            <p>{caregiver.user.email}</p>
          </div>
        ))}

        
      </div>
            {/* Columna Izquierda: Detalles del cuidador */}
            <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          padding: "1rem",
        }}
      >
        {selectedCaregiver ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Detalles del cuidador</h2>
            <p><strong>Nombre:</strong> {selectedCaregiver.user.name} {selectedCaregiver.user.last_name}</p>
            <p><strong>Email:</strong> {selectedCaregiver.user.email}</p>
            <p><strong>Teléfono:</strong> {selectedCaregiver.user.phone || "No especificado"}</p>
            <p><strong>Descripción:</strong> {selectedCaregiver.description || "No disponible"}</p>
            <p><strong>Experiencia:</strong> {selectedCaregiver.experience || "No especificada"}</p>
            <p><strong>Radio de cobertura (KM):</strong> {selectedCaregiver.coverage_radius_KM}</p>
            <p><strong>Calificación promedio:</strong> {selectedCaregiver.average_rating || "Sin calificaciones"}</p>
          </div>
        ) : (
          <p>Selecciona un cuidador para ver los detalles</p>
        )}
      </div>
    </div>
  );
};

export default CaregiversList;
