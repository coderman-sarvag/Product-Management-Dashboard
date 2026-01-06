import Link from "next/link";

export default function PublicNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
      <h1 className="text-xl font-bold text-indigo-400">AdminPanel</h1>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-indigo-400">Home</Link>
        <Link href="/about" className="hover:text-indigo-400">About</Link>
        <Link href="/login" className="px-4 py-1 bg-indigo-500 rounded hover:bg-indigo-600">
          Login
        </Link>
      </div>
    </nav>
  );
}
