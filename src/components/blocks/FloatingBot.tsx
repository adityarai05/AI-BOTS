'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageSquare, Send } from "lucide-react";

export function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] h-[450px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-primary/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center glow-sm">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Whobee AI</div>
                  <div className="text-[10px] text-primary font-bold uppercase tracking-widest">Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-sm text-gray-300 border border-white/5 mr-12 leading-relaxed">
                Hello! I'm Whobee, your AI assistant. How can I help you scale today?
              </div>
              <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white ml-12 text-right font-medium">
                I'd like to learn about voice agents.
              </div>
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-sm text-gray-300 border border-white/5 mr-12 leading-relaxed italic">
                Whobee is typing...
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/40 transition-colors"
              />
              <button className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center glow-sm hover:scale-105 transition-transform">
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)] glow-button z-[101]"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Bot className="h-7 w-7 text-white" />
        )}
      </motion.button>
    </div>
  );
}
