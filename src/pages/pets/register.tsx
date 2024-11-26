import React from "react";

import PetForm from "@/components/pets/PetForm";


const RegisterPetPage: React.FC = () => {
  return (
    <div>
      <h1> Register your pet</h1>
      {/* El ID del usuario propietario de la mascota se pasa como prop
      al componente PetForm, ahora este ID es fijo, pero en una aplicación
      real debería obtenerse dinámicamente */}
      <PetForm userId="c153c8fc-b306-48dd-87a9-9ec15756ee73" />

    </div>
  );
};

export default RegisterPetPage;
