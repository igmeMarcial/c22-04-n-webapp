import React from "react";
import ReviewForm from "@/components/review/ReviewForm";

const AddReviewPage: React.FC = () => {
  return (
    <div>
      <h1> Añadir Reviews </h1>
      {/* El ID del usuario propietario de la mascota se pasa como prop
      al componente PetForm, ahora este ID es fijo, pero en una aplicación
      real debería obtenerse dinámicamente */}
        <ReviewForm bookingID="1" />


    </div>
  );
};

export default AddReviewPage;
