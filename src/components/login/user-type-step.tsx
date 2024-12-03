"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserType } from "@/lib/validation/login";

import { Heart, User } from "lucide-react";

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
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Choose your role</CardTitle>
        <CardDescription className="text-center">
          Select how youll be using our platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onUserTypeChange("OWNER")}
            className={cn(
              "relative rounded-lg border-2 p-4 hover:border-primary transition-all duration-200",
              userType === "OWNER"
                ? "border-primary bg-primary/5"
                : "border-muted"
            )}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "p-2 rounded-full",
                  userType === "OWNER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Pet Owner</h3>
              <p className="text-sm text-muted-foreground text-center">
                I want to find care for my pets
              </p>
            </div>
          </button>

          <button
            onClick={() => onUserTypeChange("CARETAKER")}
            className={cn(
              "relative rounded-lg border-2 p-4 hover:border-primary transition-all duration-200",
              userType === "CARETAKER"
                ? "border-primary bg-primary/5"
                : "border-muted"
            )}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "p-2 rounded-full",
                  userType === "CARETAKER"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">Caretaker</h3>
              <p className="text-sm text-muted-foreground text-center">
                I want to offer pet care services
              </p>
            </div>
          </button>
        </div>

        <Button onClick={onNext} disabled={!userType} className="w-full">
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
