"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { SvgLogo } from "./Icons";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import RegistrationModal from "./login/registration-modal";
import { useRouter } from "next/navigation";

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
          <div className="flex items-center">
            <SvgLogo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden md:block">{/* Logo content */}</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Become a Caretaker
            </Link>

            {session ? (
              <Button
                onClick={handleDashboardClick}
                className="gap-2 px-5 rounded-full"
                variant="default"
                size="sm"
              >
                <span>Dashboard</span>
              </Button>
            ) : status === "unauthenticated" ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Iniciar Sesión
                </Link>
                <Link href="/register">
                  <Button
                    variant="default"
                    className="bg-[#4A55A2] hover:bg-[#4A55A2]/90 text-white rounded-full px-6"
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
              className="text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
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
                Become a Caretaker
              </Link>

              {session ? (
                <Button
                  onClick={() => {
                    handleDashboardClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="gap-2 px-5 rounded-full"
                  variant="default"
                  size="sm"
                >
                  <span>Dashboard</span>
                </Button>
              ) : (
                status !== "loading" && (
                  <>
                    <Link
                      href="/auth/signin"
                      className="text-gray-600 hover:text-gray-900 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant="default"
                        className="bg-[#4A55A2] hover:bg-[#4A55A2]/90 text-white rounded-full px-6 w-full"
                      >
                        Register
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
