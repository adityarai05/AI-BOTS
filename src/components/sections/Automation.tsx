'use client'

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, User, Bot, Zap, Database, Shield, Globe, BarChart3, CheckCircle2 } from "lucide-react";

/* ─── Step data ──────────────────────────────────────────── */
const STEPS = [
  {
    id: "ingest",
    icon: User,
    label: "Customer Signal",
    sublabel: "Input",
    desc: "Inbound message, call, or form — any channel, any language.",
    color: "#38bdf8",
    glow: "rgba(56,189,248,",
  },
  {
    id: "brain",
    icon: Bot,
    label: "AI Brain",
    sublabel: "Processing",
    desc: "Context-aware NLP engine resolves intent in under 200ms.",
    color: "#a855f7",
    glow: "rgba(168,85,247,",
    pulse: true,
  },
  {
    id: "action",
    icon: Zap,
    label: "Smart Action",
    sublabel: "Execution",
    desc: "Triggers refunds, CRM updates, escalations — fully automated.",
    color: "#10b981",
    glow: "rgba(16,185,129,",
  },
  {
    id: "sync",
    icon: Database,
    label: "Data Sync",
    sublabel: "Integration",
    desc: "Writes back to any system of record with zero manual effort.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,",
  },
];

const STATS = [
  { icon: Shield,   value: "99.9%",  label: "Uptime SLA" },
  { icon: Globe,    value: "50+",    label: "Integrations" },
  { icon: BarChart3,value: "<200ms", label: "Response Time" },
];

