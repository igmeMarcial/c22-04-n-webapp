"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PawPrint, Upload, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { User } from "../../../types/types";
import { PetFormData, petFormSchema } from "../schema/pet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { breedOptions } from "../constant/pet";
import { MediaDto, UploadManyToS3 } from "@/lib/s3/action";
import { PetUser } from "./PetsList";
import { createPet, updatePet } from "@/actions/pets-action";
import Image from "next/image";

interface PetFormProps {
  closeModal?: () => void;
  user: User;
  pet?: PetUser | null;
}

const speciesOptions = [
  "Perro",
  "Gato",
  "Ave",
  "Reptil",
  "Hamster",
  "Conejo",
  "Tortuga",
];

const PetForm: React.FC<PetFormProps> = ({ closeModal, user, pet }) => {
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const isEditing = !!pet;
  const form = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: pet?.name ?? "",
      species: pet?.species ?? "",
      breed: pet?.breed ?? "",
      age: pet?.age ?? 0,
      weight: pet?.weight ?? 0,
      special_instructions: pet?.special_instructions ?? "",
      medical_needs: pet?.medical_needs ?? "",
      images: [],
      is_active: pet?.is_active ?? 1,
    },
  });

  useEffect(() => {
    if (pet) {
      setSelectedSpecies(pet.species);
      if (pet.images?.length > 0) {
        setPreviewImages(pet.images.map((img) => img.publicUrl));
      }
    }
  }, [pet]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: PetFormData) => {
    try {
      if (!isEditing && images.length <= 0) {
        toast.error("Fotos de tu mascota son importantes");
        return;
      }
      setLoading(true);
      let uploadedImages: MediaDto[] = [];
      if (images.length > 0) {
        uploadedImages = await UploadManyToS3(images);
      }
      const finalImages = isEditing
        ? [...pet.images, ...uploadedImages]
        : uploadedImages;

      if (isEditing) {
        const updatedPet = await updatePet(pet.id, {
          ...data,
          images: finalImages,
        });
        toast.success("Mascota actualizada exitosamente!");
        console.log(updatedPet);
      } else {
        const response = await createPet({
          ...data,
          userId: user.id ?? "",
          images: finalImages,
          special_instructions: data.special_instructions ?? "",
          medical_needs: data.medical_needs ?? "",
        });
        toast.success("Mascota creada exitosamente!");
        console.log(response);
      }
      setImages([]);
      form.reset();
      closeModal?.();
    } catch (error) {
      console.log(error);
      toast.error("Error al registrar la mascota");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSpecies !== form.getValues("species")) {
      form.setValue("breed", "");
      setSelectedSpecies(form.getValues("species"));
    }
  }, [form, selectedSpecies]);

  return (
    <div className="max-h-[600px]  overflow-y-auto px-6">
      <DialogHeader className="mb-6">
        <DialogTitle className="text-2xl font-bold text-[#222F92] flex items-center gap-2">
          <PawPrint className="w-6 h-6 text-[#148E8F]" />
          {isEditing ? "Editar Mascota" : "Registrar Nueva Mascota"}
        </DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu mascota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especie</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSpecies(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una especie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {speciesOptions.map((species) => (
                        <SelectItem key={species} value={species}>
                          {species}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raza</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!selectedSpecies}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una raza" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedSpecies &&
                        breedOptions[selectedSpecies]?.map((breed) => (
                          <SelectItem key={breed} value={breed}>
                            {breed}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad (años)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FormField
              control={form.control}
              name="special_instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instrucciones Especiales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cuidados especiales, rutinas, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="medical_needs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Necesidades Médicas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Medicamentos, alergias, condiciones médicas..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <FormLabel>Fotos de tu Mascota</FormLabel>
            <div className="flex flex-wrap gap-4">
              <AnimatePresence>
                {previewImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-24 h-24"
                  >
                    <Image
                      src={image}
                      alt={`Preview ${index + 1}`}
                      width={96}
                      height={96}
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#148E8F] transition-colors">
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-2">Subir foto</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 pt-4"
          >
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#222F92] hover:bg-[#222F92]/90"
            >
              {loading
                ? isEditing
                  ? "Actualizando..."
                  : "Registrando..."
                : isEditing
                ? "Actualizar Mascota"
                : "Registrar Mascota"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="flex-1"
            >
              Cancelar
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default PetForm;
