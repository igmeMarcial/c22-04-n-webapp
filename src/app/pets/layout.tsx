import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function PetsLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Contenedor Principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido Principal */}
        <main className="flex-1 p-1">{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
