"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Save, X } from "lucide-react";
import { getCaregiverProfileById, createCaregiverProfile, updateCaregiverProfile } from "@/actions/caregivers-actions";

interface CaregiverProfileType {
  id: number;
  userId: string;
  experience: string | null;
  description: string | null;
  coverage_radius_KM: number;
  verified: number;
  verification_date: Date | null;
  average_rating: number;
  total_reviews: number;
  rates?: { id: number; serviceId: string; base_price: number; additional_hour_price: number }[];  
  availability?: { id: number; weekday: number; start_time: string; end_time: string }[];  
}

const CaregiverProfile = ({ user }) => {
  const [profile, setProfile] = useState<CaregiverProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    experience: "",
    description: "",
    coverage_radius_KM: 0,
    verified: 0,
    verification_date: new Date(),
  });

  // Cargar datos del perfil
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getCaregiverProfileById(user.id);
      if (!data) {
        // Crear un nuevo perfil con datos predeterminados
        const newProfile = await createCaregiverProfile({
          userId: user.id, // Agregar el ID del usuario si es necesario
          experience: "Sin experiencia",
          description: "Descripción no proporcionada",
          coverage_radius_KM: 0,
          verified: 0,
          verification_date: new Date(),
          average_rating: 0,
          total_reviews: 0,
          rates: [], // Agregar array vacío si no tienes tarifas
          availability: [], // Agregar array vacío si no tienes disponibilidad
        });
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    };
   
    loadProfile();
   }, [user.id]);
   
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdatedProfile(profile || {});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = async () => {
    // Verifica que el perfil tenga todos los datos necesarios
    if (!updatedProfile || Object.keys(updatedProfile).length === 0) {
      alert("No hay cambios para guardar");
      return;
    }
   
    // Asegúrate de que los datos sean correctos antes de actualizar
    const updatedData = await updateCaregiverProfile(user.id, updatedProfile);
    if (updatedData) {
      setProfile(updatedData);
      setIsEditing(false);
    } else {
      alert("Error al guardar los cambios");
    }
   };
   

  if (profile === null && !isEditing) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Perfil del Cuidador</h1>
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold">Crea tu perfil</h2>
          <form>
            <div className="mt-4 space-y-2">
              <label>Experiencia</label>
              <input
                type="text"
                name="experience"
                value={updatedProfile.experience}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <label>Descripción</label>
              <textarea
                name="description"
                value={updatedProfile.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <label>Radio de Cobertura (KM)</label>
              <input
                type="number"
                name="coverage_radius_KM"
                value={updatedProfile.coverage_radius_KM}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <button
                type="button"
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Guardar Perfil
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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
            <Edit size={16} /> {isEditing ? "Cancelar" : "Editar"}
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {isEditing ? (
            <>
              <input
                type="text"
                name="experience"
                value={updatedProfile.experience}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                value={updatedProfile.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="coverage_radius_KM"
                value={updatedProfile.coverage_radius_KM}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </>
          ) : (
            <>
              <p><strong>Experiencia:</strong> {profile.experience || "No proporcionado"}</p>
              <p><strong>Descripción:</strong> {profile.description || "No proporcionado"}</p>
              <p><strong>Radio de Cobertura:</strong> {profile.coverage_radius_KM || "N/A"} KM</p>
            </>
          )}
        </div>
      </div>

      {/* Botón para guardar los cambios */}
      {isEditing && (
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      )}
    </div>
  );
};

export default CaregiverProfile;
