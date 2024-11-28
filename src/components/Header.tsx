"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import RegistrationModal from "./modals/RegistrationModal";
import { SvgLogo } from "./Icons";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Importa íconos de menú
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      <nav className="w-full bg-white border-b px-4 py-3 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <SvgLogo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden md:block">
              {/* <SvgLogoPhrase />
              <SvgLogoText /> */}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Ser cuidador
            </Link>

            {session ? (
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                className="hidden md:block"
              >
                <Button
                  className="gap-2 px-5 rounded-full"
                  variant="default"
                  size="sm"
                >
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : status === "unauthenticated" ? (
              <>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Inicio de Sesión
                </Link>
                <Button
                  variant="default"
                  className="bg-[#4A55A2] hover:bg-[#4A55A2]/90 text-white rounded-full px-6"
                  onClick={() => setIsRegistrationOpen(true)}
                >
                  Registro
                </Button>
              </>
            ) : (
              <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ser cuidador
              </Link>
              {session ? (
                <Link
                  href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
                  className="hidden md:block"
                >
                  <Button
                    className="gap-2 px-5 rounded-full"
                    variant="default"
                    size="sm"
                  >
                    <span>Administrar</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inicio de Sesión
                  </Link>
                  <Button
                    variant="default"
                    className="bg-[#4A55A2] hover:bg-[#4A55A2]/90 text-white rounded-full px-6 w-full"
                    onClick={() => {
                      setIsRegistrationOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Registro
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[60px]"></div>
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
};

export default Header;
