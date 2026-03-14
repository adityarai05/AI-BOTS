'use client'

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, PhoneCall, Globe, Shield, BarChart3, MessageSquare, Zap, ArrowRight, Check } from "lucide-react";
import { FlippingCard } from "@/components/ui/flipping-card";
import { TextDisperse } from "@/components/ui/text-disperse";

/* ─── Feature Data ──────────────────────────────────────────────── */
const features = [
  {
    id: "chatbots",
    icon: Bot,
    title: "AI Chatbots",
    desc: "Deploy intelligent chatbots that understand customer intent, context, and sentiment — resolving tickets with zero human intervention.",
    stat: "94%",
    statLabel: "Resolution Rate",
    color: "#3b82f6",
    position: "far-left",
    bullets: ["Intent & context aware", "Sentiment detection", "Zero human intervention"],
    backDesc: "Our AI chatbots handle the entire support lifecycle — from first contact to resolution — autonomously across every channel.",
  },
  {
    id: "voice",
    icon: PhoneCall,
    title: "Voice Agents",
    desc: "Ultra-realistic AI voice agents handle inbound & outbound calls with sub-200ms latency.",
    stat: "<200ms",
    statLabel: "Latency",
    color: "#a855f7",
    position: "inner-left-top",
    bullets: ["Sub-200ms response", "Natural voice synthesis", "Multi-language support"],
    backDesc: "Human-like voice AI that handles inbound queries and proactive outbound campaigns at massive scale.",
  },
  {
    id: "security",
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC2-compliant, end-to-end encrypted architecture built for the strictest enterprise requirements.",
    stat: "SOC2",
    statLabel: "Certified",
    color: "#ec4899",
    position: "inner-left-bottom",
    bullets: ["End-to-end encryption", "SOC2 Type II certified", "GDPR compliant"],
    backDesc: "Bank-grade security architecture that keeps every customer conversation encrypted, auditable, and fully compliant.",
  },
  {
    id: "multilingual",
    icon: Globe,
    title: "Multilingual",
    desc: "Auto-detect and respond fluently in 30+ languages. No configuration needed.",
    stat: "30+",
    statLabel: "Languages",
    color: "#06b6d4",
    position: "inner-right-top",
    bullets: ["Auto language detection", "30+ languages", "Zero configuration"],
    backDesc: "Speak your customers' language — literally. Our engine auto-detects and switches fluently, without any setup.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Live dashboards with CSAT scores, resolution funnels, and revenue impact metrics.",
    stat: "360°",
    statLabel: "Visibility",
    color: "#10b981",
    position: "inner-right-bottom",
    bullets: ["Live CSAT tracking", "Revenue impact metrics", "Resolution funnels"],
    backDesc: "Full-spectrum observability across every support interaction with instant drill-down and custom reporting.",
  },
  {
    id: "handoff",
    icon: MessageSquare,
    title: "Live Agent Handoff",
    desc: "Seamless escalation with full conversation context, sentiment analysis, and suggested responses — zero friction.",
    stat: "0ms",
    statLabel: "Context Lost",
    color: "#f59e0b",
    position: "far-right",
    bullets: ["Full context transfer", "Sentiment summary", "AI-suggested replies"],
    backDesc: "When humans need to step in, they do so with complete context, sentiment data and next-best-action suggestions already in hand.",
  },
];

/* ─── Card Front ─────────────────────────────────────────────────── */
function CardFront({ feature, isActive }: { feature: typeof features[0]; isActive: boolean }) {
  const Icon = feature.icon;
  return (
    <div
      className="relative h-full w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center gap-3"
      style={{
        padding: "20px 16px",
        background: `linear-gradient(160deg, #0d0d14 0%, #090910 100%)`,
        border: `1px solid ${isActive ? feature.color + "80" : feature.color + "28"}`,
        boxShadow: isActive
          ? `0 0 32px 4px ${feature.color}44, 0 0 70px 12px ${feature.color}18, inset 0 1px 0 rgba(255,255,255,0.07)`
          : `0 0 14px 2px ${feature.color}20, inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${feature.color}cc, transparent)` }} />

      {/* Icon */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex-shrink-0"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}45)`,
            border: `1px solid ${feature.color}60`,
            boxShadow: `0 0 20px ${feature.color}50`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: feature.color, filter: `drop-shadow(0 0 5px ${feature.color})` }} />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full blur-sm" style={{ background: feature.color, opacity: 0.5 }} />
      </motion.div>

      {/* Title & hint */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-white font-bold text-sm leading-tight">{feature.title}</p>
        <p className="text-gray-600 text-[10px] font-medium">Hover to reveal →</p>
      </div>

      {/* Stat pill */}
      <div
        className="px-3 py-1 rounded-full text-[11px] font-black font-mono whitespace-nowrap"
        style={{
          background: `${feature.color}18`,
          border: `1px solid ${feature.color}50`,
          color: feature.color,
        }}
      >
        {feature.stat}{" "}<span className="font-medium opacity-75">{feature.statLabel}</span>
      </div>

      {/* Corner live dot */}
      <motion.div
        className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        style={{ background: feature.color, boxShadow: `0 0 6px ${feature.color}` }}
      />
    </div>
  );
}

