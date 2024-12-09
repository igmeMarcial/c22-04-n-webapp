import { Suspense } from "react";

import { redirect } from "next/navigation";
import { getPetById } from "@/actions/pets-action";
import { PetDetailsLanding } from "@/components/pets/PetDetailLanding";

type Params = Promise<{ id: string }>;
export default async function PetDetailsPage({ params }: { params: Params }) {
  const petId = await params;
  const pet = await getPetById(parseInt(petId.id, 10));

  if (!pet) {
    redirect("/pets");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Cargando detalles...</div>}>
        <PetDetailsLanding pet={pet} />
      </Suspense>
    </div>
  );
}
