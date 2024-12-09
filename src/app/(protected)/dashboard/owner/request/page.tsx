import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle, PawPrint } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import {
  getOwnerPetRequests,
  updatePetRequestStatus,
} from "@/actions/booking-actions";
import { Badge } from "@/components/ui/Badge";

export default async function PetRequestsDashboard() {
  const petRequests = await getOwnerPetRequests();

  if (!petRequests?.length) {
    return (
      <div className="max-w-md mx-auto mt-8 animate-fade-in">
        <Alert className="bg-[#F8F9FC] border-[#222F92]/20">
          <AlertCircle className="h-5 w-5 text-[#222F92]" />
          <h2 className="text-[#222F92] font-semibold">
            Sin solicitudes pendientes
          </h2>

          <div className="text-gray-600">
            No tienes solicitudes pendientes de cuidadores en este momento.
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 border-b border-[#222F92]/10 pb-4">
        <PawPrint className="h-8 w-8 text-[#222F92]" />
        <h2 className="text-3xl font-bold tracking-tight text-[#222F92]">
          Solicitudes de Cuidadores
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {petRequests.map((pet: any) =>
          pet.caregiverRequests.map((request: any) => (
            <Card
              key={request.id}
              className="group hover:shadow-lg transition-all duration-300 border-[#148E8F]/10 hover:border-[#148E8F]/30"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-[#222F92]/10 group-hover:ring-[#222F92]/30 transition-all duration-300">
                    <AvatarImage
                      src={request.caregiver.user.image || ""}
                      alt={request.caregiver.user.name}
                    />
                    <AvatarFallback className="bg-[#222F92]/5 text-[#222F92] font-medium">
                      {request.caregiver.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-[#222F92] group-hover:text-[#222F92]/90 transition-colors duration-300">
                      {request.caregiver.user.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                      {request.caregiver.user.email}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge
                      variant="default"
                      className="bg-[#148E8F]/10 text-[#148E8F] hover:bg-[#148E8F]/20 transition-colors duration-300"
                    >
                      🐾 {pet.name}
                    </Badge>

                    {request.message && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {request.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <form
                      action={async () => {
                        "use server";
                        await updatePetRequestStatus(request.id, 1);
                      }}
                      className="flex-1"
                    >
                      <Button
                        variant="default"
                        className="w-full bg-[#222F92] hover:bg-[#222F92]/90 transition-colors duration-300 shadow-sm"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aceptar
                      </Button>
                    </form>

                    <form
                      action={async () => {
                        "use server";
                        await updatePetRequestStatus(request.id, 2);
                      }}
                      className="flex-1"
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full hover:bg-red-600/90 transition-colors duration-300 shadow-sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Rechazar
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
