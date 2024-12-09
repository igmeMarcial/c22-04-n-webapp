import type { Metadata } from "next";

import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Pet care",
  description: "La plataforma más confiable para cuidar a tu mascota",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
