"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { HeartIcon, PawPrintIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="px-2 md:px-16 relative min-h-screen flex items-center bg-gradient-to-br from-[#222F92]/5 to-[#148E8F]/5">
      <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-2 text-[#148E8F]">
            <SparklesIcon className="w-6 h-6" />
            <span className="font-medium">Pet Care</span>
          </div>

          <h1 className="text-5xl font-bold text-[#222F92] leading-tight">
            La plataforma más confiable para cuidar a tu mascota
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Encuentra cuidadores experimentados y reserva en minutos. Conectamos
            a los amantes de las mascotas con profesionales de confianza.
          </p>

          <div className="flex space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={"/pets"}>
                <Button
                  size="lg"
                  className="bg-[#222F92] hover:bg-[#222F92]/90 transition-colors"
                >
                  <PawPrintIcon className="mr-2 h-5 w-5" />
                  Explorar servicios
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-[#148E8F] text-[#148E8F] hover:bg-[#148E8F]/10 hidden md:flex"
              >
                <HeartIcon className="mr-2 h-5 w-5" />
                Registrarme ahora
              </Button>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                  alt="User"
                  fill
                  className="rounded-full border-2 border-white object-cover"
                  sizes="(max-width: 768px) 32px, 32px"
                />
              </div>
              <div className="w-8 h-8 relative">
                <Image
                  src="https://xsgames.co/randomusers/avatar.php?g=female "
                  alt="User"
                  fill
                  className="rounded-full border-2 border-white object-cover"
                  sizes="(max-width: 768px) 32px, 32px"
                />
              </div>
              <div className="w-8 h-8 relative">
                <Image
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel "
                  alt="User"
                  fill
                  className="rounded-full border-2 border-white object-cover"
                  sizes="(max-width: 768px) 32px, 32px"
                />
              </div>
            </div>
            <span>+500 Cuidadores verificados</span>
          </div>
        </motion.div>

        {/* Hero Image/Animation */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative w-full max-w-[500px]">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#148E8F]/10 rounded-full animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#222F92]/10 rounded-full animate-blob animation-delay-2000"></div>

            <img
              src="/images/hero.png "
              alt="Mascotas felices con cuidadores"
              className="relative z-10 rounded-2xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white/50"></div>
    </div>
  );
};

export default HeroSection;
