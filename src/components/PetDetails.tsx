import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Importar useRouter

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
  age: number;
  userId: string;
  special_instructions: string;
  medical_needs: string;
  is_active: number;
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
          throw new Error('Pet not found');
        }
        const data: Pet = await response.json();
        setPet(data);
      } catch (err) {
        setError('Error fetching pet');
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
      <h1>Pet Details</h1>
      <p><strong>ID:</strong> {pet.id}</p>
      <p><strong>Name:</strong> {pet.name}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age}</p>
      <p><strong>Special Instructions:</strong> {pet.special_instructions}</p>
      <p><strong>Medical Needs:</strong> {pet.medical_needs}</p>
      <p><strong>Is Active:</strong> {pet.is_active ? 'Si' : 'No'}</p>
    </div>
  );
};

export default PetDetails;
