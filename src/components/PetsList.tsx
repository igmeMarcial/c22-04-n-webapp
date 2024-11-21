import { useEffect, useState } from "react";

interface Pet {
  id: number;
  name: string;
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Pets List</h1>
      {pets.length === 0 ? (
        <p>No pets available</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Species</th>
              <th className="px-4 py-2 border-b">Breed</th>
              <th className="px-4 py-2 border-b">Age</th>
              <th className="px-4 py-2 border-b">Weight</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{pet.name}</td>
                <td className="px-4 py-2 border-b">{pet.species}</td>
                <td className="px-4 py-2 border-b">
                  {pet.breed ? pet.breed : "Not specified"}
                </td>
                <td className="px-4 py-2 border-b">{pet.age}</td>
                <td className="px-4 py-2 border-b">{pet.weight} kg</td>
                <td className="px-4 py-2 border-b">
                  {pet.is_active ? "Active" : "Inactive"}
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
