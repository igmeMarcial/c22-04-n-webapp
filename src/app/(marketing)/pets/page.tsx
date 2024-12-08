import { PetListLanding } from "@/components/pets/PetsListLanding";
import { Suspense } from "react";

export default function PetsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Cargando mascotas...</div>}>
        <PetListLanding />
      </Suspense>
    </div>
  );
}
