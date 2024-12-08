"use server";


import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { prisma } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";

export async function createBooking(petId: number,totalPrice: number) {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    // Get the first available caregiver and service for demo purposes
    const caregiver = await prisma.caregiverProfile.findFirst();
    const service = await prisma.service.findFirst();

    if (!caregiver || !service) {
      throw new Error('No caregiver or service available');
    }

    const booking = await prisma.booking.create({
      data: {
        ownerId: session.user.id,
        caregiverId: caregiver.id,
        petId: petId,
        serviceId: service.id,
        start_time: new Date(),
        end_time: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 1,
        total_price: new Decimal(totalPrice),
      },
    });

   const response = {
  ...booking,
  total_price: booking.total_price.toNumber(), // Convierte el Decimal a number
};

return response;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Failed to create booking');
  }
}