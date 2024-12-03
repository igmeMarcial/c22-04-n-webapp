"use server";


import { prisma } from "@/lib/db";

import { revalidatePath } from "next/cache";
import { auth } from "../../auth";
import { userNameSchema } from "@/lib/validation/user";
import { PersonalInfo } from "@/lib/validation/login";



export async function updateUserInfo(userId: string, data: PersonalInfo) {
  try {
    const session = await auth()

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name,lastName, phone, address, latitude, longitude} = userNameSchema.parse(data);

    // Update the user name.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        last_name: lastName,
        phone: phone,
        address: address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    })

    revalidatePath('/dashboard/settings');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}