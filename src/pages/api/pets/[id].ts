import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Obtener una mascota específica
const getPetById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: Number(id) },
    });

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    return res.status(200).json(pet);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching pet" });
  }
};

// Editar una mascota específica
const updatePet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { name, species, breed, age, weight, special_instructions, medical_needs, is_active } = req.body;

  try {
    const updatedPet = await prisma.pet.update({
      where: { id: Number(id) },
      data: {
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

    return res.status(200).json(updatedPet);
  } catch (error) {
    return res.status(500).json({ error: "Error updating pet" });
  }
};

// Eliminar una mascota específica
const deletePet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const deletedPet = await prisma.pet.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deletedPet);
  } catch (error) {
    return res.status(500).json({ error: "Error deleting pet" });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    return getPetById(req, res);
  } else if (req.method === "PUT") {
    return updatePet(req, res);
  } else if (req.method === "DELETE") {
    return deletePet(req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
