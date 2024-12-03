import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Obtener una reseña específica
const getReviewById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const review = await prisma.review.findUnique({
      where: { id: Number(id) },
      include: {
        booking: {
          include: {
            user: true, // Información del usuario asociado a la reserva
          },
        },
      },
    });

    if (!review) {
      return res.status(404).json({ error: "Reseña no encontrada." });
    }

    return res.status(200).json(review);
  } catch (error: any) {
    return res.status(500).json({ error: "Error al obtener la reseña." });
  }
};

// Actualizar una reseña específica
const updateReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        rating,
        comment,
      },
      include: {
        booking: true,
      },
    });

    return res.status(200).json(updatedReview);
  } catch (error: any) {
    if (error.code === 'P2025') { // Error si la reseña no existe
      return res.status(404).json({ error: "Reseña no encontrada." });
    }
    return res.status(500).json({ error: "Error al actualizar la reseña." });
  }
};

// Eliminar una reseña específica
const deleteReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const deletedReview = await prisma.review.delete({
      where: { id: Number(id) },
      include: {
        booking: true,
      },
    });

    return res.status(200).json(deletedReview);
  } catch (error: any) {
    if (error.code === 'P2025') { // Error si la reseña no existe
      return res.status(404).json({ error: "Reseña no encontrada." });
    }
    return res.status(500).json({ error: "Error al eliminar la reseña." });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    return getReviewById(req, res);
  } else if (req.method === "PUT") {
    return updateReview(req, res);
  } else if (req.method === "DELETE") {
    return deleteReview(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
}
