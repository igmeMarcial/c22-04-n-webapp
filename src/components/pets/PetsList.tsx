"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, PawPrint } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PetForm from "@/components/pets/PetForm";
import { User } from "../../../types/types";
import PetCard from "./PetCard";
import { getPetsByUserId } from "@/actions/pets-action";

export interface Pet {
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
  images: { fileName: string; publicUrl: string }[];
}

interface OwnerUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface PetUser {
  id: number;
  userId: string;
  name: string;
  species: string;
  breed: string | null;
  images: { fileName: string; publicUrl: string }[];
  owner: OwnerUser;
  age: number;
  weight: number;
  special_instructions: string | null;
  medical_needs: string | null;
  is_active: number;
}

interface PetsListProps {
  user: User;
}

const PetsList: React.FC<PetsListProps> = ({ user }) => {
  const [pets, setPets] = useState<PetUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<PetUser | null>(null);
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (petId: number) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
  };

  const handleUpdate = (pet: PetUser) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (user.id) {
      getPetsByUserId(user.id)
        .then((data) => setPets(data))
        .catch((error) =>
          setError(error instanceof Error ? error.message : "Error desconocido")
        )
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  console.log(pets);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            },
          }}
        >
          <PawPrint className="w-12 h-12 text-[#222F92]" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <Card className="w-full h-full border-none bg-transparent shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#222F92] flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-[#148E8F]" />
            Mis Mascotas
          </h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#148E8F] text-white rounded-full p-2 shadow-md hover:bg-[#148E8F]/90 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </motion.button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <PetForm closeModal={handleClose} user={user} pet={selectedPet} />
            </DialogContent>
          </Dialog>
        </div>

        <AnimatePresence>
          {pets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-gray-500 py-8"
            >
              No tienes mascotas registradas aún
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-x-auto">
              <AnimatePresence>
                {pets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PetsList;
