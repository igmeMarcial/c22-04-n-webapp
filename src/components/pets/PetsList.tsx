import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PetForm from "@/components/pets/PetForm";

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

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/pets?userId=${userId}`);
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

    if (userId) {
      fetchPets();
    }
  }, [userId, isOpen]);


  const images = {
    Bird: "/images/bird.jpg",
    Dog: "/images/dog.webp",
    Cat: "/images/cat.jpg",
    Hamster: "/images/hammster.webp",
    Rabbit: "/images/rabbit.jpg",
    Turtle: "/images/turtle.jpeg",
    Parrot: "/images/parrot.jpg",
    Pajaro: "/images/bird.jpg",
    Perro: "/images/dog.webp",
    Gato: "/images/cat.jpg",
    Conejo: "/images/rabbit.jpg",
    Tortuga: "/images/turtle.jpeg",
    Loro: "/images/parrot.jpg",
    Ave: "/images/bird.jpg",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center pb-4">Mis Mascotas</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="flex flex-col items-center min-w-[120px] max-w-[150px]"
          >
            {/* Contenedor de la imagen */}
            <div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden">
              <Image
                src={images[pet.species] || "/images/default.jpg"}
                alt={pet.name}
                fill
                className="object-cover"
              />
            </div>
            {/* Nombre de la mascota */}
            <p className="mt-2 text-sm font-medium">{pet.name}</p>
          </div>
        ))}

        {/* Botón para agregar una nueva mascota */}
        <div className="flex flex-col items-center min-w-[120px] max-w-[150px]">

            <div
              className="relative w-[120px] h-[120px] rounded-full bg-white shadow-md flex items-center justify-center text-4xl font-bold text-gray-600 border border-gray-300 hover:bg-gray-100 transition duration-300"
              aria-label="Agregar nueva mascota"
              onClick={openModal}
            >
              +
            </div>
            <p className="mt-2 text-sm font-medium">Agregar Mascota</p>
        </div>
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

              {/* Contenido del Modal */}
              <PetForm userId={userId} closeModal={closeModal} />

          </div>
        )}
      </div>

    </div>


  );
};

export default PetsList;
