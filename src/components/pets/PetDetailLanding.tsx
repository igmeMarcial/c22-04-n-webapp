"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pet, User } from "@prisma/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/Badge";
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  User2,
  Scale,
  ClipboardList,
  Stethoscope,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { createCaregiverPetRequest } from "@/actions/booking-actions";

interface PetWithOwner extends Pet {
  owner: Pick<User, "name" | "email" | "phone" | "address">;
}

interface PetImage {
  fileName: string;
  publicUrl: string;
}

interface PetDetailsProps {
  pet: PetWithOwner;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function PetDetailsLanding({ pet }: PetDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const images = pet.images as PetImage[] | null;
  const message = `Me gustaria ser cuidador de su ${pet.name}`;
  const session = useSession();
  const handleCareRequest = async () => {
    if (!session) {
      redirect("/login");
    }

    setIsLoading(true);
    try {
      await createCaregiverPetRequest(pet.id, message);
      toast.success("¡Solicitud enviada con éxito!", {
        description:
          "Tu solicitud para cuidar a esta mascota ha sido registrada",
      });
    } catch (error) {
      toast.error("Error al procesar la solicitud", {
        description: "Por favor, intenta nuevamente más tarde.",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={stagger}
      className="min-h-screen  pb-12 px-4 sm:px-6 lg:px-8"
    >
      <Card className="max-w-4xl mx-auto shadow-lg border-2 border-gray-100">
        <CardHeader className="text-center pb-2">
          <motion.div variants={fadeInUp}>
            <Badge
              variant="default"
              className="mb-4 bg-[#148E8F]/10 text-[#148E8F] hover:bg-[#148E8F]/20"
            >
              {pet.species}
            </Badge>
            <CardTitle className="text-4xl font-bold text-[#222F92] mb-2">
              {pet.name}
            </CardTitle>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-8">
          <motion.div variants={fadeInUp} className="relative">
            {images && images.length > 0 && (
              <div className="relative rounded-xl overflow-hidden">
                <Carousel className="w-full max-w-3xl mx-auto">
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <AspectRatio ratio={16 / 9} className="bg-muted">
                          <Image
                            src={image.publicUrl}
                            alt={`${pet.name} - ${image.fileName}`}
                            fill
                            className="object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0}
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="bg-white/80 hover:bg-white" />
                  <CarouselNext className="bg-white/80 hover:bg-white" />
                </Carousel>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-[#222F92] mb-4 flex items-center">
                  <ClipboardList className="w-6 h-6 mr-2" />
                  Información General
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Heart className="w-5 h-5 mr-2 text-[#148E8F]" />
                    <span className="font-medium">Raza:</span>
                    <span className="ml-2">
                      {pet.breed || "No especificada"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Scale className="w-5 h-5 mr-2 text-[#148E8F]" />
                    <span className="font-medium">Peso:</span>
                    <span className="ml-2">{pet.weight} kg</span>
                  </div>
                  <Badge className="bg-[#222F92]/10 text-[#222F92] hover:bg-[#222F92]/20">
                    {pet.age} años de edad
                  </Badge>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-[#222F92] mb-4 flex items-center">
                  <Stethoscope className="w-6 h-6 mr-2" />
                  Necesidades Especiales
                </h3>
                <div className="space-y-3">
                  {pet.special_instructions && (
                    <div className="p-4 bg-[#148E8F]/5 rounded-lg">
                      <p className="text-gray-700">
                        <span className="font-medium">Instrucciones:</span>
                        <br />
                        {pet.special_instructions}
                      </p>
                    </div>
                  )}
                  {pet.medical_needs && (
                    <div className="p-4 bg-[#222F92]/5 rounded-lg">
                      <p className="text-gray-700">
                        <span className="font-medium">
                          Necesidades médicas:
                        </span>
                        <br />
                        {pet.medical_needs}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-[#222F92] mb-4 flex items-center">
                  <User2 className="w-6 h-6 mr-2" />
                  Información del Propietario
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User2 className="w-5 h-5 mr-2 text-[#148E8F]" />
                    <span className="font-medium">Nombre:</span>
                    <span className="ml-2">{pet.owner.name}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-2 text-[#148E8F]" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{pet.owner.email}</span>
                  </div>
                  {pet.owner.phone && (
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 mr-2 text-[#148E8F]" />
                      <span className="font-medium">Teléfono:</span>
                      <span className="ml-2">{pet.owner.phone}</span>
                    </div>
                  )}
                  {pet.owner.address && (
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-2 text-[#148E8F]" />
                      <span className="font-medium">Ubicación:</span>
                      <span className="ml-2">{pet.owner.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center pt-6">
            <Button
              onClick={handleCareRequest}
              disabled={isLoading}
              className="bg-[#222F92] hover:bg-[#1a2470] text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Heart className="w-6 h-6" />
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Procesando...
                </span>
              ) : (
                "Quiero cuidar esta mascota"
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
