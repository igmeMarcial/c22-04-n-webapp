"use server";


import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth } from "../../auth";

export async function getNearbyCaretakers(latitude: number, longitude: number, radiusKm: number) {
  try {
    const caretakers = await prisma.caregiverProfile.findMany({
      where: {
        coverage_radius_KM: {
          gte: radiusKm
        },
        verified: 1
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            address: true,
            image: true
          }
        },
        rates: {
          include: {
            service: true
          }
        }
      }
    });

    return caretakers;
  } catch (error) {
    console.error('Error fetching caretakers:', error);
    throw new Error('Failed to fetch caretakers');
  }
}

export async function getCaretakerAvailability(caregiverId: number) {
  try {
    const availability = await prisma.caregiverAvailability.findMany({
      where: {
        caregiverId: caregiverId
      },
      orderBy: {
        weekday: 'asc'
      }
    });
    return availability;
  } catch (error) {
    console.error('Error fetching availability:', error);
    throw new Error('Failed to fetch availability');
  }
}
export async function becomeCaretaker(
  experience: string,
  description: string,
  coverageRadius: number
) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    const caretaker = await prisma.caregiverProfile.create({
      data: {
        userId: session.user.id,
        experience,
        description,
        coverage_radius_KM: coverageRadius,
        verified: 0,
        average_rating: 0.0,
        total_reviews: 0
      }
    });
    return caretaker;
  } catch (error) {
    console.error('Error creating caretaker profile:', error);
    throw new Error('Failed to create caretaker profile');
  }
}



export async function becomeCaretakerUser(){
const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

  const userId = session.user.id;

  // Verificar si ya es cuidador
  const existingProfile = await prisma.caregiverProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Ya eres cuidador");
  }

  // Actualizar rol del usuario
  if(session.user.role !== 'CARETAKER'){
     await prisma.user.update({
    where: { id: userId },
    data: { role: "CARETAKER" },
  });
  }
 

  // Crear el perfil de cuidador
  const profile = await prisma.caregiverProfile.create({
    data: {
      userId,
      experience: "",
      description: "",
      coverage_radius_KM: 0,
      verified: 0,
      average_rating: 0,
      total_reviews: 0,
    },
  });

  return profile;

}

export async function actualizarPerfilCuidador(data: {
  experience: string;
  description: string;
  coverage_radius_KM: number;
  rates: Array<{ serviceId: number; base_price: number; additional_hour_price: number }>;
  availability: Array<{ weekday: number; start_time: string; end_time: string }>;
}) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado.");
  }

  const userId = session.user.id;

  // Actualizar perfil
  await prisma.caregiverProfile.update({
    where: { userId },
    data: {
      experience: data.experience,
      description: data.description,
      coverage_radius_KM: data.coverage_radius_KM,
    },
  });

  // Actualizar tarifas
  for (const rate of data.rates) {
    await prisma.caregiverRate.upsert({
      where: { caregiverId_serviceId: { caregiverId: Number(userId), serviceId: rate.serviceId } },
      update: {
        base_price: rate.base_price,
        additional_hour_price: rate.additional_hour_price,
      },
      create: {
        caregiverId: Number(userId),
        serviceId: rate.serviceId,
        base_price: rate.base_price,
        additional_hour_price: rate.additional_hour_price,
      },
    });
  }

  // Actualizar disponibilidad
  await prisma.caregiverAvailability.deleteMany({ where: { caregiverId: Number(userId) } });

  for (const availability of data.availability) {
    await prisma.caregiverAvailability.create({
      data: {
        caregiverId: Number(userId),
        weekday: availability.weekday,
        start_time: new Date(`1970-01-01T${availability.start_time}:00Z`),
        end_time: new Date(`1970-01-01T${availability.end_time}:00Z`),
      },
    });
  }
}



export async function obtenerPerfilCuidador() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

   if (session.user.role !== 'CARETAKER') {
    throw new Error("No tienes permiso para acceder a esta información");
  }

  const userId = session.user.id;
  
  const profile = await prisma.caregiverProfile.findUnique({
    where: { userId },
    include: {
      rates: { include: { service: true } }, 
      availability: true,
    },
  });

  if (!profile) {
    throw new Error("Perfil de cuidador no encontrado");
  }

 const profileWithConvertedData = {
    ...profile,
    verification_date: profile.verification_date ? profile.verification_date.toISOString() : null,
    average_rating: profile.average_rating ? profile.average_rating.toNumber() : 0,  
    rates: profile.rates.map((rate) => ({
      ...rate,
      base_price: rate.base_price ? rate.base_price.toNumber() : 0,  
      additional_hour_price: rate.additional_hour_price ? rate.additional_hour_price.toNumber() : 0,  
    })),
    availability: profile.availability.map((item) => ({
      ...item,
      start_time: item.start_time ? item.start_time.toISOString() : '', 
      end_time: item.end_time ? item.end_time.toISOString() : '',  
    })),
  };

  return profileWithConvertedData;
}


export async function obtenerReservasCuidador() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

  const userId = session.user.id;

  // Obtener todas las reservas del cuidador
  const bookings = await prisma.booking.findMany({
    where: { caregiverId: Number(userId) },
    include: {
      pet: true,
      owner: true,
    },
  });

  return bookings;
}

export async function obtenerReseñasCuidador() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

  const userId = session.user.id;

  // Obtener todas las reseñas del cuidador
  const reviews = await prisma.review.findMany({
     where: {
      booking: {
        caregiverId: Number(userId),  // Usa la relación 'booking' para acceder al 'caregiverId'
      },
    },
    include: {
      booking: { include: { owner: true, pet: true } },
    },
  });

  return reviews;
}

export async function obtenerServiciosCuidador() {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

  const userId = session.user.id;

  // Obtener los servicios ofrecidos por el cuidador
  const services = await prisma.caregiverRate.findMany({
    where: { caregiverId: Number(userId) },
    include: { service: true },
  });

  return services;
}


export async function actualizarFotoPerfil(file: File) {
  const session = await auth();
    console.log(file)
  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

  const userId = session.user.id;

  // Subir la nueva foto y obtener la URL (esto depende de la configuración de tu servicio de almacenamiento)
  const imageUrl = '';  // Suponiendo que tienes esta función de subida.

  // Actualizar foto de perfil
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { image: imageUrl },
  });

  return updatedUser;
}
export async function actualizarEstadoReserva(bookingId: number, newStatus: number) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    throw new Error("No estás autenticado");
  }

  // Actualizar estado de la reserva
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: newStatus },
  });

  return updatedBooking;
}






