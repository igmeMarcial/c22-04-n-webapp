"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit, Save, X } from "lucide-react";
import { getCaregiverProfiles, updateCaregiverProfile } from "@/actions/caregivers-actions";

const CaregiverProfile = ( { user } ) => {
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
          <p><strong>Experience:</strong> {profile.experience || "Not provided"}</p>
          <p><strong>Description:</strong> {profile.description || "Not provided"}</p>
          <p><strong>Coverage Radius:</strong> {profile.coverage_radius_KM || "N/A"} KM</p>
          <p><strong>Verified:</strong> {profile.verified ? "Yes" : "No"}</p>
          <p><strong>Average Rating:</strong> {profile.average_rating || "No rating available"}</p>
          <p><strong>Total Reviews:</strong> {profile.total_reviews || 0}</p>
        </div>
      </div>

      {/* Rates */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Rates</h2>
        {profile.rates && profile.rates.length > 0 ? (
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
        ) : (
          <p className="text-gray-500">No rates available for this caregiver.</p>
        )}
      </div>

      {/* Availability */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Availability</h2>
        {profile.availability && profile.availability.length > 0 ? (
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
                    <td className="border border-gray-300 p-2">
                      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][slot.weekday]}
                    </td>
                    <td className="border border-gray-300 p-2">{slot.start_time}</td>
                    <td className="border border-gray-300 p-2">{slot.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No availability data for this caregiver.</p>
        )}
      </div>
    </div>
  );
};

export default CaregiverProfile;
