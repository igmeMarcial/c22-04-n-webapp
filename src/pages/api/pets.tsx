import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Crear una nueva mascota
const createPet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, name, species, breed, age, weight, special_instructions, medical_needs, is_active } = req.body;

  try {
    const newPet = await prisma.pet.create({
      data: {
        userId,
        name,
        species,
        breed,
        age,
        weight,
        special_instructions,
        medical_needs,
        is_active,
      },
    });
    return res.status(201).json(newPet);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todas las mascotas
const getPets = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const pets = await prisma.pet.findMany({
        include: {
          owner: true, // Incluye la información del usuario asociado a cada mascota
        },
      });
      return res.status(200).json(pets);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching pets" });
    }
  };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createPet(req, res);
  } else if (req.method === "GET") {
    return getPets(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
