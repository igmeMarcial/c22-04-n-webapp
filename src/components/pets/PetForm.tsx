import React, { useState } from 'react';

interface PetFormProps {
  userId: string; // ID del usuario propietario de la mascota
}

const PetForm: React.FC<PetFormProps> = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: 0,
    weight: 0,
    special_instructions: '',
    medical_needs: '',
    is_active: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const speciesOptions = ['Perro', 'Gato', 'Ave', 'Reptil', 'Otro'];
  const breedOptions: { [key: string]: string[] } = {
    Perro: ['Labrador', 'Bulldog', 'Poodle', 'Chihuahua'],
    Gato: ['Siames', 'Persa', 'Maine Coon', 'Siberiano'],
    Ave: ['Loro', 'Canario', 'Periquito', 'Cacatúa'],
    Reptil: ['Iguana', 'Gecko', 'Serpiente', 'Tortuga'],
    Otro: ['Desconocido'],
  };

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
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...formData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error creating pet');
      }

      const data = await response.json();
      setSuccess('¡Mascota registrada con éxito!');
      setFormData({
        name: '',
        species: '',
        breed: '',
        age: 0,
        weight: 0,
        special_instructions: '',
        medical_needs: '',
        is_active: 1,
      });
    } catch (err: any) {
      setError(err.message || 'Error registrando mascota');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url('/ruta/a/tu/imagen.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl space-y-6"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        }}
      >
        <h2 className="text-lg font-bold text-center text-gray-800">Registrar nueva mascota</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-800">
            Especie
          </label>
          <select
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Selecciona una especie</option>
            {speciesOptions.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-800">
            Raza
          </label>
          <select
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            disabled={!formData.species}
          >
            <option value="">Selecciona una raza</option>
            {formData.species &&
              breedOptions[formData.species]?.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-800">
            Edad
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min={0}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-800">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min={0}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          {loading ? 'Registrando...' : 'Registrar mascota'}
        </button>

        <button
          type="button"
          className="w-full py-2 mt-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          onClick={() => console.log('Volver a la página anterior')}
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default PetForm;
