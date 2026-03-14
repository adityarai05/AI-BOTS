"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative h-px w-full overflow-visible flex items-center justify-center">
      {/* The main beam that spans the width but fades out at edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-px w-full shadow-[0_0_15px_rgba(56,189,248,0.2)]" />
      
      {/* Central glowing core / node */}
      <motion.div 
        animate={{ 
          boxShadow: [
            "0 0 10px rgba(56,189,248,0.5)", 
            "0 0 25px rgba(56,189,248,0.8)", 
            "0 0 100px rgba(56,189,248,0.3)",
            "0 0 10px rgba(56,189,248,0.5)"
          ],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 h-1.5 w-1.5 rounded-full bg-white shadow-primary"
      >
        <div className="absolute inset-[-4px] rounded-full border border-primary/20 animate-ping opacity-30" />
      </motion.div>

      {/* Travelling Light Pulse */}
      <motion.div 
        animate={{ 
          left: ["-10%", "110%"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-20"
      />
    </div>
  );
}
