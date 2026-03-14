import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface BotSummary {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string | null;
}

interface BotContextValue {
  selectedBot: BotSummary | null;
  setSelectedBot: (bot: BotSummary | null) => void;
}

const BotContext = createContext<BotContextValue | undefined>(undefined);

export function BotProvider({ children }: { children: ReactNode }) {
  const [selectedBot, setSelectedBot] = useState<BotSummary | null>(null);
  const value = useMemo(() => ({ selectedBot, setSelectedBot }), [selectedBot]);

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
}

export function useBotContext() {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBotContext must be used within BotProvider");
  }
  return context;
}
