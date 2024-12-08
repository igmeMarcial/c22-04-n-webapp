import React from "react";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";
import CaregiverProfile from "@/components/caregiver-profiles/CaregiverProfile";

async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr_0fr] gap-4 p-0 md:p-4 min-h-[calc(100vh-126px)]">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
        <CaregiverProfile user={session.user} />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
      </div>

      <div className="hidden lg:block bg-white border border-gray-200 rounded-lg shadow-sm">
        {/*  opcional para pantallas grandes */}
      </div>
    </div>
  );
}

export default page;