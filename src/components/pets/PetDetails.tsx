import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Importar useRouter

/* 
{"id":2,
"userId":"d46cda00-a85c-11ef-b8a9-80e82ce816f4",
"name":"Whiskers",
"species":"Cat",
"breed":null,
"age":"2",
"weight":"8",
"special_instructions":null,
"medical_needs":null,
"is_active":1}
*/
interface Pet {
  id: number;
  name: string;
  breed: string;
  species: string;
  age: number;
  userId: string;
  special_instructions: string;
  medical_needs: string;
  is_active: number;
  owner: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

const PetDetails: React.FC = () => {
  const router = useRouter(); // Usar el hook useRouter para acceder a la URL
  const { id } = router.query; // Obtener el id desde la query de la URL
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Si id no está disponible, no hacer el fetch

    const fetchPet = async () => {
      try {
        const response = await fetch(`/api/pets/${id}`); // Usar el id desde la URL
        if (!response.ok) {
          throw new Error("Pet not found");
        }
        const data: Pet = await response.json();
        setPet(data);
      } catch (err) {
        console.log(err);
        setError("Error fetching pet");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]); // Ejecutar el fetch solo cuando el id cambie

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <div className="min-w-full bg-white border border-gray-300">
      <h1>Detalles de la Mascota</h1>
      <p>
        <strong>ID:</strong> {pet.id}
      </p>
      <p>
        <strong>Nombre:</strong> {pet.name}
      </p>
      <p>
        <strong>Raza</strong> {pet.breed}
      </p>
      <p>
        <strong>Especie:</strong> {pet.species}
      </p>
      <p>
        <strong>Edad:</strong> {pet.age}
      </p>
      <p>
        <strong>Instrucciones Especiales:</strong> {pet.special_instructions}
      </p>
      <p>
        <strong>Necesidades Medicas:</strong> {pet.medical_needs}
      </p>
      <p>
        <strong>Esta Activo?:</strong> {pet.is_active ? "Si" : "No"}
      </p>

      <h2>Detalles del Dueño</h2>
      <p>
        <strong>ID:</strong> {pet.owner.id}
      </p>
      <p>
        <strong>Nombre:</strong> {pet.owner.name}
      </p>
      <p>
        <strong>Apellido:</strong> {pet.owner.last_name}
      </p>
      <p>
        <strong>Email:</strong> {pet.owner.email}
      </p>
      <p>
        <strong>Telefono:</strong> {pet.owner.phone || "N/A"}
      </p>
      <p>
        <strong>Dirección:</strong> {pet.owner.address || "N/A"}
      </p>
    </div>
  );
};

export default PetDetails;
