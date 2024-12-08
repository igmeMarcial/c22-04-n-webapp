"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { PawPrint, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../ui/Badge";
import { Pet } from "./PetsList";
import { deletePet } from "@/actions/pets-action";

interface PetCardProps {
  pet: Pet;
  onDelete: (id: number) => void;
  onUpdate: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onDelete, onUpdate }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log(pet.id);
    try {
      await deletePet(pet.id);
      toast.success("Pet deleted successfully!");
      onDelete(pet.id);
      toast.success("Mascota eliminada exitosamente");
    } catch (error) {
      toast.error(error + " Error al eliminar la mascota");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex items-center gap-2 text-blue-600"
                onClick={() => onUpdate(pet)}
              >
                <Pencil className="w-4 h-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="p-3">
          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
            <Image
              src={
                pet.images && pet.images.length > 0
                  ? pet.images[0].publicUrl
                  : "/images/default.jpg"
              }
              alt={pet.name || "Mascota sin nombre"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-[#222F92] text-lg leading-tight">
                  {pet.name}
                </h3>
                <p className="text-sm text-[#148E8F]">{pet.species}</p>
              </div>
              <Badge variant="default" className="text-xs">
                <PawPrint className="w-3 h-3 mr-1" />
                {pet.breed || "Sin raza"}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{pet.age} años</span>
              <span>•</span>
              <span>{pet.weight} kg</span>
            </div>
          </div>
        </div>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente a{" "}
              {pet.name} de tu lista de mascotas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PetCard;
