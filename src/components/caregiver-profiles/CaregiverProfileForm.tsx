import { verify } from 'crypto';
import React, { useState } from 'react';

interface CaregiverProfileFormProps {
  userId: string; // ID del usuario asociado al perfil del cuidador
}

const CaregiverProfileForm: React.FC<CaregiverProfileFormProps> = ({ userId }) => {
  const [formData, setFormData] = useState({
    coverage_radius_KM: 0,
    experience: '',
    verified: 0,
    average_rating: 0,
    total_reviews: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? Number(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/caregiver-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating caregiver profile');
      }

      const data = await response.json();
      setSuccess('Caregiver profile created successfully!');
      setFormData({
        coverage_radius_KM: 0,
        experience: '',
        verified: 0,
        average_rating: 0,
        total_reviews: 0,
      });

    } catch (err: any) {
      setError(err.message || 'Error creating caregiver profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">Registrar nuevo perfil de cuidador</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <label className="block">
        <span className="text-gray-700">Radio de cobertura (KM)</span>
        <input
          type="number"
          name="coverage_radius_KM"
          value={formData.coverage_radius_KM}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Experiencia</span>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Rating promedio</span>
        <input
          type="number"
          name="average_rating"
          value={formData.average_rating}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Total de reseñas</span>
        <input
          type="number"
          name="total_reviews"
          value={formData.total_reviews}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Registrando...' : 'Registrar cuidador'}
      </button>
    </form>
  );
};

export default CaregiverProfileForm;
