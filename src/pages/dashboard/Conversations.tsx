import { MessageSquare } from "lucide-react";

export default function Conversations() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Synapses.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Monitor and analyze real-time communications between nodes and entities.
        </p>
      </header>
      
      <div className="relative group p-20 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />
        <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
          <MessageSquare className="h-10 w-10 text-gray-600" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">No Active Links</h3>
          <p className="text-gray-500 text-sm font-light">
            Communications will manifest here once the neural network begins processing external queries.
          </p>
        </div>
      </div>
    </div>
  );
}
