import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  CARETAKER = "CARETAKER",
  OWNER = "OWNER",
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
    return null;
  }

  switch (user.role) {
    case UserRole.ADMIN:
      redirect("/dashboard");
      break;
    case UserRole.CARETAKER:
      redirect("/dashboard/caretaker");
      break;
    case UserRole.OWNER:
      redirect("/dashboard/owner");
      break;
    default:
      redirect("/");
      break;
  }

  return null;
}
