"use client";

import { actualizarPerfilCuidador } from "@/actions/caregiver-actions";
import { useState } from "react";

export default function Caregiver() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleConvertirEnCuidador = async () => {
    setLoading(true);
    setMessage(null);

    try {
      await handleConvertirEnCuidador();
      setMessage(
        "¡Ahora eres cuidador! Puedes comenzar a ofrecer tus servicios."
      );
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message); // Extrae el mensaje si es un error estándar
      } else {
        setMessage(String(error)); // Convierte a string cualquier otro tipo
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const experience = formData.get("experience") as string;
    const description = formData.get("description") as string;
    const coverage_radius_KM = Number(formData.get("coverage_radius_KM"));

    const rates = [
      { serviceId: 1, base_price: 20, additional_hour_price: 10 }, // Puedes conectar esto dinámicamente
    ];

    const availability = [
      { weekday: 1, start_time: "09:00", end_time: "17:00" }, // También puede ser dinámico
    ];

    await actualizarPerfilCuidador({
      experience,
      description,
      coverage_radius_KM,
      rates,
      availability,
    });
    alert("Perfil actualizado con éxito");
  };
  return (
    <div className="container mx-auto p-6 max-w-2xl bg-white shadow-lg rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Convertirse en Cuidador
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Al convertirte en cuidador, podrás ofrecer servicios a los dueños de
        mascotas.
      </p>
      <div className="text-center mb-6">
        <button
          onClick={handleConvertirEnCuidador}
          disabled={loading}
          className={`btn-primary px-6 py-2 rounded-md font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Convirtiendo..." : "Convertirme en Cuidador"}
        </button>
      </div>
      {message && (
        <p className="text-center text-sm text-green-600 mb-6">{message}</p>
      )}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Experiencia
            </label>
            <textarea
              id="experience"
              name="experience"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="coverage_radius_KM"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Radio de cobertura (KM)
            </label>
            <input
              type="number"
              id="coverage_radius_KM"
              name="coverage_radius_KM"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
            >
              Actualizar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
