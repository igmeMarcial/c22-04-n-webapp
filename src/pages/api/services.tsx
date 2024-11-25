import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // Asegúrate de configurar Prisma correctamente

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        // Obtener todos los servicios
        const services = await prisma.service.findMany();
        res.status(200).json(services);
        break;

      case 'POST':
        // Crear un nuevo servicio
        const newService = await prisma.service.create({
          data: {
            name: req.body.name,
            description: req.body.description,
            min_duration: req.body.min_duration,
            max_duration: req.body.max_duration,
          },
        });
        res.status(201).json(newService);
        break;

      case 'PUT':
        // Actualizar un servicio existente
        const updatedService = await prisma.service.update({
          where: { id: req.body.id },
          data: {
            name: req.body.name,
            description: req.body.description,
            min_duration: req.body.min_duration,
            max_duration: req.body.max_duration,
          },
        });
        res.status(200).json(updatedService);
        break;

      case 'DELETE':
        // Eliminar un servicio por ID
        await prisma.service.delete({
          where: { id: parseInt(req.query.id as string) },
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
