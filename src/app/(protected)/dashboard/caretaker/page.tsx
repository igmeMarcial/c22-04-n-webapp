import React from "react";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

function page() {
  const session = auth();
  if (!session) redirect("/login");
  return <div>page</div>;
}

export default page;
