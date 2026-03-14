import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Embed() {
  const { botId } = useParams<{ botId: string }>();
  const [copied, setCopied] = useState(false);

  const script = useMemo(() => {
    if (!botId) return "";
    return `<script src=\"http://localhost:5000/widget.js\" data-bot=\"${botId}\"></script>`;
  }, [botId]);

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Embed <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Code.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Copy and paste this script into your website to deploy the chatbot.
        </p>
      </header>

      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Embed Script</p>
            <p className="text-sm text-gray-400">Bot ID: {botId}</p>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-10 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5"
          >
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="rounded-2xl bg-black/40 border border-white/10 p-4 text-xs text-emerald-200 overflow-x-auto">
          {script}
        </pre>
      </div>
    </div>
  );
}
