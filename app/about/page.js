import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  RefreshCcw, 
  Lock, 
  Search, 
  History, 
  Users, 
  Cloud 
} from 'lucide-react';
import PublicNavbar from '@/components/navbar/PublicNavbar';
export default function AboutPage() {
  const coreFeatures = [
    {
      title: "Advanced Activity Logging",
      desc: "Every modification is captured in an update log. Unlike standard logs, the system records 'diffs'—showing the exact state of data before and after an update, alongside precise timestamps .",
      icon: <History className="w-8 h-8 text-indigo-400" />
    },
    {
      title: "Splitwise-Inspired Admin Hierarchy",
      desc: "A multi-tier access system. While the Super Admin holds absolute authority to approve or reject new administrative requests, regular admins operate to manage the CRUD operations which the super admin can also do but the regular admins can't see the requests for access.",
      icon: <Users className="w-8 h-8 text-indigo-400" />
    },
    {
      title: "State-of-the-Art Authentication",
      desc: "Security is non-negotiable. Bcryptjs is implemented for one-way password hashing and manage sessions via HTTP-only cookies. This prevents client-side script access to sensitive tokens, creating a 'wall' around the dashboard.",
      icon: <Lock className="w-8 h-8 text-indigo-400" />
    },
    {
      title: "Dynamic Media & Cloud Integration",
      desc: "Product visuals are managed through Cloudinary's high-performance CDN. This ensures that high-resolution product images are used and served with minimal latency, tied directly to the MongoDB document collection.",
      icon: <Cloud className="w-8 h-8 text-indigo-400" />
    }
  ];

  return (
    <>
    <PublicNavbar/>
    <div className="min-h-screen bg-slate-950 text-gray-200 p-6 md:p-12 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto space-y-20">
        
        
        <header className="space-y-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            Project Overview
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Next-Gen <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-indigo-600">Inventory Logic</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
            A high-integrity administrative ecosystem designed to manage complex product management. 
            Built with a focus on security-first concept and data management only to the verified admins.
          </p>
        </header>

        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coreFeatures.map((feature, idx) => (
            <div key={idx} className="group p-8 bg-slate-900/40 border border-slate-800 rounded-3xl hover:bg-slate-900/60 hover:border-indigo-500/50 transition-all duration-300">
              <div className="mb-6 p-4 bg-slate-800 w-fit rounded-2xl group-hover:rotate-6 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </section>

        
        <section className="relative overflow-hidden bg-slate-900/80 border border-slate-800 rounded-[3rem] p-8 md:p-16">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">The Tech Stack</h2>
              <p className="text-gray-400">
                The architecture utilizes SWR for lightweight, reactive data fetching, ensuring the UI 
                reflects the database state without unnecessary reloads. The backend utilizes Zod and Mongoose for strict schema validation, ensuring no malformed data enters the production environment and the database.
              </p>
              <ul className="space-y-3">
                {["Full CRUD with Zod Validation", "Global Search Engine", "Cloudinary Image Buffering", "Bcrypt Security Layer"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-indigo-300">
                    <ShieldCheck className="w-5 h-5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <span className="block text-3xl font-bold text-white mb-1">100%</span>
                <span className="text-xs uppercase text-gray-500">Encrypted</span>
              </div>
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <span className="block text-3xl font-bold text-white mb-1">SWR</span>
                <span className="text-xs uppercase text-gray-500">Reactive</span>
              </div>
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center col-span-2">
                <span className="block text-3xl font-bold text-white mb-1">MongoDB</span>
                <span className="text-xs uppercase text-gray-500">Persistent Storage</span>
              </div>
            </div>
          </div>
        </section>

        
        <footer className="text-center pb-12">
          <p className="text-gray-500 text-sm italic">
            This dashboard is restricted to authorized administrative personnel only. 
            All actions are logged and associated with a verified admin identity.
          </p>
        </footer>
      </div>
    </div></>
  );
}