"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { updateUserRole } from "@/actions/update-user-role";
import { updateUserInfo } from "@/actions/update-user-info";

import { UserTypeStep } from "./user-type-step";
import { PersonalInfoStep } from "./personal-info-step";
import { SuccessStep } from "./success-step";
import { PersonalInfo, UserType } from "@/lib/validation/login";
import { useRouter } from "next/navigation";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [step, setStep] = useState<"userType" | "personalInfo" | "success">(
    "userType"
  );
  const [userType, setUserType] = useState<UserType | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const session = useSession();
  const router = useRouter();

  const handleUserTypeSelection = async (type: UserType) => {
    setUserType(type);
  };

  const handleUserTypeNext = async () => {
    if (userType) {
      setStep("personalInfo");
    }
  };

  const handlePersonalInfoSubmit = async (data: PersonalInfo) => {
    if (session.data?.user?.id && userType) {
      setPersonalInfo(data);

      // Guarda tanto el tipo de usuario como la información personal juntos
      await updateUserRole(session.data.user.id, { role: userType });
      await updateUserInfo(session.data.user.id, data);

      // Una vez que ambos se guarden correctamente, cambia el paso
      setStep("success");
    }
  };

  const handleSuccess = () => {
    onClose();
    router.push("/dashboard");
  };

  const renderStepContent = () => {
    switch (step) {
      case "userType":
        return (
          <UserTypeStep
            userType={userType}
            onUserTypeChange={handleUserTypeSelection}
            onNext={handleUserTypeNext}
          />
        );
      case "personalInfo":
        return (
          <PersonalInfoStep
            initialData={personalInfo}
            onSubmit={handlePersonalInfoSubmit}
          />
        );
      case "success":
        return <SuccessStep onClose={handleSuccess} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
