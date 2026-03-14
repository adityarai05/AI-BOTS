import { useParams, Link } from "react-router-dom";
import ChatWindow from "@/components/ChatWindow";

export default function TestChat() {
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
          Test <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Chat.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Send messages to your bot and review the answers.
        </p>
      </header>

      <ChatWindow botId={botId} />
    </div>
  );
}
