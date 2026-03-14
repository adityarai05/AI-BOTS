import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { getBots } from "@/api/botApi";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";

interface BotRecord {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
}

export default function Chatbots() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bots"],
    queryFn: getBots,
  });

  const bots = useMemo(() => {
    const payload = Array.isArray(data?.data) ? data?.data : data?.data?.bots;
    const list: BotRecord[] = Array.isArray(payload) ? payload : [];
    return list.map((bot) => ({
      id: bot.id ?? bot._id ?? "",
      name: bot.name ?? "Untitled Bot",
      description: bot.description ?? "",
    }));
  }, [data]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            Chatbot <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Library.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
            Manage all your AI chatbots from one place.
          </p>
        </header>

        <Button
          onClick={() => navigate("/dashboard/create")}
          className="bg-primary text-black hover:scale-105 transition-all duration-300 px-8 py-6 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <Plus className="h-5 w-5 mr-2 stroke-[3px]" /> Create Bot
        </Button>
      </div>

      {isLoading && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 text-sm text-gray-400">
          Loading bots...
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-sm text-red-200">
          Failed to load chatbots.
        </div>
      )}

      {!isLoading && !isError && bots.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center text-gray-400">
          No bots yet. Create your first chatbot to get started.
        </div>
      )}

      {!isLoading && !isError && bots.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={{ id: bot.id, name: bot.name, description: bot.description }}
              onTrain={(botId) => navigate(`/dashboard/knowledge/${botId}`)}
              onTest={(botId) => navigate(`/dashboard/test/${botId}`)}
              onEmbed={(botId) => navigate(`/dashboard/embed/${botId}`)}
              onAnalytics={(botId) => navigate(`/dashboard/analytics/${botId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
