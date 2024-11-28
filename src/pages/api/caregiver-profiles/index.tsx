import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Decimal } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un nuevo perfil de cuidador
const createCaregiver = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    userId,
    coverage_radius_KM,
    experience,
    verified,
    average_rating,
    total_reviews,
  } = req.body;

  // Validaciones básicas
  if (
    !userId ||
    typeof coverage_radius_KM !== 'number' ||
    typeof verified !== 'number' ||
    typeof average_rating !== 'number' ||
    typeof total_reviews !== 'number'
  ) {
    console.log('Request body:', req.body);
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const newCaregiver = await prisma.caregiverProfile.create({
      data: {
        userId,
        coverage_radius_KM,
        experience,
        verified,
        average_rating: new Decimal(average_rating),
        total_reviews,
      },
    });
    return res.status(201).json(newCaregiver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating caregiver profile' });
  }
};


// Obtener todos los perfiles de cuidadores
const getCaregivers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const caregivers = await prisma.caregiverProfile.findMany({
      include: {
        user: true, // Incluye la información del usuario asociado
        availability: true, // Incluye la disponibilidad
        rates: true, // Incluye las tarifas
      },
    });
    return res.status(200).json(caregivers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching caregiver profiles" });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createCaregiver(req, res);
  } else if (req.method === "GET") {
    return getCaregivers(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
