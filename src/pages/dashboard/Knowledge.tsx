import { useEffect, useMemo, useState } from "react";
import { BookOpen, FileText, Globe, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getUserBots, uploadKnowledge } from "@/lib/api";
import { useBotContext, type BotSummary } from "@/context/BotContext";

type KnowledgeType = "file" | "text" | "url";

interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  title: string;
  status: "processing" | "ready" | "failed";
  createdAt: string;
}

const typeIconMap: Record<KnowledgeType, JSX.Element> = {
  file: <FileText className="h-4 w-4" />,
  text: <BookOpen className="h-4 w-4" />,
  url: <Globe className="h-4 w-4" />,
};

export default function Knowledge() {
  const { toast } = useToast();
  const { selectedBot, setSelectedBot } = useBotContext();
  const [bots, setBots] = useState<BotSummary[]>([]);
  const [loadingBots, setLoadingBots] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  const [form, setForm] = useState({
    botId: "",
    type: "file" as KnowledgeType,
    url: "",
    text: "",
    file: null as File | null,
  });

  useEffect(() => {
    let active = true;
    const fetchBots = async () => {
      setLoadingBots(true);
      try {
        const response = await getUserBots();
        const data = Array.isArray(response?.data) ? response.data : response?.data?.bots;
        const normalized = Array.isArray(data)
          ? data.map((bot: any) => ({
              id: bot.id ?? bot._id ?? "",
              name: bot.name ?? bot.botName ?? "Untitled Bot",
              description: bot.description ?? null,
              createdAt: bot.created_at ?? bot.createdAt ?? null,
            }))
          : [];
        if (active) {
          setBots(normalized.filter((bot: BotSummary) => bot.id));
        }
      } catch (err) {
        if (active) setBots([]);
      } finally {
        if (active) setLoadingBots(false);
      }
    };

    fetchBots();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (selectedBot && selectedBot.id) {
      setForm((prev) => ({ ...prev, botId: selectedBot.id }));
    }
  }, [selectedBot]);

  const activeBotId = form.botId || selectedBot?.id || "";
  const canSubmit = useMemo(() => {
    if (!activeBotId) return false;
    if (form.type === "file") return !!form.file;
    if (form.type === "url") return form.url.trim().length > 0;
    return form.text.trim().length > 0;
  }, [activeBotId, form.file, form.text, form.type, form.url]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("botId", activeBotId);
      if (form.type === "file" && form.file) {
        payload.append("file", form.file);
        payload.append("content", form.file.name);
      }
      if (form.type === "url") {
        payload.append("content", form.url.trim());
      }
      if (form.type === "text") {
        payload.append("content", form.text.trim());
      }
      payload.append("type", form.type);

      const response = await uploadKnowledge(payload);
      const title =
        response?.data?.title ||
        (form.type === "file" ? form.file?.name : form.type === "url" ? form.url : "Manual Notes");

      setItems((prev) => [
        {
          id: response?.data?.id ?? `${Date.now()}`,
          type: form.type,
          title: title ?? "Knowledge Source",
          status: "processing",
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      toast({ title: "Knowledge uploaded", description: "We are processing your content." });
      setForm((prev) => ({ ...prev, url: "", text: "", file: null }));
    } catch (err) {
      toast({
        title: "Upload failed",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
            Knowledge <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Base.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
            Upload documents, paste content, or link URLs to train your chatbot.
          </p>
        </header>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr),360px] gap-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-6"
        >
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Select Bot</Label>
            <Select
              value={activeBotId}
              onValueChange={(value) => {
                setForm((prev) => ({ ...prev, botId: value }));
                const bot = bots.find((item) => item.id === value) ?? null;
                setSelectedBot(bot);
              }}
            >
              <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                <SelectValue placeholder={loadingBots ? "Loading bots..." : "Choose a bot"} />
              </SelectTrigger>
              <SelectContent className="bg-[#070707] border-white/10 text-white">
                {bots.map((bot) => (
                  <SelectItem key={bot.id} value={bot.id}>
                    {bot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Content Type</Label>
            <Select
              value={form.type}
              onValueChange={(value: KnowledgeType) => setForm((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#070707] border-white/10 text-white">
                <SelectItem value="file">Upload File (PDF/TXT)</SelectItem>
                <SelectItem value="text">Paste Text</SelectItem>
                <SelectItem value="url">Website URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {form.type === "file" && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upload File</Label>
              <Input
                type="file"
                accept=".pdf,.txt"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null;
                  setForm((prev) => ({ ...prev, file }));
                }}
                className="bg-white/5 border-white/10 rounded-xl h-12 text-white"
              />
            </div>
          )}

          {form.type === "text" && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Manual Text</Label>
              <Textarea
                value={form.text}
                onChange={(event) => setForm((prev) => ({ ...prev, text: event.target.value }))}
                className="bg-white/5 border-white/10 rounded-xl min-h-[160px]"
                placeholder="Paste FAQs, documentation, or internal notes..."
              />
            </div>
          )}

          {form.type === "url" && (
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Website URL</Label>
              <Input
                value={form.url}
                onChange={(event) => setForm((prev) => ({ ...prev, url: event.target.value }))}
                className="bg-white/5 border-white/10 rounded-xl h-12"
                placeholder="https://example.com/docs"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
            Upload Knowledge
          </Button>
        </form>

        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Upload Tips</h3>
          <ul className="text-sm text-gray-400 space-y-3">
            <li>PDF and TXT files are best for quick ingestion.</li>
            <li>Paste FAQs for the highest answer accuracy.</li>
            <li>Use a public URL with clean documentation pages.</li>
          </ul>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="relative group p-20 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
          <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
            <BookOpen className="h-10 w-10 text-gray-600" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">No Knowledge Uploaded</h3>
            <p className="text-gray-500 text-sm font-light">
              Upload your first document or paste text to train the chatbot.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-6 rounded-3xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
                {typeIconMap[item.type]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-white text-sm uppercase tracking-wider">{item.title}</h3>
                <p className="text-[10px] text-gray-500 font-mono tracking-tight truncate mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
