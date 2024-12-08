'use server'
import { prisma } from "@/lib/db";

interface PetUpdateData {
  name?: string;
  species?: string;
  breed?: string;
  age?: number;
  weight?: number;
  special_instructions?: string;
  medical_needs?: string;
  is_active?: number;
   images?: { fileName: string; publicUrl: string }[]; // Cambia este tipo según el tipo real de 'images'
}
// Actualiza una mascota
export const updatePet = async (id: number, updatedData:PetUpdateData ) => {
  try {
     const {
      name,
      species,
      breed,
      age,
      weight,
      special_instructions,
      medical_needs,
      is_active,
      images
    } =updatedData;
    const updatedPet = await prisma.pet.update({
      where: { id: id}, 
      data: {
        ...(name && { name }), 
        ...(species && { species }), 
        ...(breed && { breed }), 
        ...(age && { age }), 
        ...(weight && { weight }), 
        ...(special_instructions && { special_instructions }), 
        ...(medical_needs && { medical_needs }), 
        ...(is_active !== undefined && { is_active }), 
        ...(images && { images }), 
      },
    });

    return updatedPet;
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error; 
  }
};

// Elimina una mascota
export const deletePet = async (id: number) => {
  try {
    const deletedPet = await prisma.pet.delete({
      where: { id: id },
    });

    return deletedPet; 
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error; 
  }
};