"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  isScrolled?: boolean;
  activeTab?: string;
  onTabChange?: (name: string) => void;
}

export function NavBar({ items, className, isScrolled, activeTab, onTabChange }: NavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(items[0].name);
  
  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabClick = (name: string) => {
    setInternalActiveTab(name);
    onTabChange?.(name);
  };

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500",
        isScrolled ? "top-6" : "top-8",
        className
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-1 bg-black/40 border border-white/10 backdrop-blur-2xl py-2 px-2 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)]",
          isScrolled && "bg-black/80 border-white/20 scale-95"
        )}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => handleTabClick(item.name)}
              className={cn(
                "relative cursor-pointer text-xs font-black px-6 py-2.5 rounded-full transition-all duration-300 uppercase tracking-widest",
                "text-gray-400 hover:text-white",
                isActive && "text-white"
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 bg-primary/10 rounded-full -z-0"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full shadow-[0_0_20px_hsl(var(--primary))]">
                    <div className="absolute w-12 h-6 bg-primary/20 blur-lg -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
        
        {/* Separator for Dashboard Button */}
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <Link to="/dashboard">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300"
          >
            Access Matrix
          </motion.div>
        </Link>
      </nav>
    </div>
  );
}
