"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Search,
  MessageCircle,
  Settings,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const session = useSession();
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarVariants = {
    collapsed: {
      width: "80px",
      transition: { duration: 0.3 },
    },
    expanded: {
      width: "250px",
      transition: { duration: 0.3 },
    },
  };

  const menuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Perfil Dueño",
      href: "/perfil-dueno",
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Buscar Cuidador",
      href: "/buscar-cuidador",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Perfil Cuidador",
      href: "/perfil-cuidador",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "Mensajes",
      href: "/mensajes",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Configuración",
      href: "/configuracion",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Ayuda",
      href: "/ayuda",
    },
  ];

  return (
    <motion.div
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className={cn(
        "bg-white",
        "shadow-xl relative",
        "flex flex-col p-4 transition-all duration-300",
        "overflow-hidden "
      )}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "absolute top-4 -right-3 z-50",
          "w-8 h-8 rounded-full",
          "bg-[#148E8F] shadow-md",
          "flex items-center justify-center",
          "hover:bg-[#148E8F]/80 transition-colors duration-200"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </motion.div>
      </motion.button>

      <div className="mb-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#222F92]/10 rounded-full flex items-center justify-center relative">
          {session?.data?.user?.image ? (
            <Image
              src={session.data?.user.image}
              alt="Perfil"
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <User />
          )}
        </div>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-semibold text-nowrap">
              {session?.data?.user?.name ?? "Usuario"}
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center p-2 rounded-lg 
              hover:bg-[#148E8F]/10
              transition-colors duration-200 
              group"
          >
            <div className=" group-hover:text-[#148E8F] transition-colors duration-200">
              {item.icon}
            </div>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  x: isExpanded ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
                className="ml-3  group-hover:text-[#148E8F] text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
