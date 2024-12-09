"use server";

import { revalidatePath } from "next/cache";

import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";

import { auth } from "../../auth";
import { userRoleSchema } from "@/lib/validation/user";

export type FormData = {
  role: UserRole;
};

export async function updateUserRole(userId: string, data: FormData) {
  try {
    const session = await auth();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { role } = userRoleSchema.parse(data);

    // Update the user role.
    if (role == "CARETAKER") {
      const existingCaregiverProfile = await prisma.caregiverProfile.findUnique(
        {
          where: { userId },
        }
      );
      if (!existingCaregiverProfile) {
        await prisma.caregiverProfile.create({
          data: {
            userId,
            experience: "",
            description: "",
            coverage_radius_KM: 0,
            verified: 0,
            average_rating: 0,
            total_reviews: 0,
          },
        });
        
      }
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    revalidatePath("/dashboard");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
}
