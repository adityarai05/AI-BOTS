import { Phone } from "lucide-react";

export default function VoiceAgents() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Vocal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">Matrix.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Advanced neural vocal synthesis and telephony orchestration.
        </p>
      </header>
      
      <div className="relative group p-20 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />
        <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
          <Phone className="h-10 w-10 text-gray-600" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">Vocal Matrix Offline</h3>
          <p className="text-gray-500 text-sm font-light">
            Neural synthesis pipelines are currently in the calibration phase. Signal acquisition estimated soon.
          </p>
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Development Pipeline Active</span>
        </div>
      </div>
    </div>
  );
}