/* ─── Card Back ──────────────────────────────────────────────────── */
function CardBack({ feature }: { feature: typeof features[0] }) {
  const Icon = feature.icon;
  return (
    <div
      className="relative h-full w-full rounded-2xl overflow-hidden flex flex-col gap-3"
      style={{
        padding: "18px 16px",
        background: `linear-gradient(160deg, #0d0d14 0%, #07070d 100%)`,
        border: `1px solid ${feature.color}60`,
        boxShadow: `0 0 40px ${feature.color}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }} />

      {/* Header */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${feature.color}22`, border: `1px solid ${feature.color}55` }}
        >
          <Icon className="w-4 h-4" style={{ color: feature.color }} />
        </div>
        <p className="text-white font-bold text-sm leading-tight">{feature.title}</p>
      </div>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed flex-shrink-0" style={{ fontSize: "11px" }}>{feature.backDesc}</p>

      {/* Bullet points */}
      <div className="flex flex-col gap-1.5 flex-1">
        {feature.bullets.map(b => (
          <div key={b} className="flex items-start gap-2">
            <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: feature.color }} />
            <span className="text-gray-300 leading-tight" style={{ fontSize: "11px" }}>{b}</span>
          </div>
        ))}
      </div>

      {/* Learn More */}
      <button
        className="flex items-center gap-1.5 text-xs font-bold self-start px-3 py-1.5 rounded-lg"
        style={{
          background: `${feature.color}20`,
          border: `1px solid ${feature.color}50`,
          color: feature.color,
        }}
      >
        Learn More <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}

