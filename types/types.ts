import { User as UserNext } from "next-auth";






export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  CARETAKER = "CARETAKER",
  OWNER = "OWNER",
}
export type UserRole = "ADMIN" | "USER" | "CARETAKER" | "OWNER";

export interface User extends UserNext{
    role:UserRole
}



