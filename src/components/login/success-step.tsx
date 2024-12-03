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

export function SuccessStep({ onClose }: SuccessStepProps) {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <CardTitle className="text-2xl text-center">
          Registration Complete!
        </CardTitle>
        <CardDescription className="text-center">
          You re all set to start using the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onClose} className="w-full">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