/* ─── SVG connector line between steps ──────────────────── */
function StepConnector({ color, inView, delay }: { color: string; inView: boolean; delay: number }) {
  return (
    <div className="relative flex flex-col items-center" style={{ height: 56 }}>
      {/* line */}
      <motion.div
        className="w-px flex-1"
        style={{ background: `linear-gradient(to bottom, ${color}88, ${color}22)` }}
        initial={{ scaleY: 0, originY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
      />
      {/* animated dot */}
      {inView && (
        <motion.div
          className="absolute w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
          animate={{ y: [0, 48, 0] }}
          transition={{ delay: delay + 0.4, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

/* ─── Single step card ───────────────────────────────────── */
function StepCard({
  step, index, inView, active, onHover,
}: {
  step: typeof STEPS[0]; index: number; inView: boolean;
  active: string | null; onHover: (id: string | null) => void;
}) {
  const isActive = active === step.id;
  const isDimmed = active !== null && !isActive;
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: isDimmed ? 0.3 : 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.7, ease: [0.21, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={() => onHover(null)}
      className="relative flex items-start gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${step.glow}0.12) 0%, rgba(0,0,0,0.4) 100%)`
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${isActive ? step.color + "60" : "rgba(255,255,255,0.06)"}`,
        boxShadow: isActive ? `0 0 30px ${step.glow}0.15), inset 0 1px 0 rgba(255,255,255,0.06)` : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* step number */}
      <div
        className="absolute -left-3 -top-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
        style={{ background: step.color, color: "#000", boxShadow: `0 0 12px ${step.glow}0.5)` }}
      >
        {index + 1}
      </div>

      {/* icon */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
        style={{
          background: `${step.glow}0.15)`,
          border: `1px solid ${step.color}40`,
          boxShadow: `0 0 18px ${step.glow}0.2)`,
        }}
      >
        <Icon className="w-5 h-5" style={{ color: step.color }} />
        {step.pulse && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            animate={{ boxShadow: [`0 0 0 0 ${step.glow}0.4)`, `0 0 0 10px ${step.glow}0)`, `0 0 0 0 ${step.glow}0)`] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-[0.18em] font-semibold mb-0.5" style={{ color: `${step.color}bb` }}>
          {step.sublabel}
        </div>
        <div className="text-white font-bold text-base leading-tight mb-1">{step.label}</div>
        <div className="text-gray-500 text-sm leading-relaxed">{step.desc}</div>
      </div>

      {/* live pulse dot */}
      <motion.div
        className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.4 }}
        style={{ background: step.color, boxShadow: `0 0 8px ${step.color}` }}
      />
    </motion.div>
  );
}

/* ─── Live activity feed (right panel) ──────────────────── */
const FEED_ITEMS = [
  { text: "Refund issued — Order #84721",         icon: CheckCircle2, color: "#10b981", time: "0.2s" },
  { text: "CRM updated: Priority → High",          icon: Database,     color: "#a855f7", time: "0.4s" },
  { text: "Ticket resolved via AI — CSAT 5★",    icon: CheckCircle2, color: "#38bdf8", time: "0.7s" },
  { text: "Scheduler: Call booked for 09:00",     icon: Zap,          color: "#f59e0b", time: "0.9s" },
  { text: "Slack alert sent to #support-team",    icon: Globe,        color: "#38bdf8", time: "1.1s" },
  { text: "Knowledge base updated — 3 articles",  icon: CheckCircle2, color: "#10b981", time: "1.4s" },
];

function LiveFeed({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {FEED_ITEMS.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.55, ease: [0.21, 1, 0.36, 1] }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
            </div>
            <span className="text-sm text-gray-300 flex-1 leading-tight">{item.text}</span>
            <span className="text-[11px] text-gray-600 font-mono flex-shrink-0">{item.time}</span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              style={{ background: item.color }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────── */
export function Automation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="automation"
      className="relative w-full text-white overflow-hidden"
      style={{ padding: "120px 0 140px", background: "transparent" }}
    >
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(56,189,248,0.055) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "5%",
          width: 400, height: 400,
          background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10" style={{ zIndex: 10 }}>

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{
              background: "rgba(56,189,248,0.08)",
              border: "1px solid rgba(56,189,248,0.25)",
              color: "#38bdf8",
            }}
            animate={{ boxShadow: ["0 0 0 0 rgba(56,189,248,0)", "0 0 0 6px rgba(56,189,248,0)", "0 0 0 0 rgba(56,189,248,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Zap className="w-3 h-3" /> Automation Engine
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-5">
            One Query.{" "}
            <span style={{
              background: "linear-gradient(100deg, #38bdf8, #818cf8, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Infinite Actions.
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Your AI agents don't just respond — they act. Trigger real-world outcomes
            across every system, instantly and autonomously.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: Vertical step pipeline */}
          <div className="flex flex-col">
            <div className="flex flex-col gap-0">
              {STEPS.map((step, i) => (
                <div key={step.id}>
                  <StepCard step={step} index={i} inView={inView} active={active} onHover={setActive} />
                  {i < STEPS.length - 1 && (
                    <div className="ml-[52px]">
                      <StepConnector color={step.color} inView={inView} delay={0.35 + i * 0.15} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              className="mt-10 grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 py-4 rounded-2xl text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon className="w-4 h-4 text-gray-500 mb-1" />
                  <span className="text-2xl font-black text-white">{value}</span>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm text-white relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(56,189,248,0.15), rgba(168,85,247,0.15))",
                  border: "1px solid rgba(56,189,248,0.3)",
                  boxShadow: "0 0 30px rgba(56,189,248,0.1)",
                }}
              >
                <span>Explore Automation Workflows</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                {/* shimmer */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)" }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT: Live activity feed + header */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* panel header */}
            <div
              className="flex items-center justify-between px-5 py-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }}
                />
                <span className="text-sm font-semibold text-white">Live Activity Feed</span>
              </div>
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
            </div>

            {/* feed */}
            <div
              className="rounded-2xl p-5 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              <LiveFeed inView={inView} />
            </div>

            {/* throughput bar */}
            <motion.div
              className="px-5 py-4 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Throughput / min</span>
                <motion.span
                  className="text-sm font-black text-white"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  12,480 ops
                </motion.span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #38bdf8, #a855f7)" }}
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "84%" } : {}}
                  transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-gray-600">0</span>
                <span className="text-[10px] text-gray-600">15,000</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
