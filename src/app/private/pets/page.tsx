"use client";
import React from "react";
import PetsList from "../../../components/pets/PetsList";
import BookingStatusList from "@/components/booking/BookingStatusList";

const PetsPage: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 0fr",
        gap: "1rem",
        height: "calc(100vh - 126px)",
        padding: "1rem",
      }}
    >
      {/* Columna Izquierda */}
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <BookingStatusList userId="cm495aac50000jthd339b9yx4" />
      </div>

      {/* Columna Central - Lista de Mascotas */}
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <PetsList userId="cm495aac50000jthd339b9yx4" />
      </div>

      {/* Columna Derecha */}
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      ></div>
    </div>
  );
};

export default PetsPage;
