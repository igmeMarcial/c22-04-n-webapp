"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const Sidebar: React.FC = () => {
    const { user, setUser } = useUser();
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
            <h3 style={{ fontSize: "1rem", fontWeight: "bold" }}>Usuario: {user?.name}</h3>
            <Link href="/dashboard" style={{ textDecoration: "none", color: "#333" }}>
                Dashboard
            </Link>
            <Link href="/private/pets" style={{ textDecoration: "none", color: "#333" }}>
                Perfil Dueño
            </Link>
            <Link href="/private/caregivers" style={{ textDecoration: "none", color: "#333" }}>
                Buscar Cuidador
            </Link>
            <Link href="/private/profile" style={{ textDecoration: "none", color: "#333" }}>
                Perfil Cuidador
            </Link>
            <Link href="/private/messages" style={{ textDecoration: "none", color: "#333" }}>
                Mensajes
            </Link>
            <Link href="/private/settings" style={{ textDecoration: "none", color: "#333" }}>
                Configuración
            </Link>
            <Link href="/private/help" style={{ textDecoration: "none", color: "#333" }}>
                Ayuda
            </Link>
        </div>
    );
};

export default Sidebar;
