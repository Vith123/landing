"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingTelegram from "./FloatingTelegram";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAdminAuth = pathname?.startsWith("/admin/dashboard/v1");

  // Dashboard has its own layout, don't show main Navbar/Footer
  if (isDashboard) {
    return <>{children}</>;
  }

  // Admin auth pages - minimal layout (no Navbar/Footer)
  if (isAdminAuth) {
    return <>{children}</>;
  }

  // Public pages - full layout with Navbar and Footer
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingTelegram />
    </div>
  );
}
