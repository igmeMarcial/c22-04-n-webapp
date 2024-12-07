import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { UserAuthForm } from "@/components/forms/forms";
import { SparklesIcon } from "lucide-react";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222F92]/10 to-[#148E8F]/10 grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-[#222F92]/5">
        <div className="text-center space-y-6 px-12">
          <SparklesIcon
            className="mx-auto h-24 w-24 text-[#148E8F] opacity-70"
            strokeWidth={1}
          />
          <h2 className="text-4xl font-bold text-[#222F92]">
            ¡Bienvenido a Pet Care!
          </h2>
          <p className="text-lg text-[#148E8F]">
            Conectamos a los amantes de las mascotas con los mejores cuidadores
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-none">
            <Link href="/login" className="absolute top-4 right-4 z-10">
              <Button variant="ghost">Iniciar sesión</Button>
            </Link>

            <CardHeader className="text-center space-y-4 pb-2">
              <div className="flex justify-center">
                <SparklesIcon
                  className="h-12 w-12 text-[#148E8F]"
                  strokeWidth={1.5}
                />
              </div>

              <CardTitle className="text-3xl font-bold text-[#222F92]">
                Crear una cuenta
              </CardTitle>

              <p className="text-muted-foreground text-sm">
                Ingresa tu correo electrónico para comenzar
              </p>
            </CardHeader>

            <CardContent>
              <Suspense>
                <UserAuthForm type="register" />
              </Suspense>

              <p className="text-center text-xs text-muted-foreground mt-4 px-4">
                Al continuar, aceptas nuestros{" "}
                <Link href="/terms" className="text-[#148E8F] hover:underline">
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link
                  href="/privacy"
                  className="text-[#148E8F] hover:underline"
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
