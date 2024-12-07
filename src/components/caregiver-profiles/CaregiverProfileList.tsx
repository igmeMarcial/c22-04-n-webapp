import { useEffect, useState } from "react";
import Link from "next/link";
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
    weekday: number; // 0: Sunday, 1: Monday, etc.
    start_time: string; // ISO date string
    end_time: string; // ISO date string
  }>;
  createdAt: string;
  updatedAt: string;
}


const CaregiversList = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
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
      gridTemplateColumns: "2fr 1fr 0fr",
      gap: "1rem",
      height: "calc(100vh - 126px)",
      padding: "1rem",
    }}
  >
    {/* Columna Izquierda */}
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de cuidadores</h1>
      {caregivers.length === 0 ? (
        <p>No caregiver profiles available</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Correo</th>
              <th className="px-4 py-2 border-b">Teléfono</th>
              <th className="px-4 py-2 border-b">Estatus</th>
            </tr>
          </thead>
          <tbody>
            {caregivers.map((caregiver) => (
              <tr key={caregiver.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">
                  {caregiver.user.name} {caregiver.user.last_name}
                </td>
                <td className="px-4 py-2 border-b">{caregiver.user.email}</td>
                <td className="px-4 py-2 border-b">{caregiver.user.phone || "No especificado"}</td>
                <td className="px-4 py-2 border-b">
                  {caregiver.is_active ? "Activo" : "Inactivo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>

    {/* Columna Central */}
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >

    </div>

    {/* Columna Derecha */}
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    ></div>

    <Button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={() => {console.log(caregivers )}
      }
    >
      Console Log fetch
    </Button>
  </div>

  );
};

export default CaregiversList;
