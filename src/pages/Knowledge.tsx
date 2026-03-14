import { useParams, Link } from "react-router-dom";
import KnowledgeUploader from "@/components/KnowledgeUploader";

export default function Knowledge() {
  const { botId } = useParams<{ botId: string }>();

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
          Upload <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Knowledge.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Train your chatbot by adding text-based knowledge for bot <span className="text-white">{botId}</span>.
        </p>
      </header>

      <KnowledgeUploader botId={botId} />
    </div>
  );
}
