"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserType } from "@/lib/validation/login";
import { Heart, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";

interface UserTypeStepProps {
  userType: UserType | null;
  onUserTypeChange: (value: UserType) => void;
  onNext: () => void;
}

export function UserTypeStep({
  userType,
  onUserTypeChange,
  onNext,
}: UserTypeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" flex items-center justify-center p-4"
    >
      <Card className="border-none  w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#222F92]">
            Elige tu rol
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Selecciona cómo usarás nuestra plataforma
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => onUserTypeChange("OWNER")}
              className={cn(
                "relative rounded-lg border-2 p-4 hover:shadow-md transition-all duration-200",
                userType === "OWNER"
                  ? "border-[#222F92] bg-[#222F92]/10"
                  : "border-gray-300"
              )}
            >
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "p-3 rounded-full",
                    userType === "OWNER"
                      ? "bg-[#222F92] text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  <User className="h-6 w-6" />
                </div>
                <h3
                  className={cn(
                    "font-semibold",
                    userType === "OWNER" ? "text-[#222F92]" : "text-gray-800"
                  )}
                >
                  Dueño de mascota
                </h3>
                <p className="text-sm text-center text-gray-600">
                  Quiero encontrar cuidado para mis mascotas
                </p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => onUserTypeChange("CARETAKER")}
              className={cn(
                "relative rounded-lg border-2 p-4 hover:shadow-md transition-all duration-200",
                userType === "CARETAKER"
                  ? "border-[#148E8F] bg-[#148E8F]/10"
                  : "border-gray-300"
              )}
            >
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "p-3 rounded-full",
                    userType === "CARETAKER"
                      ? "bg-[#148E8F] text-white"
                      : "bg-gray-200 text-gray-600"
                  )}
                >
                  <Heart className="h-6 w-6" />
                </div>
                <h3
                  className={cn(
                    "font-semibold",
                    userType === "CARETAKER"
                      ? "text-[#148E8F]"
                      : "text-gray-800"
                  )}
                >
                  Cuidador
                </h3>
                <p className="text-sm text-center text-gray-600">
                  Quiero ofrecer servicios de cuidado de mascotas
                </p>
              </div>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={onNext}
              disabled={!userType}
              className="w-full bg-[#222F92] text-white hover:bg-[#148E8F] transition-all"
            >
              Continuar
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
