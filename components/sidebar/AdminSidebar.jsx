"use client";
import { useEffect, useState } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      setAdmin(JSON.parse(stored));
    }
  }, []);

  const isActive = (path) => pathname.startsWith(path);

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col">
 
      <h2 className="text-xl font-bold text-indigo-400 mb-10">
        Admin Panel
      </h2>

  
      <nav className="flex flex-col gap-2 flex-1">
        <Link
          href="/dashboard/products"
          className={`px-4 py-2 rounded transition ${isActive("/dashboard/products")
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
            }`}
        >
          Products
        </Link>

        {admin?.role === "SUPER_ADMIN" && (<Link
          href="/dashboard/requests"
          className={`px-4 py-2 rounded transition ${isActive("/dashboard/requests")
              ? "bg-indigo-600"
              : "hover:bg-slate-800"
            }`}
        >
          Requests
        </Link>)}
      </nav>


      
      <button
        className="mt-auto px-4 py-2 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
        onClick={() => {
      
          localStorage.removeItem("admin");

          document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
