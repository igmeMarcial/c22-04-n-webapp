"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  UserCheckIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";

const featureVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    icon: UserCheckIcon,
    title: "Registro fácil",
    description:
      "Crea tu perfil en minutos, ya seas dueño de mascota o cuidador.",
    color: "#222F92",
  },
  {
    icon: SearchIcon,
    title: "Búsqueda avanzada",
    description:
      "Encuentra el cuidador perfecto con filtros de localización y disponibilidad.",
    color: "#148E8F",
  },
  {
    icon: UserIcon,
    title: "Gestión de perfiles",
    description:
      "Perfiles detallados para cuidadores con verificación y reseñas.",
    color: "#222F92",
  },
  {
    icon: ShieldCheckIcon,
    title: "Proceso seguro",
    description:
      "Reservaciones rápidas y seguras con protección para mascotas y dueños.",
    color: "#148E8F",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-2 md:px-16 py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#222F92] mb-6">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pet Care simplifica el cuidado de tu mascota con herramientas
            intuitivas y servicios de confianza.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className="w-16 h-16 mb-6 rounded-full flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: `${feature.color}14`,
                  color: feature.color,
                }}
              >
                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#222F92] text-center mb-4">
                {feature.title}
              </h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
