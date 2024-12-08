'use server';
import { prisma } from "@/lib/db";

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
        },
      });
  
      return newCaregiver;
    } catch (error) {
      console.error("Error creating caregiver profile:", error);
      throw error;
    }
  };
// Actualiza un perfil de cuidador
export const updateCaregiverProfile = async (id: number, updatedData: CaregiverUpdateData) => {
  try {
    const updatedCaregiver = await prisma.caregiverProfile.update({
      where: { id },
      data: {
        ...(updatedData.experience && { experience: updatedData.experience }),
        ...(updatedData.description && { description: updatedData.description }),
        ...(updatedData.coverage_radius_KM && { coverage_radius_KM: updatedData.coverage_radius_KM }),
        ...(updatedData.verified !== undefined && { verified: updatedData.verified }),
        ...(updatedData.verification_date && { verification_date: updatedData.verification_date }),
      },
    });

    return updatedCaregiver;
  } catch (error) {
    console.error("Error updating caregiver profile:", error);
    throw error;
  }
};

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
