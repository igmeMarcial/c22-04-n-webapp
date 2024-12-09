"use client";

import { useEffect, useState } from "react";
import { Pet, User } from "@prisma/client";
import { getPets } from "@/actions/pets-action";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, MapPinIcon, Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import Image from "next/image";

interface PetWithOwner extends Pet {
  owner: Pick<User, "name" | "email" | "phone" | "address">;
  images: { fileName: string; publicUrl: string }[];
}

export function PetListLanding() {
  const [pets, setPets] = useState<PetWithOwner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const loadPets = async () => {
      try {
        setIsLoading(true);
        const petsData = await getPets();
        setPets(petsData);
      } catch (err) {
        console.log(err);
        setError(
          "Error al cargar las mascotas. Por favor, intente nuevamente."
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadPets();
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#222F92] mb-4"
          >
            Mascotas Disponibles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg mb-8"
          >
            Encuentra la mascota perfecta para cuidar
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar mascotas..."
              className="pl-10 h-12 rounded-full border-2 border-[#148E8F]/20 focus:border-[#148E8F] transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-center mb-8">{error}</div>}

        <AnimatePresence>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPets.map((pet) => (
                <motion.div
                  key={pet.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Link href={`/pets/${pet.id}`} className="h-full block">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white border-2 border-gray-100 overflow-hidden">
                      <div className="relative">
                        <AspectRatio ratio={4 / 3} className="bg-muted">
                          <Image
                            src={
                              Array.isArray(pet.images) && pet.images.length > 0
                                ? pet.images[0]?.publicUrl ||
                                  "/placeholder-pet.jpg"
                                : "/placeholder-pet.jpg"
                            }
                            alt={pet.name}
                            fill
                            className="object-cover rounded-t-lg transform hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </AspectRatio>
                        <Badge
                          className="absolute top-4 right-4 bg-[#222F92] text-white"
                          variant="default"
                        >
                          {pet.species}
                        </Badge>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#222F92]">
                          {pet.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {pet.breed && (
                            <div className="flex items-center text-gray-600">
                              <HeartIcon className="w-5 h-5 mr-2 text-[#148E8F]" />
                              <span>{pet.breed}</span>
                            </div>
                          )}
                          <div className="flex items-center text-gray-600">
                            <MapPinIcon className="w-5 h-5 mr-2 text-[#148E8F]" />
                            <span>{pet.owner.address}</span>
                          </div>
                          <Badge
                            variant="default"
                            className="text-[#148E8F] border-[#148E8F]"
                          >
                            {pet.age} años
                          </Badge>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t border-gray-100 mt-auto">
                        <Button
                          variant="ghost"
                          className="w-full text-[#222F92] hover:text-[#148E8F] hover:bg-[#148E8F]/10"
                        >
                          Ver más detalles →
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
