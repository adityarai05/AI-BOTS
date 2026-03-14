import { Settings } from "lucide-react";

export default function DashboardSettings() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-400">Config.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Manage your neural account and operational directives.
        </p>
      </header>

      <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 max-w-2xl relative overflow-hidden group">
        {/* Subtle Background Detail */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-gray-400">
              <Settings className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Operator Identity</h2>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Authorized Email</span>
              <span className="text-sm font-mono text-white mt-1 md:mt-0 tracking-tight">matrix_admin@supportai.com</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Operational Tier</span>
              <div className="flex items-center gap-3 mt-1 md:mt-0">
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">Elite Supreme</span>
                <span className="text-sm font-mono text-white tracking-tight">Active</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all opacity-50 cursor-not-allowed">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Neural Uplink Security</span>
              <span className="text-xs font-black text-primary uppercase tracking-widest">Manage Protocol →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
