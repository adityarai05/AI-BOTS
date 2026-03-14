import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot, MessageSquare } from "lucide-react";
import { getBots } from "@/api/botApi";

interface BotRecord {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
  totalConversations?: number;
}

export default function Overview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bots"],
    queryFn: getBots,
  });

  const bots: BotRecord[] = useMemo(() => {
    const payload = Array.isArray(data?.data) ? data?.data : data?.data?.bots;
    return Array.isArray(payload) ? payload : [];
  }, [data]);

  const totalBots = bots.length;
  const totalConversations = bots.reduce(
    (sum, bot) => sum + (bot.totalConversations ?? 0),
    0
  );

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Overview.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Monitor chatbot deployment stats across the platform.
        </p>
      </header>

      {isLoading && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 text-sm text-gray-400">
          Loading stats...
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-sm text-red-200">
          Failed to load stats.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Bots</p>
              <p className="text-3xl font-black text-white">{totalBots}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Conversations</p>
              <p className="text-3xl font-black text-white">{totalConversations}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
