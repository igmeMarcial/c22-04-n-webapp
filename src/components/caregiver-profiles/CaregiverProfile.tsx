"use client";
import React, { useState } from "react";
import {  createCaregiverProfile } from "@/actions/caregivers-actions";

interface CaregiverProfileData {
    userId: string;
    experience: string;
    description: string;
    coverage_radius_KM: number;
    verified: number;
    verification_date: Date;
  }

interface UserType {
    id: string;
    // Add other user properties if needed
}

const CreateCaregiverProfile  = ({ user }: { user: UserType }) => {
    const [formData, setFormData] = useState<CaregiverProfileData>({
        userId: user.id,
        experience: "",
        description: "",
        coverage_radius_KM: 0,
        verified: 0,
        verification_date: new Date(),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
    
        const dataToSend = {
            ...formData,
        };
    
        console.log(dataToSend); // Verifica los datos
    
        try {
            await createCaregiverProfile(dataToSend);
        } catch (err) {
            setError("Hubo un error al crear el perfil");
            setIsSubmitting(false);
        }
    };
    
    

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Crear Perfil de Cuidador</h2>

            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                        Experiencia
                    </label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="coverage_radius_KM" className="block text-sm font-medium text-gray-700">
                        Radio de Cobertura (KM)
                    </label>
                    <input
                        type="number"
                        id="coverage_radius_KM"
                        name="coverage_radius_KM"
                        value={formData.coverage_radius_KM}
                        onChange={handleChange}
                        required
                        min={0}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="verified" className="block text-sm font-medium text-gray-700">
                        Verificado
                    </label>
                    <select
                        id="verified"
                        name="verified"
                        value={formData.verified}
                        onChange={(e) => setFormData({ ...formData, verified: parseInt(e.target.value) })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value={0}>No</option>
                        <option value={1}>Sí</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="verification_date" className="block text-sm font-medium text-gray-700">
                        Fecha de Verificación
                    </label>
                    <input
                        type="date"
                        id="verification_date"
                        name="verification_date"
                        value={formData.verification_date.toISOString().split("T")[0]} // Formatear a fecha ISO
                        onChange={(e) => setFormData({ ...formData, verification_date: new Date(e.target.value) })}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
                    >
                        {isSubmitting ? "Guardando..." : "Guardar Perfil"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCaregiverProfile;