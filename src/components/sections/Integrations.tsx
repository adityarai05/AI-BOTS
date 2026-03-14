"use client";

import { motion } from "framer-motion";
import { 
  Globe, MessageSquare, Phone, Mail, Database, 
  Share2, Cpu, Layout, Layers, Bot, Radio, Code2
} from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const integrationData: TimelineItem[] = [
  {
    id: 1,
    title: "Web Neural Link",
    date: "Available Now",
    content: "Deploy autonomous bots directly onto your website with zero-latency neural bridges.",
    category: "Connectivity",
    icon: Globe,
    relatedIds: [2, 5],
    status: "completed",
    energy: 98,
  },
  {
    id: 2,
    title: "Omni-Channel Sync",
    date: "Available Now",
    content: "Sync conversations across WhatsApp, Discord, and Telegram in real-time.",
    category: "Communication",
    icon: MessageSquare,
    relatedIds: [1, 3],
    status: "completed",
    energy: 94,
  },
  {
    id: 3,
    title: "HD Voice Matrix",
    date: "Live Beta",
    content: "Ultra-precise voice agents with emotional intelligence and localized accents.",
    category: "Voice",
    icon: Phone,
    relatedIds: [2, 6],
    status: "completed",
    energy: 88,
  },
  {
    id: 4,
    title: "Data Synapse",
    date: "Enterprise Only",
    content: "Deep-integration with SQL and NoSQL clusters for large-scale data ingestion.",
    category: "Data",
    icon: Database,
    relatedIds: [5],
    status: "completed",
    energy: 100,
  },
  {
    id: 5,
    title: "System API Hub",
    date: "Standard",
    content: "A centralized hub to connect your internal toolsets and custom business logic.",
    category: "Logic",
    icon: Layers,
    relatedIds: [1, 4],
    status: "completed",
    energy: 92,
  },
  {
    id: 6,
    title: "Social Signal",
    date: "Q3 2024",
    content: "Automated social engagement and trend analysis across all global platforms.",
    category: "Social",
    icon: Share2,
    relatedIds: [3],
    status: "in-progress",
    energy: 45,
  },
];

export function Integrations() {
  return (
    <section id="integrations" className="py-20 md:py-32 bg-[#030303] relative overflow-visible scroll-mt-20">
      {/* Deep Void Background sync with Hero */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Deep Nebula pulses (Matching HeroSection) */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Material Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-90 contrast-125 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6"
          >
            <Radio size={12} className="animate-pulse" /> Global Connectivity
          </motion.div>
          
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
            Sync With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">Everything.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
            Eliminate silos by connecting SupportAI to your core infrastructure. 
            Native bridges for every platform in your stack.
          </p>
        </div>

        {/* The Orbital Map */}
        <div className="relative h-[600px] md:h-[800px] flex items-center justify-center">
          <RadialOrbitalTimeline 
            timelineData={integrationData} 
            className="scale-75 md:scale-100" 
          />
        </div>
        
        {/* Technical Partner Logos (Decorative) */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 md:gap-20 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
           {[Code2, Cpu, Layout, Layers, Bot].map((Icon, i) => (
             <Icon key={i} className="h-6 w-6 md:h-10 md:w-10 text-white" />
           ))}
        </div>
      </div>
    </section>
  );
}
