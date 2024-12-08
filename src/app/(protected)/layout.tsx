import "../globals.css";
import HeaderDashboard from "@/components/HeaderAdmin";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  if (!user || !user.id) redirect("/login");
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderDashboard />
      <div className="flex flex-1 ">
        <Sidebar user={user} />
        <main className="border flex-1 ">{children}</main>
      </div>
    </div>
  );
}
