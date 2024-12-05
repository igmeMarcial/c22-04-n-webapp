import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PetData {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  special_instructions: string;
  medical_needs: string;
  is_active: boolean;
}

const EditPet: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [petData, setPetData] = useState<PetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPet();
    }
  }, [id]);

  const fetchPet = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/pets/${id}`);
      if (!response.ok) {
        throw new Error("Error fetching pet data");
      }
      const data = await response.json();
      setPetData(data);
    } catch (err: any) {
      setError(err.message || "Error fetching pet data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? Number(value) : value;
    if (petData) {
      setPetData({ ...petData, [name]: parsedValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/pets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error updating pet");
      }

      setSuccess("Pet updated successfully!");
    } catch (err: any) {
      setError(err.message || "Error updating pet");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !petData) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!petData) {
    return <p>No se encontró la mascota</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold">Editar Mascota</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={petData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="species" className="block text-sm font-medium">
          Especie
        </label>
        <input
          type="text"
          id="species"
          name="species"
          value={petData.species}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="breed" className="block text-sm font-medium">
          Raza
        </label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={petData.breed}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium">
          Edad
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={petData.age}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium">
          Peso (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={petData.weight}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="special_instructions" className="block text-sm font-medium">
          Instrucciones especiales
        </label>
        <textarea
          id="special_instructions"
          name="special_instructions"
          value={petData.special_instructions}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="medical_needs" className="block text-sm font-medium">
          Necesidades médicas
        </label>
        <textarea
          id="medical_needs"
          name="medical_needs"
          value={petData.medical_needs}
          onChange={handleChange}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="is_active" className="block text-sm font-medium">
          Estado Activo
        </label>
        <select
          id="is_active"
          name="is_active"
          value={petData.is_active ? "1" : "0"}
          onChange={(e) => setPetData({ ...petData, is_active: e.target.value === "1" })}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm"
        >
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Actualizando..." : "Actualizar Mascota"}
      </button>
    </form>
  );
};

export default EditPet;
