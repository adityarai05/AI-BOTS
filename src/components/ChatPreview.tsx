import { useMemo, useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { sendMessage } from "@/lib/api";
import { useBotContext } from "@/context/BotContext";
import { cn } from "@/lib/utils";

interface ChatMessage {
id: string;
role: "user" | "assistant";
content: string;
}

export default function ChatPreview() {
  const { selectedBot } = useBotContext();
  const { toast } = useToast();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Ask me anything about your product or support flow.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const canSend = useMemo(
    () => input.trim().length > 0 && !!selectedBot,
    [input, selectedBot]
  );

  const handleSend = async () => {
    if (!canSend || !selectedBot) return;

    const trimmed = input.trim();

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessage(selectedBot.id, trimmed);

      // Debug log (helps confirm API response)
      console.log("API RESPONSE:", response);

      // Handle multiple possible response shapes
      const replyText =
        response?.reply ||
        response?.data?.reply ||
        response?.message ||
        "AI did not return a reply.";

      const botMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Message failed",
        description: "We could not reach the chatbot. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl border border-white/5 bg-white/[0.03] p-6 lg:p-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Bot className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-500">
                Chat Preview
              </p>
              <p className="text-sm font-semibold text-white">
                {selectedBot ? selectedBot.name : "Select a bot to preview"}
              </p>
            </div>
          </div>

          {selectedBot && (
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
              Live
            </span>
          )}
        </div>

        {!selectedBot ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-gray-400">
            Pick a bot on the Chatbots page to activate the live preview.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed border",
                      message.role === "user"
                        ? "bg-primary text-black border-primary/40"
                        : "bg-white/5 text-white border-white/10"
                    )}
                  >
                    {message.content}
                  </div>

                  {message.role === "user" && (
                    <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about your product..."
                className="bg-white/5 border-white/10 rounded-xl h-12 text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />

              <Button
                onClick={handleSend}
                disabled={!canSend || loading}
                className="h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
