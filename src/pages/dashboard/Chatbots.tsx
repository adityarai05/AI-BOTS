import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Bot, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getUserBots } from "@/lib/api";
import { useBotContext, type BotSummary } from "@/context/BotContext";
import { cn } from "@/lib/utils";

interface ApiBot {
  id?: string;
  _id?: string;
  name?: string;
  botName?: string;
  description?: string | null;
  created_at?: string;
  createdAt?: string;
}

const normalizeBot = (bot: ApiBot): BotSummary => ({
  id: bot.id ?? bot._id ?? "",
  name: bot.name ?? bot.botName ?? "Untitled Bot",
  description: bot.description ?? null,
  createdAt: bot.created_at ?? bot.createdAt ?? null,
});

export default function Chatbots() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setSelectedBot } = useBotContext();
  const [bots, setBots] = useState<BotSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchBots = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUserBots();
        const data = Array.isArray(response?.data) ? response.data : response?.data?.bots;
        const normalized = Array.isArray(data) ? data.map(normalizeBot).filter((bot) => bot.id) : [];
        if (active) setBots(normalized);
      } catch (err) {
        if (active) {
          setError("Failed to load chatbots.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchBots();
    return () => {
      active = false;
    };
  }, []);

  const hasBots = useMemo(() => bots.length > 0, [bots]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Chatbots.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
            Create, manage, and deploy AI assistants for your products.
          </p>
        </header>

        <Button
          onClick={() => navigate("/dashboard/create-bot")}
          className="bg-primary text-black hover:scale-105 transition-all duration-300 px-8 py-6 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <Plus className="h-5 w-5 mr-2 stroke-[3px]" /> Create New Bot
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && !hasBots && (
        <div className="relative group p-20 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
          <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
            <Bot className="h-10 w-10 text-gray-600" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">No Bots Yet</h3>
            <p className="text-gray-500 text-sm font-light">
              Create your first chatbot to start training and deploying an AI assistant.
            </p>
          </div>
          <Button
            onClick={() => navigate("/dashboard/create-bot")}
            className="bg-primary text-black font-black uppercase tracking-widest rounded-2xl h-12 px-8 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <Plus className="h-4 w-4 mr-2" /> Create Bot
          </Button>
        </div>
      )}

      {!loading && !error && hasBots && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="group relative rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-500 flex flex-col gap-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-emerald-400/60 to-transparent opacity-80" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg tracking-tight uppercase">{bot.name}</h3>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      {bot.createdAt ? format(new Date(bot.createdAt), "MMM d, yyyy") : "Draft"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm font-light leading-relaxed flex-1 italic">
                "{bot.description || "No description provided for this bot yet."}"
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    setSelectedBot(bot);
                    toast({ title: "Bot selected", description: `${bot.name} is now active.` });
                    navigate("/dashboard/knowledge");
                  }}
                  className="flex-1 h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
                >
                  Manage Bot
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedBot(bot);
                    navigate("/dashboard/embed");
                  }}
                  className={cn(
                    "flex-1 h-12 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest",
                    "hover:bg-white/5"
                  )}
                >
                  Embed Script
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
