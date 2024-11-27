import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        // Obtener un usuario por ID
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: String(req.query.id),
            },
            include: {
              accounts: true,
              sessions: true,
              pets: true,
              bookings: true,
              caregiverProfile: true,
            },
          });

          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }

          return res.status(200).json(user);
        } catch (error) {
          console.error("Error fetching user by ID:", error);
          return res.status(500).json({ error: "Error fetching user" });
        }
      } else {
        // Obtener todos los usuarios
        try {
          const users = await prisma.user.findMany({
            include: {
              accounts: true,
              sessions: true,
              pets: true,
              bookings: true,
              caregiverProfile: true,
            },
          });

          return res.status(200).json(users);
        } catch (error) {
          console.error("Error fetching all users:", error);
          return res.status(500).json({ error: "Error fetching users" });
        }
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
