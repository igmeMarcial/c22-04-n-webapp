"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { SvgLogo } from "./Icons";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import RegistrationModal from "./login/registration-modal";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle user role-based navigation
  const handleDashboardClick = () => {
    if (session?.user.role === "USER") {
      setIsRegistrationOpen(true);
    } else if (session?.user.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <nav className="w-full bg-white border-b px-4 py-3 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link className="flex items-center space-x-2" href={"/"}>
              <SvgLogo className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-lg font-semibold text-[#222F92] hidden md:block">
                Pet Care
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {session ? (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleDashboardClick}
                  className="gap-2 px-5 rounded-full bg-[#222F92] hover:bg-[#222F92]/90 text-white"
                  variant="default"
                  size="sm"
                >
                  <span>
                    {session.user.role == "OWNER"
                      ? "Buscar Cuidador"
                      : session.user.role === "CARETAKER"
                      ? "Ofrecer mi servicio"
                      : session.user.role === "USER"
                      ? "Elegir mi rol"
                      : "Administrar"}
                  </span>
                </Button>

                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-9 w-9 transition transform hover:scale-105">
                      <AvatarImage
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                      />
                      <AvatarFallback className="bg-[#148E8F] text-white">
                        {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        signOut({
                          callbackUrl: `${window.location.origin}/`,
                        });
                      }}
                      className="text-red-600"
                    >
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-[#222F92] transition-colors duration-300 text-sm"
                >
                  Iniciar Sesión
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="bg-[#222F92] hover:bg-[#222F92]/90 text-white rounded-full px-6"
                  >
                    Registrar
                  </Button>
                </Link>
              </>
            ) : (
              <Skeleton className="h-9 w-28 rounded-full" />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-[#222F92]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              {session ? (
                <>
                  <Button
                    onClick={() => {
                      handleDashboardClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="gap-2 px-5 rounded-full bg-[#222F92] hover:bg-[#222F92]/90 text-white"
                    variant="default"
                    size="sm"
                  >
                    <span>Dashboard</span>
                  </Button>
                  <div className="flex items-center space-x-3 p-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                      />
                      <AvatarFallback className="bg-[#148E8F] text-white">
                        {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    onSelect={(event) => {
                      event.preventDefault();
                      signOut({
                        callbackUrl: `${window.location.origin}/`,
                      });
                    }}
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 justify-start"
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                status !== "loading" && (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-600 hover:text-[#222F92] transition-colors duration-300 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="default"
                        className="bg-[#222F92] hover:bg-[#222F92]/90 text-white rounded-full px-6 w-full"
                      >
                        Registrar
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-[60px]"></div>

      {/* Registration Modal - Only shown for users with USER role */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
};

export default Header;
