"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { User } from "../../../types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PawPrint, MapPin, Badge, Calendar, FileText } from "lucide-react";
import { Alert } from "../ui/Alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { toast } from "sonner";
import { updateCaregiverProfile } from "@/actions/caregivers-actions";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
  },
};

interface CaregiverProfileData {
  userId: string;
  experience: string;
  description: string;
  coverage_radius_KM: number;
  verified: number;
  verification_date: Date;
}

const UpadteCaregiverProfile = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState<CaregiverProfileData>({
    userId: user.id ?? "",
    experience: "",
    description: "",
    coverage_radius_KM: 0,
    verified: 0,
    verification_date: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await updateCaregiverProfile(formData);
      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      }
      if (result.success) {
        toast.success("Perfil actualizado exitosamente");
      }
    } catch (err) {
      setError(
        "Hubo un error al actualizar el perfil. Por favor, intente nuevamente."
      );
      toast.error(
        "Hubo un error al actualizar el perfil. Por favor, intente nuevamente"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-lg border-t-4 border-t-[#222F92]">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <PawPrint className="w-8 h-8 text-[#222F92]" />
              <CardTitle className="text-2xl text-[#222F92]">
                Únete como Cuidador en Pet Care
              </CardTitle>
            </div>
            <CardDescription>
              Completa tu perfil para comenzar a cuidar mascotas en nuestra
              plataforma
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="warning" className="mb-6">
                <span>{error}</span>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-2">
                  <Badge className="w-4 h-4 text-[#148E8F]" />
                  Experiencia
                </Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Describe tu experiencia cuidando mascotas"
                  className="min-h-[100px] resize-none"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#148E8F]" />
                  Descripción del Perfil
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre ti y por qué te gustaría ser cuidador"
                  className="min-h-[150px] resize-none"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="coverage_radius_KM"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#148E8F]" />
                  Radio de Cobertura (KM)
                </Label>
                <Input
                  type="number"
                  id="coverage_radius_KM"
                  name="coverage_radius_KM"
                  value={formData.coverage_radius_KM}
                  onChange={handleChange}
                  min={0}
                  placeholder="¿Qué distancia estás dispuesto a viajar?"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="verified" className="flex items-center gap-2">
                  <Badge className="w-4 h-4 text-[#148E8F]" />
                  Estado de Verificación
                </Label>
                <Select
                  value={formData.verified.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, verified: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado de verificación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Verificado</SelectItem>
                    <SelectItem value="1">Verificado</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label
                  htmlFor="verification_date"
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#148E8F]" />
                  Fecha de Verificación
                </Label>
                <Input
                  type="date"
                  id="verification_date"
                  name="verification_date"
                  value={formData.verification_date.toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      verification_date: new Date(e.target.value),
                    })
                  }
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#222F92] to-[#148E8F] hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Crear Perfil de Cuidador"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpadteCaregiverProfile;
