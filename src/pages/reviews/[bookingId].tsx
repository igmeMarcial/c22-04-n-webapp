import React from "react";
import { useRouter } from "next/router";
import ReviewForm from "@/components/review/ReviewForm";

const AddReviewPage: React.FC = () => {
  const router = useRouter();
  const { bookingId } = router.query; // Obtiene el bookingId de los parámetros

  if (!bookingId) {
    return <p>Cargando...</p>; // Muestra un estado de carga si el ID aún no está disponible
  }

  return (
    <div>
      <h1>Añadir Reviews</h1>
      {/* Pasa el bookingId obtenido por props */}
      <ReviewForm bookingId={Number(bookingId)} />
    </div>
  );
};

export default AddReviewPage;
