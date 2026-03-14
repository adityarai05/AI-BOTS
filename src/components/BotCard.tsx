import { Button } from "@/components/ui/button";
import { Bot, BookOpen, MessageSquare, Code, BarChart3 } from "lucide-react";

export interface Bot {
  id: string;
  name: string;
  description?: string;
}

interface BotCardProps {
  bot: Bot;
  onTrain: (botId: string) => void;
  onTest: (botId: string) => void;
  onEmbed: (botId: string) => void;
  onAnalytics: (botId: string) => void;
}

export default function BotCard({
  bot,
  onTrain,
  onTest,
  onEmbed,
  onAnalytics,
}: BotCardProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 space-y-6 hover:border-primary/20 hover:bg-white/[0.05] transition-all">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
          <Bot className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-black text-white uppercase tracking-tight">{bot.name}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {bot.description || "No description available yet."}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          variant="outline"
          onClick={() => onTrain(bot.id)}
          className="h-11 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Train Knowledge
        </Button>
        <Button
          variant="outline"
          onClick={() => onTest(bot.id)}
          className="h-11 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Test Bot
        </Button>
        <Button
          variant="outline"
          onClick={() => onEmbed(bot.id)}
          className="h-11 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5"
        >
          <Code className="h-4 w-4 mr-2" />
          Embed
        </Button>
        <Button
          variant="outline"
          onClick={() => onAnalytics(bot.id)}
          className="h-11 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>
    </div>
  );
}
