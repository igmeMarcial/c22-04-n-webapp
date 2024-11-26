import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    min_duration: 0,
    max_duration: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = '/api/services';
    const body = isEditing ? { id: editId, ...formData } : formData;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setFormData({ name: '', description: '', min_duration: 0, max_duration: 0 });
    setIsEditing(false);
    setEditId(null);
    fetchServices();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    fetchServices();
  };

  const handleEdit = (service: any) => {
    setFormData(service);
    setIsEditing(true);
    setEditId(service.id);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Services</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Duration</label>
            <input
              type="number"
              value={formData.min_duration}
              onChange={(e) =>
                setFormData({ ...formData, min_duration: Number(e.target.value) })
              }
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Duration</label>
            <input
              type="number"
              value={formData.max_duration}
              onChange={(e) =>
                setFormData({ ...formData, max_duration: Number(e.target.value) })
              }
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Service' : 'Create Service'}
        </button>
      </form>

      {/* Tabla de servicios */}
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300" style={{ backgroundColor: '#f1f1f1' }}>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Min Duration</th>
              <th className="border border-gray-300 p-2">Max Duration</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: any) => (
              <tr key={service.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">{service.id}</td>
                <td className="border border-gray-300 p-2">{service.name}</td>
                <td className="border border-gray-300 p-2 text-center">{service.min_duration}</td>
                <td className="border border-gray-300 p-2 text-center">{service.max_duration}</td>
                <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
