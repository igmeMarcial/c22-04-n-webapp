import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#222F92] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sección Sobre Nosotros */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Pet Care</h3>
            <p className="text-gray-200 text-sm">
              Conectamos a dueños de mascotas con cuidadores confiables y
              experimentados, brindando una plataforma segura y fácil de usar
              para encontrar los servicios de cuidado que necesitan.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-[#148E8F] transition-colors duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-[#148E8F] transition-colors duration-300"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-200 hover:text-[#148E8F] transition-colors duration-300"
                >
                  Cuidadores
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-200 hover:text-[#148E8F] transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-[#148E8F]" />
                <span className="text-gray-200 text-sm">
                  Av. Principal #123, Ciudad
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-[#148E8F]" />
                <span className="text-gray-200 text-sm">+34 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-[#148E8F]" />
                <span className="text-gray-200 text-sm">
                  contacto@petcare.com
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-200 text-sm mb-4">
              Suscríbete para recibir noticias y actualizaciones.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-[#148E8F] hover:bg-[#0F6A6B] text-white transition-colors duration-300">
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Redes Sociales y Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-white hover:text-[#148E8F] transition-colors duration-300"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-[#148E8F] transition-colors duration-300"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-[#148E8F] transition-colors duration-300"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
            <p className="text-gray-200 text-sm">
              © {currentYear} Pet Care. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
