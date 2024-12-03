import { UserRole } from "@prisma/client";
import * as z from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
   lastName: z.string().min(3).max(32),   // Apellido entre 3 y 32 caracteres.
  phone: z.string().min(10).max(15),     // Teléfono debe ser una cadena entre 10 y 15 caracteres.
  address: z.string().min(5).max(100),   // Dirección debe ser entre 5 y 100 caracteres.
  latitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Latitude debe ser un número válido." }), // Latitude como número válido.
  longitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Longitude debe ser un número válido." }), // Longitude como número válido.
});

export const userRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});