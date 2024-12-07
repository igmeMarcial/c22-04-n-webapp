"use client";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalInfo, personalInfoSchema } from "@/lib/validation/login";

interface PersonalInfoStepProps {
  initialData: PersonalInfo;
  onSubmit: (data: PersonalInfo) => void;
}

export function PersonalInfoStep({
  initialData,
  onSubmit,
}: PersonalInfoStepProps) {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" flex items-center justify-center p-4"
    >
      <Card className="border-none   w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#222F92]">
            Información Personal
          </CardTitle>
          <CardDescription className="text-gray-600">
            Completa tus datos personales
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingresa tu nombre" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Apellido
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingresa tu apellido" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Teléfono
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Ingresa tu número de teléfono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Dirección
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingresa tu dirección" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#222F92] text-white hover:bg-[#148E8F] transition-all"
              >
                Continuar
              </Button>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
