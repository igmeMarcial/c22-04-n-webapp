"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  UserPlusIcon,
  SearchCheckIcon,
  CalendarCheckIcon,
  MessageCircleHeartIcon,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: UserPlusIcon,
    title: "Crea tu perfil",
    description:
      "Registro gratuito y fácil para dueños de mascotas o cuidadores.",
    color: "#222F92",
  },
  {
    number: 2,
    icon: SearchCheckIcon,
    title: "Busca el cuidador ideal",
    description: "Filtra por ubicación, experiencia y disponibilidad.",
    color: "#148E8F",
  },
  {
    number: 3,
    icon: CalendarCheckIcon,
    title: "Reserva y coordina",
    description: "Agenda servicios y comunícate directamente con el cuidador.",
    color: "#222F92",
  },
  {
    number: 4,
    icon: MessageCircleHeartIcon,
    title: "Disfruta y califica",
    description: "Vive una experiencia segura y comparte tu opinión.",
    color: "#148E8F",
  },
];

export default function HowItWorksSection() {
  return (
    <section className=" px-2 md:px-16 py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#222F92] mb-6">
            ¿Cómo funciona Pet Care?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectar con el cuidador perfecto para tu mascota nunca ha sido tan
            simple.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-gray-200 absolute top-1/2 transform -translate-y-1/2"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.6,
                  },
                }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center relative"
              >
                {/* Step Number */}
                <div
                  className="absolute -top-5 left-1/2 transform -translate-x-1/2 
                  w-10 h-10 rounded-full flex items-center justify-center 
                  font-bold text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 mb-6 rounded-full flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: `${step.color}14`,
                    color: step.color,
                  }}
                >
                  <step.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#222F92] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
