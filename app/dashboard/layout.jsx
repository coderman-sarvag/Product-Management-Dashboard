"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/sidebar/AdminSidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    console.log("DASHBOARD CHECK:", admin);

    if (!admin) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="h-screen flex bg-slate-900 text-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
