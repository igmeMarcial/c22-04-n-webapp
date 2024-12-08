"use client";
import {
  Search,
  Bell,
  LayoutDashboard,
  Settings,
  LogOut,
  Lock,
  PawPrint,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";
import { useState } from "react";

const HeaderDashboard = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  if (!user)
    return (
      <div className="size-8 animate-pulse rounded-full border bg-muted" />
    );
  return (
    <>
      <div className="w-full bg-white border-b px-4 py-3 fixed top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#222F92] rounded-full flex items-center justify-center overflow-hidden">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <PawPrint className="w-7 h-7 text-white" />
                </motion.div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#222F92] to-[#148E8F] bg-clip-text text-transparent">
                  PetCare
                </h1>
                <p className="text-xs text-gray-600">Panel de Administración</p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center space-x-6">
            {/* Search Dialog */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <div className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                  <Search className="w-6 h-6 text-gray-600" />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Búsqueda Rápida</DialogTitle>
                </DialogHeader>
                <div className="relative mt-4">
                  <Input
                    type="text"
                    placeholder="Buscar usuarios, mascotas, servicios..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </DialogContent>
            </Dialog>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full relative transition-colors duration-200"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
              />
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserAvatar
                      user={{
                        name: user.name ?? "",
                        image: user.image ?? null,
                      }}
                      className="size-9 border-2 border-[#222F92]/20 cursor-pointer"
                    />
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-start gap-3 p-3"
                  >
                    <UserAvatar
                      user={{
                        name: user.name ?? "",
                        image: user.image ?? null,
                      }}
                      className="size-10 border-2 border-[#222F92]/20"
                    />
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.name && (
                        <p className="font-medium text-base">{user.name}</p>
                      )}
                      {user.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </motion.div>
                  <DropdownMenuSeparator />

                  {user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="flex items-center space-x-2.5 p-2 hover:bg-[#222F92]/10 transition-colors duration-200"
                      >
                        <Lock className="size-4" />
                        <p className="text-sm">Panel de Admin</p>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className="flex items-center space-x-2.5 p-2 hover:bg-[#222F92]/10 transition-colors duration-200"
                    >
                      <LayoutDashboard className="size-4" />
                      <p className="text-sm">Panel Principal</p>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-2.5 p-2 hover:bg-[#222F92]/10 transition-colors duration-200"
                    >
                      <Settings className="size-4" />
                      <p className="text-sm">Configuración</p>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer p-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                    onSelect={(event) => {
                      event.preventDefault();
                      signOut({
                        callbackUrl: `${window.location.origin}/`,
                      });
                    }}
                  >
                    <div className="flex items-center space-x-2.5">
                      <LogOut className="size-4" />
                      <p className="text-sm">Cerrar Sesión</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[72px]"></div>
    </>
  );
};

export default HeaderDashboard;
