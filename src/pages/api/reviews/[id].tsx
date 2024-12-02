// pages/api/reviews/index.ts

import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Crear una nueva reseña
const createReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { bookingId, rating, comment } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: {
        bookingId,
        rating,
        comment,
      },
      include: {
        booking: true, // Incluye la información de la reserva asociada
      },
    });
    return res.status(201).json(newReview);
  } catch (error: any) {
    // Manejo de errores más detallado
    if (error.code === 'P2002') { // Error de unicidad
      return res.status(409).json({ error: "Ya existe una reseña para esta reserva." });
    }
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todas las reseñas
const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        booking: {
          include: {
            // Puedes incluir más relaciones si es necesario
            user: true, // Por ejemplo, información del usuario que hizo la reserva
          },
        },
      },
    });
    return res.status(200).json(reviews);
  } catch (error: any) {
    return res.status(500).json({ error: "Error al obtener las reseñas." });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createReview(req, res);
  } else if (req.method === "GET") {
    return getReviews(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}
