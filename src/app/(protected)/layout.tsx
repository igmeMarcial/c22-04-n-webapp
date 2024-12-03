import "../globals.css";
import HeaderDashboard from "@/components/HeaderAdmin";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderDashboard />
      {children}
    </div>
  );
}
