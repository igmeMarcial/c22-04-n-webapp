import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().regex(/^\+?[\d\s-]{8,}$/, "Please enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

export const userTypeSchema = z.enum(["OWNER", "CARETAKER"]);
export type UserType = z.infer<typeof userTypeSchema>;