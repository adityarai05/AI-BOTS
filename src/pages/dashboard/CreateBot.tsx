import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createBot } from "@/lib/api";

const toneOptions = [
  "Professional",
  "Friendly",
  "Concise",
  "Playful",
  "Technical",
];

export default function CreateBot() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    botName: "",
    description: "",
    tone: "Professional",
    language: "English",
    welcomeMessage: "Hello! How can I help you today?",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await createBot(form);
      toast({ title: "Bot created", description: "Your chatbot is ready to configure." });
      navigate("/dashboard/chatbots");
    } catch (error) {
      toast({
        title: "Creation failed",
        description: "Please check the form and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Bot.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Define your chatbot identity before training and deployment.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 md:p-10 space-y-6"
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Bot Name</Label>
            <Input
              value={form.botName}
              onChange={(event) => setForm((prev) => ({ ...prev, botName: event.target.value }))}
              className="bg-white/5 border-white/10 rounded-xl h-12"
              placeholder="Acme Support Assistant"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Language</Label>
            <Input
              value={form.language}
              onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value }))}
              className="bg-white/5 border-white/10 rounded-xl h-12"
              placeholder="English"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Description</Label>
          <Textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="bg-white/5 border-white/10 rounded-xl min-h-[120px]"
            placeholder="Describe what your chatbot should help users with."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tone</Label>
            <Select value={form.tone} onValueChange={(value) => setForm((prev) => ({ ...prev, tone: value }))}>
              <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#070707] border-white/10 text-white">
                {toneOptions.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Welcome Message</Label>
            <Input
              value={form.welcomeMessage}
              onChange={(event) => setForm((prev) => ({ ...prev, welcomeMessage: event.target.value }))}
              className="bg-white/5 border-white/10 rounded-xl h-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Bot"}
        </Button>
      </form>
    </div>
  );
}
