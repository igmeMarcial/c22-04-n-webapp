"use client";
import React from "react";

import PetForm from "@/components/pets/PetForm";


const RegisterPetPage: React.FC = () => {
  return (
    <div>
      <h1> Register your pet</h1>
      {/* El ID del usuario propietario de la mascota se pasa como prop
      al componente PetForm, ahora este ID es fijo, pero en una aplicación
      real debería obtenerse dinámicamente */}
      <PetForm userId="cm495aac50000jthd339b9yx4" />

    </div>
  );
};

export default RegisterPetPage;
