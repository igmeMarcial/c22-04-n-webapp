import { Check, LoaderCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";

type RegistrationStep =
  | "userType"
  | "authMethod"
  | "verification"
  | "personalInfo"
  | "success";

const emailSchema = z.string().email("Correo electrónico inválido");
const personalInfoSchema = z.object({
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido es requerido"),
  street: z.string().min(1, "Calle y Número son requeridos"),
  city: z.string().min(1, "Ciudad es requerida"),
  postalCode: z.string().regex(/^\d{5}$/, "Código Postal inválido"),
});
type AuthMethod = "email" | "google";
const RegistrationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<RegistrationStep>("userType");
  const [userType, setUserType] = useState<"owner" | "caregiver" | null>(null);
  const [signInClicked, setSignInClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [personalInfoErrors, setPersonalInfoErrors] = useState<
    Record<string, string>
  >({});

  const handleAuthMethodNext = (method: AuthMethod) => {
    if (method === "email") {
      try {
        emailSchema.parse(email);
        setEmailError("");
        setStep("verification");
      } catch (error) {
        if (error instanceof z.ZodError) {
          setEmailError(error.errors[0].message);
          return;
        }
      }
    } else if (method === "google") {
      // For Google, immediately proceed to verification
      setSignInClicked(true);
      signIn("google", { redirect: false });
      setStep("personalInfo");
    }
  };

  const handleNext = () => {
    switch (step) {
      case "userType":
        setStep("authMethod");
        break;
      case "authMethod":
        break;
      case "verification":
        setStep("personalInfo");
        break;
      case "personalInfo":
        try {
          personalInfoSchema.parse(personalInfo);
          setStep("success");
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors = error.errors.reduce((acc, curr) => {
              acc[curr.path[0]] = curr.message;
              return acc;
            }, {} as Record<string, string>);
            setPersonalInfoErrors(errors);
          }
        }
        break;
      default:
        break;
    }
  };

  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    setPersonalInfoErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const renderStepContent = () => {
    switch (step) {
      case "userType":
        return (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">
                ¿Cómo te quieres registrar?
              </DialogTitle>
            </DialogHeader>
            <RadioGroup
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onValueChange={(value) =>
                setUserType(value as "owner" | "caregiver")
              }
            >
              <div className="relative">
                <RadioGroupItem
                  value="owner"
                  id="owner"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="owner"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                >
                  <div className="mb-2 rounded-full border-2 border-muted p-2 w-16 h-16 flex items-center justify-center">
                    🏠
                  </div>
                  <span className="text-sm font-medium">Como dueño</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem
                  value="caregiver"
                  id="caregiver"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="caregiver"
                  className="flex flex-col items-center justify-center rounded-lg border-2 border-muted p-4 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                >
                  <div className="mb-2 rounded-full border-2 border-muted p-2 w-16 h-16 flex items-center justify-center">
                    👤
                  </div>
                  <span className="text-sm font-medium">Como cuidador</span>
                </Label>
              </div>
            </RadioGroup>
            <Button
              onClick={handleNext}
              disabled={!userType}
              className="w-full bg-[#4A55A2] hover:bg-[#4A55A2]/90"
            >
              Siguiente
            </Button>
          </div>
        );

      case "authMethod":
        return (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">
                Elige tu método de registro
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
                <Button
                  onClick={() => handleAuthMethodNext("email")}
                  disabled={!email}
                  className="w-full mt-2 bg-[#4A55A2] hover:bg-[#4A55A2]/90"
                >
                  Siguiente
                </Button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute border-t w-full"></div>
                <span className="relative bg-white px-2 text-sm text-gray-500">
                  o continúa con
                </span>
              </div>

              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                disabled={signInClicked}
                onClick={() => handleAuthMethodNext("google")}
              >
                {signInClicked ? (
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                ) : (
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                  />
                )}{" "}
                Google
              </Button>
            </div>
          </div>
        );

      case "verification":
        return (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">
                Verificación
              </DialogTitle>
            </DialogHeader>
            <p className="text-center text-sm text-gray-500">
              Ingresa el código de 6 dígitos enviado a tu correo
            </p>
            <Input
              type="text"
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              onClick={handleNext}
              disabled={verificationCode.length !== 6}
              className="w-full bg-[#4A55A2] hover:bg-[#4A55A2]/90"
            >
              Verificar
            </Button>
          </div>
        );

      case "personalInfo":
        return (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">
                Datos personales
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Nombre"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      handlePersonalInfoChange("firstName", e.target.value)
                    }
                  />
                  {personalInfoErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {personalInfoErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Apellido"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      handlePersonalInfoChange("lastName", e.target.value)
                    }
                  />
                  {personalInfoErrors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {personalInfoErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Input
                  placeholder="Calle y Número"
                  value={personalInfo.street}
                  onChange={(e) =>
                    handlePersonalInfoChange("street", e.target.value)
                  }
                />
                {personalInfoErrors.street && (
                  <p className="text-red-500 text-xs mt-1">
                    {personalInfoErrors.street}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Ciudad"
                  value={personalInfo.city}
                  onChange={(e) =>
                    handlePersonalInfoChange("city", e.target.value)
                  }
                />
                {personalInfoErrors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {personalInfoErrors.city}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Código Postal"
                  type="text"
                  value={personalInfo.postalCode}
                  onChange={(e) =>
                    handlePersonalInfoChange("postalCode", e.target.value)
                  }
                />
                {personalInfoErrors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {personalInfoErrors.postalCode}
                  </p>
                )}
              </div>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-[#4A55A2] hover:bg-[#4A55A2]/90"
            >
              Continuar
            </Button>
          </div>
        );

      case "success":
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl">
                ¡Tu registro fue exitoso!
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-500">
              Ya puedes comenzar a usar la plataforma
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-[#4A55A2] hover:bg-[#4A55A2]/90"
            >
              Comenzar
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </button>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
