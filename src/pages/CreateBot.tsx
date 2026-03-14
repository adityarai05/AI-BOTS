import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBot } from "@/api/botApi";

const toneOptions = ["Professional", "Friendly", "Concise", "Playful", "Technical"];

export default function CreateBot() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    description: "",
    tone: "Professional",
    language: "English",
    welcomeMessage: "Hello! How can I help you today?",
  });

  const mutation = useMutation({
    mutationFn: () => createBot(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
      navigate("/dashboard/chatbots");
    },
  });

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Chatbot.</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light tracking-wide">
          Give your bot a name, tone, and greeting before deployment.
        </p>
      </header>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 md:p-10 space-y-6"
      >
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Name</Label>
            <Input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="bg-white/5 border-white/10 rounded-xl h-12"
              placeholder="Acme Support"
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
            placeholder="Describe what this bot should do."
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

        {mutation.isError && (
          <p className="text-sm text-red-400">Failed to create bot. Please try again.</p>
        )}

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
        >
          {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Bot"}
        </Button>
      </form>
    </div>
  );
}
