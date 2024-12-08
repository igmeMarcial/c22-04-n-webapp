import * as z from "zod";
export const petFormSchema = z.object({
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres"),
  species: z.string()
    .min(1, "Debes seleccionar una especie"),
  breed: z.string()
    .min(1, "Debes seleccionar una raza"),
  age: z.number()
    .min(0, "La edad no puede ser negativa")
    .max(100, "La edad parece ser demasiado alta"),
  weight: z.number()
    .min(0, "El peso no puede ser negativo")
    .max(200, "El peso parece ser demasiado alto"),
  special_instructions: z.string().optional(),
  medical_needs: z.string().optional(),
  images: z.array(z.string()).optional(),
  is_active: z.number().default(1)
});

export type PetFormData = z.infer<typeof petFormSchema>;

export interface Pet extends z.infer<typeof petFormSchema> {
  id: number;
  owner: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}