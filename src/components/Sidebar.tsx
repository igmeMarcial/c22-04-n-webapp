"use client";
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div
      style={{
        width: "250px", // Ancho fijo para la barra lateral

        backgroundColor: "#f4f4f4",
        borderRight: "1px solid #ddd",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem", // Espaciado entre elementos
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Navegación</h2>
      <Link href="/dashboard" style={{ textDecoration: "none", color: "#333" }}>
        Dashboard
      </Link>
      <Link href="/pets" style={{ textDecoration: "none", color: "#333" }}>
        Mis Mascotas
      </Link>
      <Link href="/settings" style={{ textDecoration: "none", color: "#333" }}>
        Configuración
      </Link>
      <Link href="/help" style={{ textDecoration: "none", color: "#333" }}>
        Ayuda
      </Link>
    </div>
  );
};

export default Sidebar;
