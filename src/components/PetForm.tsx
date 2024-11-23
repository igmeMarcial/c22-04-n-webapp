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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setSuccess('Pet created successfully!');
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
      setError(err.message || 'Error creating pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">Create a New Pet</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="species" className="block text-sm font-medium">
          Species
        </label>
        <input
          type="text"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="breed" className="block text-sm font-medium">
          Breed
        </label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min={0}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min={0}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="special_instructions" className="block text-sm font-medium">
          Special Instructions
        </label>
        <textarea
          id="special_instructions"
          name="special_instructions"
          value={formData.special_instructions}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        ></textarea>
      </div>

      <div>
        <label htmlFor="medical_needs" className="block text-sm font-medium">
          Medical Needs
        </label>
        <textarea
          id="medical_needs"
          name="medical_needs"
          value={formData.medical_needs}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        ></textarea>
      </div>

      <div>
        <label htmlFor="is_active" className="block text-sm font-medium">
          Active Status
        </label>
        <select
          id="is_active"
          name="is_active"
          value={formData.is_active ? '1' : '0'}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.value === '1' })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Creating...' : 'Create Pet'}
      </button>
    </form>
  );
};

export default PetForm;
