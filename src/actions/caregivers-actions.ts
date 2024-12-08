'use server';
import { prisma } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";
import { auth } from "../../auth";  
import { revalidatePath } from "next/cache";
// Interfaz para datos de actualización del perfil del cuidador
interface CaregiverUpdateData {
  experience?: string;
  description?: string;
  coverage_radius_KM?: number;
  verified?: number;
  verification_date?: Date;
}


// Crea un perfil de cuidador
export const createCaregiverProfile = async (data: {
    userId: string;
    experience: string;
    description: string;
    coverage_radius_KM: number;
    verified: number;
    verification_date: Date;
  }) => {
    try {
      const newCaregiver = await prisma.caregiverProfile.create({
        data: {
          experience: data.experience,
          description: data.description,
          coverage_radius_KM: data.coverage_radius_KM,
          verified: data.verified,
          verification_date: data.verification_date,
          average_rating: new Decimal(0),  // Usar Decimal en lugar de número entero
          total_reviews: 0, // Assuming default value
          user: { connect: { id: data.userId } },
        },
      });
  
      return newCaregiver;
    } catch (error) {
      console.error("Error creating caregiver profile:", error);
      throw error;
    }
  };
  


// Función auxiliar para transformar Decimals a números
function transformDecimalToNumber(data: any) {
  const transformed = { ...data };
  for (const key in transformed) {
    if (transformed[key] instanceof Decimal) {
      transformed[key] = Number(transformed[key].toString());
    }
  }
  return transformed;
}


export async function updateCaregiverProfile(updatedData: CaregiverUpdateData) {
  try {
    // Validar la sesión del usuario
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return {
        error: "No estás autenticado. Por favor, inicia sesión."
      };
    }

   

    const userId = session.user.id;
// Validar que al menos hay un campo para actualizar
    if (Object.keys(updatedData).length === 0) {
      console.error("updateCaregiverProfile: No fields to update");
      return {
        error: "No hay campos para actualizar."
      };
    }


    // Limpiar los datos antes de la actualización
    const cleanData: CaregiverUpdateData = {};
    
    if (updatedData.experience !== undefined) cleanData.experience = updatedData.experience;
    if (updatedData.description !== undefined) cleanData.description = updatedData.description;
    if (updatedData.coverage_radius_KM !== undefined) cleanData.coverage_radius_KM = Number(updatedData.coverage_radius_KM);
    if (updatedData.verified !== undefined) cleanData.verified = Number(updatedData.verified);
    if (updatedData.verification_date !== undefined) {
      cleanData.verification_date = new Date(updatedData.verification_date);
    }

    const updatedCaregiver = await prisma.caregiverProfile.update({
      where: { userId },
      data: cleanData,
    });

    const transformedData = transformDecimalToNumber(updatedCaregiver);

    revalidatePath('/dashboard/caretaker/profile');
    
    return {
      success: true,
      data: transformedData
    };
  } catch (error) {
    console.error("Error actualizando el perfil del cuidador:", error);
    return {
      error: "Hubo un error al actualizar el perfil. Por favor, intente nuevamente."
    };
  }
}

// Elimina un perfil de cuidador
export const deleteCaregiverProfile = async (id: number) => {
  try {
    const deletedCaregiver = await prisma.caregiverProfile.delete({
      where: { id },
    });

    return deletedCaregiver;
  } catch (error) {
    console.error("Error deleting caregiver profile:", error);
    throw error;
  }
};

// Obtiene todos los perfiles de cuidadores
export const getCaregiverProfiles = async () => {
    const profiles = await prisma.caregiverProfile.findMany({
      include: {
        rates: true,
        availability: true,
      },
    });
  
    return profiles.map((profile) => ({
      ...profile,
      average_rating: profile.average_rating.toString(), // Convert Decimal to string
      rates: profile.rates.map((rate) => ({
        ...rate,
        base_price: rate.base_price.toString(), // Convert Decimal to string
        additional_hour_price: rate.additional_hour_price.toString(), // Convert Decimal to string
      })),
    }));
  };
// Obtiene un perfil de cuidador por ID
export const getCaregiverProfileById = async (id: number) => {
  try {
    const caregiver = await prisma.caregiverProfile.findUnique({
      where: { id },
      include: {
        rates: true,
        availability: true,
      },
    });

    return caregiver;
  } catch (error) {
    console.error("Error fetching caregiver profile:", error);
    throw error;
  }
};

// Actualiza las tarifas de un cuidador
export const updateCaregiverRates = async (
  caregiverId: number,
  rates: { serviceId: number; base_price: number; additional_hour_price: number }[]
) => {
  try {
    const updatedRates = await Promise.all(
      rates.map(rate =>
        prisma.caregiverRate.upsert({
          where: { caregiverId_serviceId: { caregiverId, serviceId: rate.serviceId } },
          update: {
            base_price: rate.base_price,
            additional_hour_price: rate.additional_hour_price,
          },
          create: {
            caregiverId,
            serviceId: rate.serviceId,
            base_price: rate.base_price,
            additional_hour_price: rate.additional_hour_price,
          },
        })
      )
    );

    return updatedRates;
  } catch (error) {
    console.error("Error updating caregiver rates:", error);
    throw error;
  }
};

// Actualiza la disponibilidad de un cuidador
export const updateCaregiverAvailability = async (
  caregiverId: number,
  availability: { weekday: number; start_time: Date; end_time: Date }[]
) => {
  try {
    await prisma.caregiverAvailability.deleteMany({ where: { caregiverId } });

    const updatedAvailability = await prisma.caregiverAvailability.createMany({
      data: availability.map(a => ({
        caregiverId,
        weekday: a.weekday,
        start_time: a.start_time,
        end_time: a.end_time,
      })),
    });

    return updatedAvailability;
  } catch (error) {
    console.error("Error updating caregiver availability:", error);
    throw error;
  }
};
