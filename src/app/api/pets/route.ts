import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";




export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const pets = await prisma.pet.findMany({
      where: {
        userId: userId, // Ensure this matches your Prisma schema
      },
      include: {
        owner: true, // Include owner data if needed
      },
    });
    return NextResponse.json(pets, { status: 200 });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json({ error: 'Error fetching pets' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      name,
      species,
      breed,
      age,
      weight,
      special_instructions,
      medical_needs,
      is_active,
      images
    } = body;

    const newPet = await prisma.pet.create({
      data: {
        userId,
        name,
        species,
        breed,
        age,
        weight,
        special_instructions,
        medical_needs,
        is_active,
        images
        
      },
    });

    return NextResponse.json(newPet, { status: 201 });
  } catch (error) {
    console.error("Error creating new pet:", error);
    return NextResponse.json({ error: "Error creating new pet" }, { status: 500 });
  }
}