"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../../../types/types";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Calendar, Clock, PawPrint, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
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
  user: User;
}

interface Pet {
  id: number;
  name: string;
  owner: {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string;
  };
  species: string;
  breed: string | null;
  age: number;
  weight: number;
  special_instructions: string | null;
  medical_needs: string | null;
  is_active: number;
  createdAt: string;
  updatedAt: string;
}

const CreateBookingForm = ({ caregiver, onClose, user }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    owner_id: user.id ?? "",
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
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total price based on selected service and time range
  useEffect(() => {
    if (formData.start_time && formData.end_time && formData.service_id) {
      const start = new Date(formData.start_time);
      const end = new Date(formData.end_time);
      const hours =
        Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60);

      const selectedService = caregiver.rates.find(
        (rate) => rate.service.id.toString() === formData.service_id
      );

      if (selectedService) {
        const totalPrice = (
          hours * parseFloat(selectedService.base_price)
        ).toFixed(2);
        setFormData((prev) => ({ ...prev, total_price: totalPrice }));
      }
    }
  }, [
    formData.start_time,
    formData.end_time,
    formData.service_id,
    caregiver.rates,
  ]);

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
    console.log(loading);
    console.log(error);
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
      console.log(data);
      setSuccessMessage("Booking created successfully!");

      setFormData({
        owner_id: user.id ?? "",
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

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/pets?userId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching pets");
        }
        const data: Pet[] = await response.json();
        setPets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user.id) {
      fetchPets();
    }
  }, [user?.id]);
  const formAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={formAnimation}
      className="space-y-6 py-6"
    >
      {(successMessage || errorMessage) && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            "p-4 rounded-lg mb-6",
            successMessage
              ? "bg-green-50 text-green-900"
              : "bg-red-50 text-red-900"
          )}
        >
          {successMessage || errorMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <PawPrint className="w-4 h-4 text-[#222F92]" />
                Seleccionar Mascota
              </span>
            </Label>
            <Select
              name="pet_id"
              value={formData.pet_id}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "pet_id", value },
                } as any)
              }
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-[#222F92] focus:border-[#222F92]">
                <SelectValue placeholder="Elige tu mascota" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem
                    key={pet.id}
                    value={pet.id.toString()}
                    className="cursor-pointer hover:bg-[#222F92]/10"
                  >
                    {pet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#148E8F]" />
                Servicio
              </span>
            </Label>
            <Select
              name="service_id"
              value={formData.service_id}
              onValueChange={(value) =>
                handleChange({
                  target: { name: "service_id", value },
                } as any)
              }
            >
              <SelectTrigger className="w-full border-gray-200 focus:ring-[#148E8F] focus:border-[#148E8F]">
                <SelectValue placeholder="Selecciona el servicio" />
              </SelectTrigger>
              <SelectContent>
                {caregiver.rates.map((rate) => (
                  <SelectItem
                    key={rate.service.id}
                    value={rate.service.id.toString()}
                    className="cursor-pointer hover:bg-[#148E8F]/10"
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{rate.service.name}</span>
                      <span className="text-sm text-gray-500">
                        ${rate.base_price}/hora
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#222F92]" />
                  Inicio
                </span>
              </Label>
              <Input
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="border-gray-200 focus:ring-[#222F92] focus:border-[#222F92]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#148E8F]" />
                  Fin
                </span>
              </Label>
              <Input
                type="datetime-local"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="border-gray-200 focus:ring-[#148E8F] focus:border-[#148E8F]"
                required
              />
            </div>
          </div>

          {formData.total_price && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-gradient-to-r from-[#222F92]/10 to-[#148E8F]/10"
            >
              <Label className="text-lg font-semibold text-gray-800">
                Precio Total: ${formData.total_price}
              </Label>
            </motion.div>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Instrucciones Adicionales
            </Label>
            <Textarea
              name="additional_instructions"
              value={formData.additional_instructions}
              onChange={handleChange}
              placeholder="Detalles importantes sobre el cuidado de tu mascota..."
              className="min-h-[100px] border-gray-200 focus:ring-[#222F92] focus:border-[#222F92]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-[#222F92] hover:bg-[#222F92]/90 text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar Reserva
          </Button>
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1 border-[#148E8F] text-[#148E8F] hover:bg-[#148E8F]/10"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateBookingForm;
