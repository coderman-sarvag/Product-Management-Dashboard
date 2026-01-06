"use client"; "use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PublicNavbar from "@/components/navbar/PublicNavbar";
export default function LoginPage() {
  const [mode, setMode] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRequestAdmin = async () => {
  try{const res = await fetch("/api/admin/register-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Admin request sent. Wait for approval.");}
  catch{
    alert("Enter credentials to send the request.")
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log("LOGIN RESPONSE:", data);

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.setItem("admin", JSON.stringify(data));
  console.log("LOCALSTORAGE SET:", localStorage.getItem("admin"));
  document.cookie = "admin_session=true; path=/; max-age=86400; SameSite=Strict";

  window.location.href = "/dashboard/products";
};


  return (
    <>
    <PublicNavbar/>
    <div className="h-[88vh] flex items-center justify-center">
      <div className="w-96 bg-slate-950 p-6 rounded-xl shadow-lg">
        <div className="flex mb-6">
          <button
            onClick={() => setMode("admin")}
            className={`flex-1 py-2 ${mode === "admin" ? "bg-indigo-500" : "bg-slate-800"
              }`}
          >
            Admin
          </button>
          <button
            disabled
            className="flex-1 py-2 bg-slate-800 text-gray-500 cursor-not-allowed"
          >
            Customer
          </button>
        </div>
        <div className="loginform">

          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-3 p-2 rounded bg-slate-800 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-4 p-2 rounded bg-slate-800 outline-none"
            />

            <button className="w-full py-2 bg-indigo-500 rounded hover:bg-indigo-600">
              Login
            </button>
          </form>
          <p onClick={handleRequestAdmin} className="text-sm text-gray-400 text-center mt-4 cursor-pointer hover:text-indigo-400">
            Request Admin Access
          </p>
        </div>
      </div>
    </div></>
  );
}
