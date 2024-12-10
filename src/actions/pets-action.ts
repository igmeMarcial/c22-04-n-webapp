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
export const updatePet = async (id: number, updatedData: PetUpdateData) => {
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
    } = updatedData;
    const updatedPet = await prisma.pet.update({
      where: { id: id },
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
export async function getPets() {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        is_active: 1
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return pets.map((pet) => ({
      ...pet,
      images: (pet.images as { fileName: string; publicUrl: string }[]) ?? [],
    }));
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw new Error('Failed to fetch pets');
  }
}

export async function getPetById(id: number) {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: id
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true
          }
        }
      }
    });
    return pet;
  } catch (error) {
    console.error('Error fetching pet:', error);
    throw new Error('Failed to fetch pet');
  }
}

export async function getPetsByUserId(userId: string) {
  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId: userId
      },
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true
          }
        }
      }
    });
    return pets.map((pet) => ({
      ...pet,
      images: (pet.images as { fileName: string; publicUrl: string }[]) ?? [],
    }));
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw new Error('Failed to fetch pets');
  }
}

// Crear una mascota
export async function createPet(data: {
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  special_instructions: string;
  medical_needs: string;
  is_active: number;
  userId: string;
  images: { fileName: string; publicUrl: string }[];
}) {
  try {
    const pet = await prisma.pet.create({
      data: {
        ...data,
        images: {
          createMany: {
            data: data.images
          }
        }
      }
    });
    return pet;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw new Error('Failed to create pet');
  }
}