"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Save, X } from "lucide-react";
import { getCaregiverProfiles, updateCaregiverProfile } from "@/actions/caregivers-actions";

const CaregiverProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getCaregiverProfiles();
      setProfile(data);
    };
    loadProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdatedProfile(profile);
  };

  const handleSave = async () => {
    const updatedData = await updateCaregiverProfile(updatedProfile);
    setProfile(updatedData);
    setIsEditing(false);
  };

  if (!profile) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Caregiver Profile</h1>

      {/* Profile Information */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <button 
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" 
            onClick={handleEditToggle}
          >
            <Edit size={16} /> Edit
          </button>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>Experience:</strong> {profile.experience}</p>
          <p><strong>Description:</strong> {profile.description}</p>
          <p><strong>Coverage Radius:</strong> {profile.coverage_radius_KM} KM</p>
          <p><strong>Verified:</strong> {profile.verified ? "Yes" : "No"}</p>
          <p><strong>Average Rating:</strong> {profile.average_rating}</p>
          <p><strong>Total Reviews:</strong> {profile.total_reviews}</p>
        </div>
      </div>

      {/* Rates */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Rates</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Service ID</th>
                <th className="border border-gray-300 p-2 text-left">Base Price</th>
                <th className="border border-gray-300 p-2 text-left">Additional Hour Price</th>
              </tr>
            </thead>
            <tbody>
              {profile.rates.map((rate) => (
                <tr key={rate.id}>
                  <td className="border border-gray-300 p-2">{rate.serviceId}</td>
                  <td className="border border-gray-300 p-2">${rate.base_price.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">${rate.additional_hour_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Availability */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Availability</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Weekday</th>
                <th className="border border-gray-300 p-2 text-left">Start Time</th>
                <th className="border border-gray-300 p-2 text-left">End Time</th>
              </tr>
            </thead>
            <tbody>
              {profile.availability.map((slot) => (
                <tr key={slot.id}>
                  <td className="border border-gray-300 p-2">{
                    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][slot.weekday]
                  }</td>
                  <td className="border border-gray-300 p-2">{slot.start_time}</td>
                  <td className="border border-gray-300 p-2">{slot.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }} 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleEditToggle}>
                <X size={18} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Experience</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={updatedProfile.experience || ""}
                  onChange={(e) => setUpdatedProfile({ ...updatedProfile, experience: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  rows={3}
                  value={updatedProfile.description || ""}
                  onChange={(e) => setUpdatedProfile({ ...updatedProfile, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Coverage Radius (KM)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  value={updatedProfile.coverage_radius_KM || 0}
                  onChange={(e) => setUpdatedProfile({ ...updatedProfile, coverage_radius_KM: Number(e.target.value) })}
                />
              </div>
            </form>
            <div className="mt-6 flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" 
                onClick={handleEditToggle}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                onClick={handleSave}
              >
                <Save size={16} className="inline-block mr-1" /> Save
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CaregiverProfilePage;
