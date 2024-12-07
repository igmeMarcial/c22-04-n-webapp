"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SuccessStepProps {
  onClose: () => void;
}
import { motion } from "framer-motion";

export function SuccessStep({ onClose }: SuccessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center p-4"
    >
      <Card className="border-none  w-full max-w-sm">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle className="h-14 w-14 text-[#148E8F]" />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-[#222F92] text-center">
            ¡Registro completado!
          </CardTitle>
          <CardDescription className="text-gray-600 text-center mt-2">
            Todo está listo para empezar a usar la plataforma
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button
              onClick={onClose}
              className="w-full bg-[#222F92] text-white hover:bg-[#148E8F] transition-all"
            >
              Comenzar
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
