"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Caregiver {
  id: number;
  userId: string;
  experience: string | null;
  description: string;
  coverage_radius_KM: number;
  verified: number;
  verification_date: string | null;
  average_rating: string | null;
  total_reviews: number;
  user: {
    id: string;
    email: string;
    emailVerified: string | null;
    password: string;
    name: string;
    last_name: string;
    phone: string | null;
    address: string | null;
    latitude: string | null;
    longitude: string | null;
    last_login: string | null;
    role: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: string | null;
  };
  availability: Array<{
    id: number;
    caregiverId: number;
    weekday: number;
    start_time: string;
    end_time: string;
  }>;
  rates: Array<{
    id: number;
    caregiverId: number;
    serviceId: number;
    base_price: string;
    additional_hour_price: string;
    service: {
      id: number;
      name: string;
      description: string;
      min_duration: number;
      max_duration: number;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  owner_id: string;
  caregiver_id: string;
  pet_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: number;
  total_price: string;
  additional_instructions: string;
}

interface Props {
  caregiver: Caregiver;
  onClose: () => void;
}

const CreateBookingForm = ({ caregiver, onClose }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    owner_id: "",
    caregiver_id: caregiver.id.toString(),
    pet_id: "",
    service_id: "",
    start_time: "",
    end_time: "",
    status: 0,
    total_price: "",
    additional_instructions: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate total price based on selected service and time range
  useEffect(() => {
    if (formData.start_time && formData.end_time && formData.service_id) {
      const start = new Date(formData.start_time);
      const end = new Date(formData.end_time);
      const hours = Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60);

      const selectedService = caregiver.rates.find(
        (rate) => rate.service.id.toString() === formData.service_id
      );

      if (selectedService) {
        const totalPrice = (hours * parseFloat(selectedService.base_price)).toFixed(2);
        setFormData((prev) => ({ ...prev, total_price: totalPrice }));
      }
    }
  }, [formData.start_time, formData.end_time, formData.service_id, caregiver.rates]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const data = await response.json();
      setSuccessMessage("Booking created successfully!");
      setFormData({
        owner_id: "",
        caregiver_id: caregiver.id.toString(),
        pet_id: "",
        service_id: "",
        start_time: "",
        end_time: "",
        status: 0,
        total_price: "",
        additional_instructions: "",
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Agendar Servicio</h2>
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Seleccionar Mascota</label>
          <input
            type="text"
            name="pet_id"
            value={formData.pet_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Servicio</label>
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Seleccionar Servicio</option>
            {caregiver.rates.map((rate) => (
              <option key={rate.service.id} value={rate.service.id.toString()}>
                {rate.service.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha y Hora de Inicio</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha y Hora de Finalización</label>
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Precio Total</label>
          <input
            type="text"
            name="total_price"
            value={formData.total_price}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Instrucciones Adicionales</label>
          <textarea
            name="additional_instructions"
            value={formData.additional_instructions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Confirmar Reserva
          </button>
        </div>
      </form>
      <button
        onClick={onClose}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4"
      >
        Cancelar
      </button>
    </div>
  );
}

export default CreateBookingForm;
