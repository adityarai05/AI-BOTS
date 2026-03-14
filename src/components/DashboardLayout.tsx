import { NavLink, Outlet } from "react-router-dom";
import {
  Bot, BarChart3, PlusCircle, LogOut, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: BarChart3, label: "Overview", end: true },
  { to: "/dashboard/chatbots", icon: Bot, label: "Chatbots" },
  { to: "/dashboard/create", icon: PlusCircle, label: "Create Bot" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark min-h-screen flex bg-[#030303] text-white selection:bg-primary selection:text-white font-outfit overflow-hidden">
      {/* Dynamic Atmospheric Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 flex flex-col transition-all duration-300 transform lg:translate-x-0 lg:static",
        sidebarOpen ? "translate-x-0 outline-none shadow-[20px_0_100px_rgba(0,0,0,0.8)]" : "-translate-x-full",
        "bg-[#070707]/80 backdrop-blur-2xl border-r border-white/5"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5 relative group">
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent opacity-50" />
          <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <Bot className="h-6 w-6 text-primary animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter leading-none">MATRIX</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Interface</span>
          </div>
          <button className="ml-auto lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                "group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-black transition-all duration-300 uppercase tracking-widest",
                isActive
                  ? "bg-primary text-black shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                "group-[.active]:text-black"
              )} />
              {item.label}
              
              {/* Active Indicator Line */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-black/20 rounded-full opacity-0 group-[.active]:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-[10px] font-black">AD</div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">Aditya Matrix</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-tighter font-black">Level 4 Operator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Desktop Headless Header (Subtle) */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#030303]/30 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Neural Connection Stable</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.1em]">Uplink Speed</span>
              <span className="text-xs font-mono text-white">4.8 GB/s</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
              <LogOut className="h-5 w-5 rotate-180" />
            </Button>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-auto custom-scrollbar relative">
          <div className="absolute inset-0 ai-grid opacity-[0.03] pointer-events-none" />
          <div className="relative p-8 md:p-12 max-w-7xl mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Cinematic Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
