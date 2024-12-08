import { getCurrentUser } from "@/lib/session";
import { UserProvider } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderDashboard from "@/components/HeaderAdmin";
import Sidebar from "@/components/Sidebar";


export default async function PrivateLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <UserProvider initialUser={user}>
      <div className="flex flex-col min-h-screen">
        <HeaderDashboard />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-1">{children}</main>
        </div>

      </div>
    </UserProvider>
  );
}
