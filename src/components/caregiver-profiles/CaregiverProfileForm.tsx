import { verify } from 'crypto';
import React, { useState } from 'react';

const CaregiverProfileForm: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(true); // Estado para mostrar/ocultar el formulario
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating caregiver profile');
      }

      const data = await response.json();
      setSuccess('Perfil de cuidador creado con éxito!');
      setFormData({
        coverage_radius_KM: 0,
        experience: '',
        verified: 0,
        average_rating: 0,
        total_reviews: 0,
      });
    } catch (err: any) {
      setError(err.message || 'Error al crear el perfil del cuidador');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsFormVisible(false); // Cierra el formulario
  };

  const handleReopen = () => {
    setIsFormVisible(true); // Abre el formulario
  };

  return (
    <>
      <div
        className={`${
          isFormVisible ? 'block' : 'hidden'
        } fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50`}
        style={{
          backgroundImage: `url('/images/mi-imagen.jpg')`, // Cambia la ruta según donde esté la imagen
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6 bg-opacity-90"
        >
          <h2 className="text-xl font-bold text-center text-gray-800">Registrar nuevo perfil de cuidador</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <div>
            <label htmlFor="coverage_radius_KM" className="block text-sm font-medium text-gray-700">
              Radio de cobertura (KM)
            </label>
            <input
              type="number"
              id="coverage_radius_KM"
              name="coverage_radius_KM"
              value={formData.coverage_radius_KM}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experiencia
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="average_rating" className="block text-sm font-medium text-gray-700">
              Rating promedio
            </label>
            <input
              type="number"
              id="average_rating"
              name="average_rating"
              value={formData.average_rating}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="total_reviews" className="block text-sm font-medium text-gray-700">
              Total de reseñas
            </label>
            <input
              type="number"
              id="total_reviews"
              name="total_reviews"
              value={formData.total_reviews}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleClose} // Llama a la función onClose para cerrar el formulario
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Volver
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? 'Registrando...' : 'Registrar cuidador'}
            </button>
          </div>
        </form>
      </div>

      {!isFormVisible && (
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 font-sans"
          style={{
            backgroundImage: `url('/images/mi-imagen.jpg')`, // Cambia la ruta según donde esté la imagen
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 className="text-3xl font-bold">Bienvenido a la página de registro de cuidadores</h1>
          <p className="mt-4 text-lg text-center">Aquí puedes modificar el estado de los cuidadores</p>
          <button
            onClick={handleReopen} // Llama a la función para reabrir el formulario
            className="mt-6 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reabrir formulario de registro
          </button>
        </div>
      )}
    </>
  );
};

export default CaregiverProfileForm;
