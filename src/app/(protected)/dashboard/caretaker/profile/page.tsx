import React from "react";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";
import CaregiverProfile from "@/components/caregiver-profiles/CaregiverProfile";

async function page() {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className="p-0 md:p-4 min-h-[calc(100vh-126px)]">
      <CaregiverProfile user={session.user} />;
    </div>
  );
}
export default page;
