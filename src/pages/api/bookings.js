import prisma from "../../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export default async function handler(req, res) {
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

      const formattedBookings = bookings.map((booking) => ({
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
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ error: "Error fetching bookings" });
    }
  }

  if (req.method === "POST") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty or invalid." });
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
  
    // Validate required fields
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
  
    // Validate total_price as a number
    if (isNaN(total_price) || total_price === null) {
      return res.status(400).json({ error: "Invalid total_price value." });
    }
  
    // Construct bookingData
    const bookingData = {
      owner_id: parseInt(owner_id, 10),
      caregiver_id: parseInt(caregiver_id, 10),
      pet_id: parseInt(pet_id, 10),
      service_id: parseInt(service_id, 10),
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      status: parseInt(status, 10),
      total_price: new Decimal(total_price),
      additional_instructions: additional_instructions || null,
    };
  
    // Log to inspect parsed data
    console.log("Parsed booking data:", bookingData);
  
    try {
      const newBooking = await prisma.bookings.create({
        data: bookingData,
      });
    
      return res.status(201).json(newBooking);
    } catch (error) {
      // Check if error is null, undefined, or not an object
      if (error === null || error === undefined || typeof error !== 'object') {
        console.log("Error creating booking: An unexpected error occurred. The error object is invalid.");
      } else {
        // Safe logging, check if error has expected properties
        console.log("Error creating booking:", error.message || error);
      }
    
      // Check for Prisma-specific error codes
      if (error?.code === "P2003") {
        return res.status(400).json({ error: "Invalid foreign key. Please check the IDs." });
      }
    
      return res.status(500).json({ error: "Error creating booking" });
    }
    
  }
  

  // Manejo de métodos no soportados
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}