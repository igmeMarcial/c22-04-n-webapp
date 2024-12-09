"use server";


import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "@/lib/db";

import { Prisma } from "@prisma/client";

export async function createCaregiverPetRequest(
  petId: number,
  message?: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    // 1. Verificar si el cuidador tiene un perfil
    const caregiverProfile = await prisma.caregiverProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!caregiverProfile) {
      throw new Error("Caregiver profile not found");
    }

    // 2. Verificar si ya existe una solicitud pendiente
    const existingRequest = await prisma.caregiverPetRequest.findFirst({
      where: {
        caregiverId: caregiverProfile.id,
        petId: petId,
        status: 0, // pending
      },
    });

    if (existingRequest) {
      throw new Error("A pending request already exists for this pet");
    }

    // 3. Crear la solicitud
    const request = await prisma.caregiverPetRequest.create({
      data: {
        caregiverId: caregiverProfile.id,
        petId: petId,
        message: message,
        status: 0, // pending
      },
    });

    return request;
  } catch (error) {
    console.error("Error creating caregiver request:", error);
    throw new Error("Failed to create caregiver request");
  }
}


export async function getOwnerPetRequests() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    // Obtener todas las mascotas del dueño con sus solicitudes pendientes
    const petsWithRequests = await prisma.pet.findMany({
      where: {
        userId: session.user.id,
        is_active: 1,
      },
      include: {
        caregiverRequests: {
          where: {
            status: 0, // solo solicitudes pendientes
          },
          include: {
            caregiver: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return petsWithRequests;
  } catch (error) {
    console.error("Error fetching pet requests:", error);
    throw new Error("Failed to fetch pet requests");
  }
}

// Action para actualizar el estado de una solicitud
export async function updatePetRequestStatus(
  requestId: number,
  status: number // 1: accepted, 2: rejected
) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    // Verificar que la solicitud pertenece a una mascota del dueño
    const request = await prisma.caregiverPetRequest.findUnique({
      where: { id: requestId },
      include: {
        pet: true,
      },
    });

    if (!request || request.pet.userId !== session.user.id) {
      throw new Error("Request not found or unauthorized");
    }

    // Actualizar el estado de la solicitud
    const updatedRequest = await prisma.caregiverPetRequest.update({
      where: { id: requestId },
      data: { status, updatedAt: new Date() },
    });

    return updatedRequest;
  } catch (error) {
    console.error("Error updating request status:", error);
    throw new Error("Failed to update request status");
  }
}

export async function createServiceWithCaregiver(
  name: string,
  description: string,
  min_duration: number,
  max_duration: number,
  base_price: string,  // El precio base que pasa por props
  additional_hour_price: string // El precio adicional por hora que pasa por props
) {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  try {

    const caregiver = await prisma.caregiverProfile.findUnique({
      where:{userId:session.user.id}
    })
     if (!caregiver) {
      throw new Error('Caregiver no encontrado');
    }
    // Primero, crea el servicio
    const newService = await prisma.service.create({
      data: {
        name,
        description,
        min_duration,
        max_duration,
      },
    });

    // Luego, asigna este servicio al cuidador creando un registro en CaregiverRate
    await prisma.caregiverRate.create({
      data: {
        caregiverId:caregiver.id,
        serviceId: newService.id,
        base_price:  new Prisma.Decimal(base_price),  // Usando el precio base pasado por props
        additional_hour_price: new Prisma.Decimal(additional_hour_price),  // Usando el precio adicional por hora pasado por props
      },
    });

    return newService;
  } catch (error) {
    console.error("Error al crear el servicio y asignarlo al cuidador:", error);
    throw new Error("No se pudo crear el servicio o asignarlo al cuidador");
  }
}

