import { useEffect, useState } from "react";
import Link from "next/link";

interface Caregiver {
  id: number;
  user: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string | null;
  };
  coverage_radius_KM: number;
  experience: string | null;
  is_active: boolean;
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

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este perfil de cuidador?")) {
      try {
        const response = await fetch(`/api/caregiver-profiles/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting caregiver profile");
        }
        setCaregivers((prev) => prev.filter((caregiver) => caregiver.id !== id));
      } catch (error: any) {
        alert("Error eliminando el perfil: " + error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
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
              <th className="px-4 py-2 border-b">Acciones</th>
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
                <td className="px-4 py-2 border-b space-x-2">
                  <Link
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    href={`/caregiver-profiles/${caregiver.id}`}
                  >
                    Detalles
                  </Link>
                  <Link
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    href={`/caregiver-profiles/edit/${caregiver.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(caregiver.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CaregiversList;