/* ─── SVG Connections ───────────────────────────────────────────── */
function Connections({ activeId }: { activeId: string | null }) {
  const cx = 450; const cy = 250;
  const endpoints: Record<string, [number, number]> = {
    chatbots:     [90,  250],
    voice:        [220, 80],
    security:     [220, 420],
    multilingual: [680, 80],
    analytics:    [680, 420],
    handoff:      [810, 250],
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
      <defs>
        {features.map(f => (
          <linearGradient key={f.id} id={`grad-${f.id}`} gradientUnits="userSpaceOnUse"
            x1={cx} y1={cy} x2={endpoints[f.id][0]} y2={endpoints[f.id][1]}>
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor={f.color} stopOpacity="0.7" />
          </linearGradient>
        ))}
        {features.map(f => (
          <filter key={`gf-${f.id}`} id={`glow-${f.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={activeId === f.id ? "4" : "2"} result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        ))}
      </defs>
      {features.map(f => {
        const [ex, ey] = endpoints[f.id];
        const isActive = activeId === f.id;
        const cpx1 = cx + (ex - cx) * 0.4;
        const cpy1 = cy;
        const cpx2 = cx + (ex - cx) * 0.6;
        const cpy2 = ey;
        const d = `M ${cx} ${cy} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${ex} ${ey}`;
        return (
          <g key={f.id}>
            <path d={d} fill="none"
              stroke={isActive ? f.color : "rgba(255,255,255,0.06)"}
              strokeWidth={isActive ? "2" : "1"}
              style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
            />
            <path d={d} fill="none"
              stroke={`url(#grad-${f.id})`}
              strokeWidth={isActive ? "3" : "1.5"}
              filter={`url(#glow-${f.id})`}
              opacity={isActive ? 1 : 0.5}
              style={{ transition: "stroke-width 0.4s, opacity 0.4s" }}
            />
            <path d={d} fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray="6 200" opacity={isActive ? 1 : 0.5}>
              <animate attributeName="stroke-dashoffset" values="206;0" dur={isActive ? "0.8s" : "1.6s"} repeatCount="indefinite" />
            </path>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Central Crystal ───────────────────────────────────────────── */
function CentralCrystal() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex items-center justify-center"
    >
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)" }} />
      <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }} />
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 20px #60a5fa) drop-shadow(0 0 40px #a855f7)" }}>
          <defs>
            <linearGradient id="crystal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" /><stop offset="50%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="crystal-face1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" /><stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="crystal-face2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" /><stop offset="100%" stopColor="#67e8f9" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <polygon points="50,5 85,35 85,65 50,95 15,65 15,35" fill="url(#crystal-grad)" opacity="0.15" stroke="url(#crystal-grad)" strokeWidth="1" />
          <polygon points="50,5 85,35 50,50" fill="url(#crystal-face1)" opacity="0.8" />
          <polygon points="85,35 85,65 50,50" fill="url(#crystal-face2)" opacity="0.6" />
          <polygon points="85,65 50,95 50,50" fill="url(#crystal-face1)" opacity="0.5" />
          <polygon points="50,95 15,65 50,50" fill="url(#crystal-face2)" opacity="0.7" />
          <polygon points="15,65 15,35 50,50" fill="url(#crystal-face1)" opacity="0.6" />
          <polygon points="15,35 50,5 50,50" fill="url(#crystal-face2)" opacity="0.8" />
          <ellipse cx="42" cy="28" rx="10" ry="6" fill="white" opacity="0.3" transform="rotate(-20, 42, 28)" />
        </svg>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-blue-400/30" style={{ borderStyle: "dashed" }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-full border border-purple-400/20" style={{ borderStyle: "dashed" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="h-6 w-6 text-white" style={{ filter: "drop-shadow(0 0 8px #60a5fa)" }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */
export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  const farLeft   = features.find(f => f.position === "far-left")!;
  const ilTop     = features.find(f => f.position === "inner-left-top")!;
  const ilBottom  = features.find(f => f.position === "inner-left-bottom")!;
  const irTop     = features.find(f => f.position === "inner-right-top")!;
  const irBottom  = features.find(f => f.position === "inner-right-bottom")!;
  const farRight  = features.find(f => f.position === "far-right")!;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: 0.6 + i * 0.12, duration: 0.6, ease: [0.21, 1, 0.36, 1] as [number,number,number,number] },
    }),
  };

  function renderCard(feature: typeof features[0], index: number, large = false) {
    // Increased sizes so text fits comfortably
    const w = large ? 220 : 195;
    const h = large ? 300 : 265;
    return (
      <motion.div
        key={feature.id}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex-shrink-0"
        onMouseEnter={() => setActiveId(feature.id)}
        onMouseLeave={() => setActiveId(null)}
      >
        <FlippingCard
          width={w}
          height={h}
          frontContent={<CardFront feature={feature} isActive={activeId === feature.id} />}
          backContent={<CardBack feature={feature} />}
        />
      </motion.div>
    );
  }

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-[#030303]"
    >
      {/* Deep Void Background sync with Hero */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 ai-grid opacity-[0.08] pointer-events-none" />
      
      {/* Deep Nebula pulses (Matching HeroSection) */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none" />
      
      {/* Material Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-90 contrast-125 mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative flex items-center justify-center">
                <TextDisperse className="text-4xl md:text-7xl font-black tracking-tighter uppercase p-4 text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]">
                  CORE CAPABILITIES
                </TextDisperse>
              </div>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
              Scale your operations with our <span className="text-cyan-400 font-medium">autonomous intelligence layer</span>.
              <span className="block text-gray-600 mt-2 text-sm italic">Hover the heading to disperse.</span>
            </p>
        </div>

        {/* Hub-and-Spoke Network */}
        <div className="relative w-full" style={{ minHeight: 520 }}>
          {/* SVG connections */}
          <motion.div className="absolute inset-0"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
            <Connections activeId={activeId} />
          </motion.div>

          {/* Grid: far-left | inner-left | center | inner-right | far-right */}
          <div className="relative z-10 flex items-center justify-between gap-4 px-4">

            {/* Far Left */}
            {renderCard(farLeft, 0, true)}

            {/* Inner Left column */}
            <div className="flex flex-col gap-5 flex-shrink-0">
              {renderCard(ilTop, 1)}
              {renderCard(ilBottom, 2)}
            </div>

            {/* Center Crystal */}
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.21, 1, 0.36, 1] }}
            >
              <CentralCrystal />
            </motion.div>

            {/* Inner Right column */}
            <div className="flex flex-col gap-5 flex-shrink-0">
              {renderCard(irTop, 3)}
              {renderCard(irBottom, 4)}
            </div>

            {/* Far Right */}
            {renderCard(farRight, 5, true)}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-3 px-8 py-3.5 rounded-xl font-semibold text-white text-sm tracking-wide overflow-hidden"
            style={{ background: "rgba(4,9,20,0.8)", border: "1px solid rgba(96,165,250,0.5)", boxShadow: "0 0 20px rgba(96,165,250,0.2)" }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(129,140,248,0.15))" }} />
            <span className="relative z-10">Explore Workflows</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
