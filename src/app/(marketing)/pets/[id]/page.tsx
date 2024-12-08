import { Suspense } from "react";

import { redirect } from "next/navigation";
import { getPetById } from "@/actions/pets-action";
import { PetDetailsLanding } from "@/components/pets/PetDetailLanding";

export default async function PetDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const petId = parseInt(params.id, 10);
  const pet = await getPetById(petId);

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
