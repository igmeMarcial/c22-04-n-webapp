import React, { useState, useEffect } from 'react';

const CaregiverProfiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [formData, setFormData] = useState({
        userId: '',
        experience: '',
        description: '',
        coverage_radius_KM: 0,
        verified: 0,
        average_rating: 0,
        total_reviews: 0,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // Fetch profiles from the API
    const fetchProfiles = async () => {
        const res = await fetch('/api/caregiver-profiles');
        const data = await res.json();
        setProfiles(data);
    };

    // Create or update a profile
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = '/api/caregiver-profiles';
        const body = isEditing ? { id: editId, ...formData } : formData;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        setFormData({
            userId: '',
            experience: '',
            description: '',
            coverage_radius_KM: 0,
            verified: 0,
            average_rating: 0,
            total_reviews: 0,
        });
        setIsEditing(false);
        setEditId(null);
        fetchProfiles();
    };

    // Delete a profile
    const handleDelete = async (id: number) => {
        await fetch(`/api/caregiver-profiles?id=${id}`, { method: 'DELETE' });
        fetchProfiles();
    };

    // Populate form for editing
    const handleEdit = (profile: any) => {
        setFormData(profile);
        setIsEditing(true);
        setEditId(profile.id);
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Caregiver Profiles</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded shadow">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                        <input
                            type="text"
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Coverage Radius (KM)
                        </label>
                        <input
                            type="number"
                            value={formData.coverage_radius_KM}
                            onChange={(e) =>
                                setFormData({ ...formData, coverage_radius_KM: Number(e.target.value) })
                            }
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <textarea
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="border p-2 rounded w-full"
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
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Verified (0/1)</label>
                        <input
                            type="number"
                            value={formData.verified}
                            onChange={(e) => setFormData({ ...formData, verified: Number(e.target.value) })}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Average Rating</label>
                        <input
                            type="number"
                            value={formData.average_rating}
                            onChange={(e) =>
                                setFormData({ ...formData, average_rating: Number(e.target.value) })
                            }
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Reviews</label>
                        <input
                            type="number"
                            value={formData.total_reviews}
                            onChange={(e) =>
                                setFormData({ ...formData, total_reviews: Number(e.target.value) })
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
                    {isEditing ? 'Update Profile' : 'Create Profile'}
                </button>
            </form>

            {/* Profiles Table */}
            <div className="mt-6">
                <table className="w-full border-collapse border border-gray-300" style={{ backgroundColor: 'white' }}>
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">User ID</th>
                            <th className="border border-gray-300 p-2">Experience</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile: any) => (
                            <tr key={profile.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2 text-center">{profile.id}</td>
                                <td className="border border-gray-300 p-2">{profile.userId}</td>
                                <td className="border border-gray-300 p-2">{profile.experience || 'N/A'}</td>
                                <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleEdit(profile)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(profile.id)}
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


export default CaregiverProfiles;
