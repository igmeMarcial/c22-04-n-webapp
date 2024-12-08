import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Update a pet
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "Pet ID is required" },
        { status: 400 }
      );
    }

    const updatedPet = await prisma.pet.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updatedPet, { status: 200 });
  } catch (error) {
    console.error("Error updating pet:", error);
    return NextResponse.json({ error: "Error updating pet" }, { status: 500 });
  }
}


export const DELETE = async (
  req: NextRequest,
  { params }: { params: {  id: string } }
) => {
  try {
    const { id } = params;

  console.log("Pet ID:", id); 
      if (!id) {
        return NextResponse.json(
          { error: "Pet ID is required" },
          { status: 400 }
        );
      }

    // Delete the pet with the given ID
    await prisma.pet.delete({
      where: { id: parseInt(id, 10) }, 
    });


    return NextResponse.json(
      { message: "Todo item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};





