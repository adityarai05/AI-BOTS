import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, BarChart3 } from "lucide-react";
import { getAnalytics } from "@/api/analyticsApi";

export default function Analytics() {
  const { botId } = useParams<{ botId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["analytics", botId],
    queryFn: () => getAnalytics(botId ?? ""),
    enabled: !!botId,
  });

  const stats = useMemo(() => {
    const payload = data?.data ?? {};
    return {
      totalConversations: payload.totalConversations ?? payload.totalChats ?? 0,
      messagesToday: payload.messagesToday ?? payload.todayMessages ?? 0,
    };
  }, [data]);

  if (!botId) {
    return (
      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 text-sm text-gray-400">
        Missing bot ID. Return to{" "}
        <Link className="text-primary underline" to="/dashboard/chatbots">
          chatbots
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Report.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Track usage metrics for bot <span className="text-white">{botId}</span>.
        </p>
      </header>

      {isLoading && (
        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 text-sm text-gray-400">
          Loading analytics...
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-sm text-red-200">
          Failed to load analytics.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Conversations</p>
              <p className="text-3xl font-black text-white">{stats.totalConversations}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Messages Today</p>
              <p className="text-3xl font-black text-white">{stats.messagesToday}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
