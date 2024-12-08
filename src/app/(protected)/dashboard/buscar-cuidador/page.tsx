import CaregiverProfileList from "@/components/caregiver-profiles/CaregiverProfileList";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

async function CareGiversPage() {
  const session = await auth();

  // Redirige si no hay sesión activa
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-0 md:p-4 min-h-[calc(100vh-126px)]">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
        <CaregiverProfileList user={session.user} />
      </div>
    </div>
  );
}

export default CareGiversPage;
