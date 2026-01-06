import PublicNavbar from "@/components/navbar/PublicNavbar";
import BackgroundSlideshow from "@/components/home/BackgroundSlideshow";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <PublicNavbar />

   <section className="relative h-[80vh] overflow-hidden">
 
  <div className="absolute inset-0 bg-slate-900/70 z-10"></div>

  <div className="relative z-20 flex items-center justify-center h-full">
    <div className="text-center max-w-2xl px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Manage Products. Analyze Growth.
      </h1>

      <p className="text-gray-300 mb-8">
        Secure SSR Admin Dashboard for E-Commerce
      </p>

      <Link
        href="/login"
        className="inline-block px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition"
      >
        Admin Login
      </Link>
    </div>
  </div>
</section>


    </>
  );
}
