"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Save, X } from "lucide-react";
import { getCaregiverProfileById, createCaregiverProfile, updateCaregiverProfile } from "@/actions/caregivers-actions";

const CaregiverProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  // Cargar datos del perfil
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getCaregiverProfileById(user.id);
      if (!data) {
        // Crear un nuevo perfil si no existe
        const newProfile = await createCaregiverProfile(user.id);
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    };
    loadProfile();
  }, [user.id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdatedProfile(profile);
  };

  const handleSave = async () => {
    const updatedData = await updateCaregiverProfile(updatedProfile);
    setProfile(updatedData);
    setIsEditing(false);
  };

  if (!profile) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perfil del Cuidador</h1>

      {/* Información del perfil */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Información Básica</h2>
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={handleEditToggle}
          >
            <Edit size={16} /> Editar
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>Experiencia:</strong> {profile.experience || "No proporcionado"}</p>
          <p><strong>Descripción:</strong> {profile.description || "No proporcionado"}</p>
          <p><strong>Radio de Cobertura:</strong> {profile.coverage_radius_KM || "N/A"} KM</p>
          <p><strong>Verificado:</strong> {profile.verified ? "Sí" : "No"}</p>
          <p><strong>Calificación Promedio:</strong> {profile.average_rating || "Sin calificación disponible"}</p>
          <p><strong>Total de Opiniones:</strong> {profile.total_reviews || 0}</p>
        </div>
      </div>

      {/* Tarifas */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Tarifas</h2>
        {profile.rates && profile.rates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">ID del Servicio</th>
                  <th className="border border-gray-300 p-2 text-left">Precio Base</th>
                  <th className="border border-gray-300 p-2 text-left">Precio por Hora Adicional</th>
                </tr>
              </thead>
              <tbody>
                {profile.rates.map((rate) => (
                  <tr key={rate.id}>
                    <td className="border border-gray-300 p-2">{rate.serviceId}</td>
                    <td className="border border-gray-300 p-2">${rate.base_price.toFixed(2)}</td>
                    <td className="border border-gray-300 p-2">${rate.additional_hour_price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay tarifas disponibles para este cuidador.</p>
        )}
      </div>

      {/* Disponibilidad */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Disponibilidad</h2>
        {profile.availability && profile.availability.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Día</th>
                  <th className="border border-gray-300 p-2 text-left">Hora de Inicio</th>
                  <th className="border border-gray-300 p-2 text-left">Hora de Fin</th>
                </tr>
              </thead>
              <tbody>
                {profile.availability.map((slot) => (
                  <tr key={slot.id}>
                    <td className="border border-gray-300 p-2">
                      {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][slot.weekday]}
                    </td>
                    <td className="border border-gray-300 p-2">{slot.start_time}</td>
                    <td className="border border-gray-300 p-2">{slot.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay datos de disponibilidad para este cuidador.</p>
        )}
      </div>
    </div>
  );
};

export default CaregiverProfile;
