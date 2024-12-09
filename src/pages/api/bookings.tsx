import prisma from "../../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { NextApiRequest, NextApiResponse } from "next";
/* eslint-disable @typescript-eslint/no-explicit-any */
// Definimos la interfaz para los datos de la reserva
interface Booking {
  id: number;
  owner_name: string;
  caregiver_name: string;
  pet_name: string;
  service_name: string;
  start_time: Date;
  end_time: Date;
  status: number;
  total_price: Decimal;
  additional_instructions: string | null;
}

// Definimos la interfaz para la creación de reservas

/*
interface BookingData {
  owner_id: string;
  caregiver_id: number;
  pet_id: number;
  service_id: number;
  start_time: Date;
  end_time: Date;
  status: number;
  total_price: Decimal;
  additional_instructions: string | null;
}
*/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    try {
      const bookings = await prisma.booking.findMany({
        include: {
          owner: true,
          caregiver: {
            include: {
              user: true, // Incluye la información del usuario asociado
            },
          },
          pet: true,
          service: true,
        },
      });

      const formattedBookings: Booking[] = bookings.map((booking) => ({
        id: booking.id,
        owner_name: booking.owner?.name || "No Owner Found",
        caregiver_name: booking.caregiver?.user?.name || "No Caregiver Found",
        pet_name: booking.pet?.name || "No Pet Found",
        service_name: booking.service?.name || "No Service Found",
        start_time: booking.start_time,
        end_time: booking.end_time,
        status: booking.status,
        total_price: booking.total_price,
        additional_instructions: booking.additional_instructions,
      }));

      return res.status(200).json(formattedBookings);
    } catch (error: unknown) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is empty or invalid." });
    }

    const {
      owner_id,
      caregiver_id,
      pet_id,
      service_id,
      start_time,
      end_time,
      status,
      total_price,
      additional_instructions,
    } = req.body;

    // Validación de campos requeridos
    if (
      !owner_id ||
      !caregiver_id ||
      !pet_id ||
      !service_id ||
      !start_time ||
      !end_time ||
      total_price === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid required fields." });
    }

    // Validar que `total_price` sea un número
    if (isNaN(total_price)) {
      return res.status(400).json({ error: "Invalid total_price value." });
    }

    try {
      const newBooking = await prisma.booking.create({
        data: {
          owner: { connect: { id: owner_id } },
          caregiver: { connect: { id: parseInt(caregiver_id, 10) } },
          pet: { connect: { id: parseInt(pet_id, 10) } },
          service: { connect: { id: parseInt(service_id, 10) } },
          start_time: new Date(start_time),
          end_time: new Date(end_time),
          status: parseInt(status, 10),
          total_price: new Decimal(total_price),
          additional_instructions: additional_instructions || null,
        },
      });

      return res.status(201).json(newBooking);
    } catch (error: unknown) {
      console.error("Error creating booking:", error);

      // Prisma-specific error handling
      if ((error as any)?.code === "P2003") {
        return res
          .status(400)
          .json({ error: "Invalid foreign key. Please check the IDs." });
      }

      return res.status(500).json({ error: "Error creating booking" });
    }
  }

  // Manejo de métodos no soportados
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
