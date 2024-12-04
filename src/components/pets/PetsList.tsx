import { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
interface Pet {
  id: number;
  name: string;
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
  species: string;
  breed: string | null;
  age: number;
  weight: number;
  special_instructions: string | null;
  medical_needs: string | null;
  is_active: number;
  createdAt: string;
  updatedAt: string;
}

const PetsList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets"); // Llamada al endpoint de todas las mascotas
        if (!response.ok) {
          throw new Error("Error fetching pets");
        }
        const data: Pet[] = await response.json();
        setPets(data); // Guardamos las mascotas en el estado
      } catch (error: any) {
        setError(error.message); // Capturamos cualquier error
      } finally {
        setLoading(false); // Terminamos el loading
      }
    };

    fetchPets();
  }, []); // El array vacío significa que esto solo se ejecutará una vez al montar el componente

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
      try {
        const response = await fetch(`/api/pets/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Error deleting pet");
        }
        // Filtrar la mascota eliminada del estado local
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
      } catch (error: any) {
        alert("Error eliminando la mascota: " + error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const bird = '/images/bird.jpg';
  const dog = '/images/dog.webp';
  const cat = '/images/cat.jpg';
  const hammster = '/images/hammster.webp';
  const rabbit = '/images/rabbit.jpg';
  const turtle = '/images/turtle.jpg|';

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Mis Mascotas</h1>
    <div
      style={{
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        borderRadius: '16px', // Radio de las esquinas
        position: 'relative',
      }}
    >
      <Image
        src={bird}
        alt="Descripción de la imagen"
        layout="fill"
        objectFit="cover"
      />
    </div>
      {pets.length === 0 ? (
        <p>No pets available</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Dueño</th>
              <th className="px-4 py-2 border-b">Especie</th>
              <th className="px-4 py-2 border-b">Raza</th>
              <th className="px-4 py-2 border-b">Edad</th>
              <th className="px-4 py-2 border-b">Peso</th>
              <th className="px-4 py-2 border-b">Estatus</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{pet.name}</td>
                <td className="px-4 py-2 border-b">{pet.owner.name} {pet.owner.last_name}</td>
                <td className="px-4 py-2 border-b">{pet.species}</td>
                <td className="px-4 py-2 border-b">
                  {pet.breed ? pet.breed : "Not specified"}
                </td>
                <td className="px-4 py-2 border-b">{pet.age}</td>
                <td className="px-4 py-2 border-b">{pet.weight} kg</td>
                <td className="px-4 py-2 border-b">
                  {pet.is_active ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2 border-b space-x-2">
                  <Link className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" href={`/pets/${pet.id}`}>
                    Detalles
                  </Link>
                  <Link className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" href={`/pets/edit/${pet.id}`}>
                    Editar
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(pet.id)}
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

export default PetsList;
