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
    <div className="h-screen w-full flex flex-col">
      <div className="flex-none">
        <HeaderDashboard />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-none">
          <Sidebar user={user} />
        </div>
        <main className="flex-1 overflow-auto ">{children}</main>
      </div>
    </div>
  );
}
