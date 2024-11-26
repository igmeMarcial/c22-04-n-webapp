import React, { useState, useEffect } from 'react';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CaregiverAvailability = () => {
  const [availability, setAvailability] = useState([]);
  const [formData, setFormData] = useState({
    caregiverId: 0,
    weekday: 0,
    start_time: '',
    end_time: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAvailability = async () => {
    const res = await fetch('/api/caregiver-availability');
    const data = await res.json();
    setAvailability(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = '/api/caregiver-availability';
    const body = isEditing ? { id: editId, ...formData } : formData;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setFormData({
      caregiverId: 0,
      weekday: 0,
      start_time: '',
      end_time: '',
    });
    setIsEditing(false);
    setEditId(null);
    fetchAvailability();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/caregiver-availability?availabilityId=${id}`, { method: 'DELETE' });
    fetchAvailability();
  };

  const handleEdit = (availabilityItem: any) => {
    setFormData({
      caregiverId: availabilityItem.caregiverId,
      weekday: availabilityItem.weekday,
      start_time: availabilityItem.start_time,
      end_time: availabilityItem.end_time,
    });
    setIsEditing(true);
    setEditId(availabilityItem.id);
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Caregiver Availability</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Caregiver ID</label>
          <input
            type="number"
            value={formData.caregiverId}
            onChange={(e) => setFormData({ ...formData, caregiverId: Number(e.target.value) })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weekday</label>
          <select
            value={formData.weekday}
            onChange={(e) => setFormData({ ...formData, weekday: Number(e.target.value) })}
            className="border p-2 rounded w-full"
            required
          >
            {daysOfWeek.map((day, index) => (
              <option key={index} value={index}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input
            type="datetime-local"
            value={formData.end_time}
            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Availability' : 'Create Availability'}
        </button>
      </form>

      {/* Tabla de disponibilidad */}
      <div className="mt-6">
        <table className="w-full border-collapse border border-gray-300" style={{ backgroundColor: 'white' }}>
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Caregiver ID</th>
              <th className="border border-gray-300 p-2">Weekday</th>
              <th className="border border-gray-300 p-2">Start Time</th>
              <th className="border border-gray-300 p-2">End Time</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                <td className="border border-gray-300 p-2">{item.caregiverId}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {daysOfWeek[item.weekday]}
                </td>
                <td className="border border-gray-300 p-2 text-center">{new Date(item.start_time).toLocaleString()}</td>
                <td className="border border-gray-300 p-2 text-center">{new Date(item.end_time).toLocaleString()}</td>
                <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

export default CaregiverAvailability;
