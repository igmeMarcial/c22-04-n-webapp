import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAuthForm } from "@/components/forms/forms";
import { ArrowLeftIcon, SparklesIcon } from "lucide-react";
export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222F92]/10 to-[#148E8F]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-none">
          <Link href="/" className="absolute top-4 left-4 z-10">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-5 w-5 text-[#222F92]" />
            </Button>
          </Link>

          <CardHeader className="text-center space-y-4 pb-2">
            <div className="flex justify-center">
              <SparklesIcon
                className="h-12 w-12 text-[#148E8F]"
                strokeWidth={1.5}
              />
            </div>

            <CardTitle className="text-3xl font-bold text-[#222F92]">
              Bienvenido de nuevo
            </CardTitle>

            <p className="text-muted-foreground text-sm">
              Ingresa tu correo electrónico para iniciar sesión
            </p>
          </CardHeader>

          <CardContent>
            <Suspense>
              <UserAuthForm />
            </Suspense>

            <div className="text-center mt-4">
              <Link
                href="/register"
                className="text-sm text-[#148E8F] hover:underline"
              >
                ¿No tienes una cuenta? Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
