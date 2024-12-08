"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Image from "next/image";
import { Pet, User } from "@prisma/client";

interface PetWithOwner extends Pet {
  owner: Pick<User, "name" | "email" | "phone" | "address">;
}

interface PetCardProps {
  pet: PetWithOwner;
  index: number;
}

export function PetCardLanding({ pet, index }: PetCardProps) {
  const images = pet.images as { urls: string[] } | null;
  const mainImage =
    Array.isArray(images?.urls) && images.urls.length > 0
      ? images.urls[0]
      : "/placeholder-pet.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/pets/${pet.id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <Image
              src={mainImage}
              alt={pet.name}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
          <CardHeader>
            <CardTitle className="text-xl font-bold">{pet.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Especie:</span> {pet.species}
              </p>
              {pet.breed && (
                <p>
                  <span className="font-semibold">Raza:</span> {pet.breed}
                </p>
              )}
              <p>
                <span className="font-semibold">Edad:</span> {pet.age} años
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Click para ver más detalles
            </p>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
