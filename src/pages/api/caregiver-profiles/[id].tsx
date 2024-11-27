import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener un perfil de cuidador específico
const getCaregiverById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const caregiver = await prisma.caregiverProfile.findUnique({
      where: { id: Number(id) },
      include: {
        user: true, // Incluye la información del usuario asociado al cuidador
        bookings: true, // Incluye las reservas
        rates: true, // Incluye las tarifas
        availability: true, // Incluye la disponibilidad
      },
    });

    if (!caregiver) {
      return res.status(404).json({ error: 'Caregiver not found' });
    }

    return res.status(200).json(caregiver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching caregiver profile' });
  }
};

// Actualizar un perfil de cuidador específico
const updateCaregiver = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const data = req.body;

  try {
    const updatedCaregiver = await prisma.caregiverProfile.update({
      where: { id: Number(id) },
      data,
    });

    return res.status(200).json(updatedCaregiver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating caregiver profile' });
  }
};

// Eliminar un perfil de cuidador específico
const deleteCaregiver = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const deletedCaregiver = await prisma.caregiverProfile.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deletedCaregiver);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error deleting caregiver profile' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    return getCaregiverById(req, res);
  } else if (method === 'PUT') {
    return updateCaregiver(req, res);
  } else if (method === 'DELETE') {
    return deleteCaregiver(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
