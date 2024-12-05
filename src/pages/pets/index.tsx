import React from "react";
import PetsList from "../../components/pets/PetsList";


const PetsPage: React.FC = () => {
  return (
    <div>
      {/* El ID del usuario propietario de la mascota se pasa como prop al componente PetsList, 
      ahora este ID es fijo, pero en una aplicación real debería obtenerse dinámicamente */}
      <PetsList userId="cm495aac50000jthd339b9yx4" />

    </div>
  );
};

export default PetsPage;
