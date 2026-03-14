import { useEffect, useState } from "react";
import { Bot, MessageSquare, Globe, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/userApi";

interface StatCard {
  label: string;
  value: string;
  icon: React.ElementType;
  change?: string;
}

export default function Overview() {
  const [stats, setStats] = useState({ chatbots: 0, conversations: 0 });
  const { data: users, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: getUsers
});

  const cards: StatCard[] = [
    { label: "Active Chatbots", value: String(stats.chatbots), icon: Bot, change: "+2 this week" },
    { label: "Total Conversations", value: String(stats.conversations), icon: MessageSquare, change: "—" },
    { label: "Languages Supported", value: "30+", icon: Globe },
    { label: "Resolution Rate", value: "—", icon: TrendingUp },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Overview.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Real-time telemetry from your autonomous intelligence network.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={card.label} className="group relative rounded-3xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-primary/20 overflow-hidden">
            {/* Visual Flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/30 transition-colors">
                  <card.icon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                {card.change && (
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded-full">
                    {card.change}
                  </span>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="text-4xl font-black text-white tracking-tighter">
                  {card.value === "—" ? (
                    <span className="text-gray-600">NULL</span>
                  ) : card.value}
                </div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  {card.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-10 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -mr-48 -mb-48" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Initialize New Node</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Expand your operational reach by deploying a new autonomous neural link. 
              Configure custom logic, voice matrices, and data synapses in minutes.
            </p>
          </div>
          <a 
            href="/dashboard/chatbots" 
            className="flex-shrink-0 bg-primary text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_40px_rgba(34,211,238,0.2)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] hover:scale-[1.05] transition-all duration-300"
          >
            Deploy Link →
          </a>
        </div>
      </div>
      {/* USERS SECTION */}

<div className="space-y-4">
  <h2 className="text-2xl font-bold text-white">Users</h2>

  {isLoading && <p className="text-gray-400">Loading users...</p>}

  {error && <p className="text-red-400">Error loading users</p>}

  {users?.map((user: any) => (
    <div
      key={user._id}
      className="border border-white/10 p-4 rounded-xl bg-white/[0.03]"
    >
      <p className="text-white font-semibold">{user.name}</p>
      <p className="text-gray-400 text-sm">{user.email}</p>
    </div>
  ))}
</div>
    </div>
  );
}
