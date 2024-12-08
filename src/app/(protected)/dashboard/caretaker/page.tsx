import React from "react";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import Caregiver from "@/components/caregiver-profiles/Caregiver";
import CaregiverMain from "@/components/caregiver-profiles/CaregiverMain";

async function page() {
  const session = await auth();

  if (!session) redirect("/login");
  return (
    <>
      <CaregiverMain />
      <Caregiver />
    </>
  );
}

export default page;
