import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

interface PetListProps {
  userId: string;
}
const PetsList: React.FC<PetListProps> = ({ userId }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("/api/pets");
        if (!response.ok) {
          throw new Error("Error fetching pets");
        }
        const data: Pet[] = await response.json();
        setPets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const images = {
    Bird: "/images/bird.jpg",
    Dog: "/images/dog.webp",
    Cat: "/images/cat.jpg",
    Hamster: "/images/hammster.webp",
    Rabbit: "/images/rabbit.jpg",
    Turtle: "/images/turtle.jpeg",
    Parrot: "/images/parrot.jpg",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Mascotas</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
        {pets.map((pet) => (
          <div key={pet.id} className="text-center">
            <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden mx-auto">
              <Image
                src={images[pet.species] || "/images/default.jpg"}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{pet.name}</p>
          </div>
        ))}

        {/* Botón para agregar una nueva mascota */}
        <div className="flex justify-center items-center">
          <Link href="/pets/register">
            <div
              className="relative w-[120px] h-[120px] rounded-full bg-white shadow-md flex items-center justify-center text-4xl font-bold text-gray-600 border border-gray-300 hover:bg-gray-100 transition duration-300"
              aria-label="Agregar nueva mascota"
            >
              +
            </div>
            <p className="mt-2 text-sm font-medium">Agregar Mascota</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetsList;
