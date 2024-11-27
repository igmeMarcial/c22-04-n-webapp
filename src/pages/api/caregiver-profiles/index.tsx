import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Obtener todos los perfiles
        const caregivers = await prisma.caregiverProfile.findMany({
          include: {
            user: true,
            bookings: true,
            rates: true,
            availability: true,
          },
        });
        res.status(200).json(caregivers);
        break;

      case 'POST':
        // Crear un nuevo perfil
        const newCaregiver = await prisma.caregiverProfile.create({
          data: req.body,
        });
        res.status(201).json(newCaregiver);
        break;

      case 'PUT':
        // Actualizar un perfil existente
        const { id, ...data } = req.body;
        const updatedCaregiver = await prisma.caregiverProfile.update({
          where: { id },
          data,
        });
        res.status(200).json(updatedCaregiver);
        break;

      case 'DELETE':
        // Eliminar un perfil
        const { caregiverId } = req.query;
        await prisma.caregiverProfile.delete({
          where: { id: Number(caregiverId) },
        });
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
