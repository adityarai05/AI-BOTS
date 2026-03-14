import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/api/chatApi";
import { cn } from "@/lib/utils";

interface ChatMessage {
id: string;
role: "user" | "assistant";
content: string;
}

interface ChatWindowProps {
botId: string;
}

export default function ChatWindow({ botId }: ChatWindowProps) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Ask me anything to test your chatbot.",
    },
  ]);

  const mutation = useMutation({
    mutationFn: (message: string) => sendMessage(botId, message),
    onSuccess: (response: any) => {
      console.log("CHAT RESPONSE:", response);

      const reply =
        response?.reply ||
        response?.message ||
        "AI did not return a reply.";

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: reply,
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant-error`,
          role: "assistant",
          content: "Sorry, I could not reach the server. Please try again.",
        },
      ]);
    },
  });

  const canSend = useMemo(
    () => input.trim().length > 0 && !mutation.isPending,
    [input, mutation.isPending]
  );

  const handleSend = () => {
    if (!canSend) return;

    const message = input.trim();

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        role: "user",
        content: message,
      },
    ]);

    mutation.mutate(message);
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 md:p-8 space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-black text-white uppercase tracking-tight">
          Live Test Chat
        </h2>
        <p className="text-sm text-gray-400">
          Send messages to the bot and review responses.
        </p>
      </div>

      <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
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
                "max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed border",
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
          onChange={(event) => setInput(event.target.value)}
          className="bg-white/5 border-white/10 rounded-xl h-12 text-white"
          placeholder="Type a message..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSend();
            }
          }}
        />

        <Button
          onClick={handleSend}
          disabled={!canSend}
          className="h-12 rounded-xl bg-primary text-black font-black uppercase tracking-widest"
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
