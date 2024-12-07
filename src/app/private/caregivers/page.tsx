"use client";
import React from "react";
import CaregiverProfileList from "@/components/caregiver-profiles/CaregiverProfileList";

const CareGiversPage: React.FC = () => {
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
        <CaregiverProfileList />

      </div>

      {/* Columna Central - Lista de Mascotas */}
      <div
        style={{
          border: "2px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >

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

export default CareGiversPage;
