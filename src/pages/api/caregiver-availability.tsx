import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Asegúrate de que Prisma esté configurado correctamente

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Obtener todas las disponibilidades de los cuidadores
        const availability = await prisma.caregiverAvailability.findMany({
          include: {
            caregiver: true, // incluir el perfil del cuidador en la respuesta
          },
        });
        res.status(200).json(availability);
        break;

      case 'POST':
        // Crear una nueva disponibilidad para un cuidador
        const { caregiverId, weekday, start_time, end_time } = req.body;
        const newAvailability = await prisma.caregiverAvailability.create({
          data: {
            caregiverId,
            weekday,
            start_time: new Date(start_time),
            end_time: new Date(end_time),
          },
        });
        res.status(201).json(newAvailability);
        break;

      case 'PUT':
        // Actualizar una disponibilidad existente
        const { id, ...updateData } = req.body;
        const updatedAvailability = await prisma.caregiverAvailability.update({
          where: { id },
          data: updateData,
        });
        res.status(200).json(updatedAvailability);
        break;

      case 'DELETE':
        // Eliminar una disponibilidad por ID
        const { availabilityId } = req.query;
        await prisma.caregiverAvailability.delete({
          where: { id: parseInt(availabilityId as string) },
        });
        res.status(204).end();
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
