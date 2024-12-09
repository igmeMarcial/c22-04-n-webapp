"use client";
import { createServiceWithCaregiver } from "@/actions/booking-actions";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

// Esquema de validación
const serviceFormSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  minDuration: z.number().min(30, "La duración mínima debe ser de 30 minutos"),
  maxDuration: z.number().min(60, "La duración máxima debe ser de 60 minutos"),
  basePrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Formato de precio inválido"),
  additionalHourPrice: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Formato de precio inválido"),
});

const CaregiverCreateService = () => {
  const form = useForm({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minDuration: 30,
      maxDuration: 60,
      basePrice: "10.00",
      additionalHourPrice: "60.00",
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const onSubmit = async (data: z.infer<typeof serviceFormSchema>) => {
    try {
      const newService = await createServiceWithCaregiver(
        data.name,
        data.description,
        data.minDuration,
        data.maxDuration,
        data.basePrice,
        data.additionalHourPrice
      );

      toast.info(
        `El servicio "${newService.name}" ha sido creado correctamente.`
      );

      form.reset();
    } catch (error) {
      console.log(error);
      toast.info(
        `Hubo un error al crear el servicio. Por favor, intenta nuevamente.`
      );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-1 max-w-2xl"
    >
      <Card className="w-full shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#222F92]">
            Crear Nuevo Servicio
          </CardTitle>
          <CardDescription className="text-gray-500">
            Configura los detalles del servicio que ofrecerás como cuidador de
            mascotas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Servicio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Paseo de Perros"
                        {...field}
                        className="focus:ring-[#148E8F] focus:border-[#148E8F]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu servicio..."
                        className="min-h-[100px] focus:ring-[#148E8F] focus:border-[#148E8F]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duración Mínima (minutos)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="focus:ring-[#148E8F] focus:border-[#148E8F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duración Máxima (minutos)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="focus:ring-[#148E8F] focus:border-[#148E8F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="basePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Base (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="0.00"
                          {...field}
                          className="focus:ring-[#148E8F] focus:border-[#148E8F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalHourPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio por Hora Adicional (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="0.00"
                          {...field}
                          className="focus:ring-[#148E8F] focus:border-[#148E8F]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#222F92] hover:bg-[#1a2470] transition-colors duration-300"
              >
                Crear Servicio
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CaregiverCreateService;
