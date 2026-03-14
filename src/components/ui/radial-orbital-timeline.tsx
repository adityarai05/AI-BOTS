"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedIds = timelineData.find(item => item.id === id)?.relatedIds || [];
        const newPulseEffect: Record<number, boolean> = {};
        relatedIds.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.15) % 360);
      }, 30);
    }
    return () => clearInterval(rotationTimer);
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    if (nodeIndex === -1) return;
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      case "pending": return "text-white bg-black/40 border-white/50";
      default: return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center overflow-visible ${className}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-6xl min-h-[700px] flex items-center justify-center">
        {/* Left Side: Animated Integration Telemetry */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-24 z-10">
          {[
            { label: "EXTERNAL_API", status: "ESTABLISHED", color: "text-cyan-400" },
            { label: "DATA_PIPELINE", status: "SYNCING", color: "text-blue-400" },
            { label: "WEBSOCKET", status: "ACTIVE", color: "text-primary" }
          ].map((item, i) => (
            <div key={i} className="relative flex items-center gap-6">
              {/* Rail with Pulse */}
              <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden">
                <motion.div 
                  animate={{ top: ["-20%", "120%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                />
              </div>
              
              {/* Horizontal Content */}
              <div className="flex flex-col gap-1">
                <motion.div 
                   initial={{ opacity: 0, x: -10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.2 }}
                   className={`text-[11px] font-mono ${item.color} font-black tracking-widest`}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1], filter: ["blur(0px)", "blur(1px)", "blur(0px)"] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: i * 0.5 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
                <div className="flex items-center gap-2">
                  <div className="text-[9px] font-mono text-white/40 tracking-wider">
                    {item.status}
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-blue-400' : 'bg-cyan-400'}`}
                  />
                </div>
                {/* Micro Hex Stream */}
                <div className="text-[7px] font-mono text-white/20 mt-1 max-w-[80px] truncate">
                   {Array.from({ length: 16 }).map((_, idx) => (
                      <motion.span 
                        key={idx}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: (idx % 4) * 0.2 }}
                      >
                        {((i + idx) % 16).toString(16)}
                      </motion.span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Animated Neural Processing */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-24 z-10">
          {[
            { label: "SYNAPSE_LOAD", value: "48.2%", color: "text-emerald-400" },
            { label: "LATENCY_STABLE", value: "14ms", color: "text-green-400" },
            { label: "ENCRYPTION_AES", value: "ACTIVE", color: "text-teal-400" }
          ].map((item, i) => (
            <div key={i} className="relative flex flex-row-reverse items-center gap-6">
              {/* Rail with Pulse */}
              <div className="w-[1px] h-32 bg-white/10 relative overflow-hidden">
                <motion.div 
                  animate={{ top: ["120%", "-20%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
                />
              </div>
              
              {/* Horizontal Content */}
              <div className="flex flex-col items-end gap-1">
                <motion.div 
                   initial={{ opacity: 0, x: 10 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.2 }}
                   className={`text-[11px] font-mono ${item.color} font-black tracking-widest text-right`}
                >
                  <motion.span
                    animate={{ skewX: [0, -10, 0], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 + i }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
                <div className="flex items-center flex-row-reverse gap-2">
                  <div className="text-[9px] font-mono text-white/40 tracking-wider">
                    {item.value}
                  </div>
                  <motion.div 
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 border-t border-r border-emerald-400/50 rounded-sm"
                  />
                </div>
                {/* Technical Binary Stream */}
                <div className="text-[7px] font-mono text-white/20 mt-1 max-w-[80px] truncate text-right">
                   {Array.from({ length: 20 }).map((_, idx) => (
                      <motion.span 
                        key={idx}
                        animate={{ color: ["#fff", "#10b981", "#fff"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: (idx % 5) * 0.3 }}
                      >
                        {(idx % 2 === 0) ? "1" : "0"}
                      </motion.span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="absolute w-full h-full flex items-center justify-center p-32"
          ref={orbitRef}
          style={{ perspective: "1500px" }}
        >
          {/* Main Core Hub */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 60px rgba(56,189,248,0.3)", "0 0 100px rgba(56,189,248,0.5)", "0 0 60px rgba(56,189,248,0.3)"],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary via-blue-600 to-emerald-500 flex items-center justify-center z-10"
          >
            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-40"></div>
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">
              <Zap size={28} className="text-white fill-white animate-pulse" />
            </div>
          </motion.div>

          {/* Celestial Rings */}
          <div className="absolute w-[580px] h-[580px] rounded-full border border-white/[0.08] pointer-events-none" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-white/[0.04] pointer-events-none animate-spin-slow" />
          <div className="absolute w-[620px] h-[620px] rounded-full border border-white/[0.02] pointer-events-none animate-spin-slow-reverse" />

          {/* Orbiting Nodes */}
          {timelineData.map((item, index) => {
            const angle = ((index / timelineData.length) * 360 + rotationAngle) % 360;
            const radius = 300; // Increased radius
            const radian = (angle * Math.PI) / 180;
            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);
            const zIndex = Math.round(100 + 50 * Math.cos(radian));
            const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
            
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                animate={{
                  x,
                  y,
                  scale: isExpanded ? 1.5 : 1.1,
                  opacity: isExpanded ? 1 : opacity,
                  zIndex: isExpanded ? 400 : zIndex,
                }}
                transition={{ type: "spring", damping: 20, stiffness: 60 }}
                className="absolute cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Visual Glow Aura */}
                <AnimatePresence>
                  {(isPulsing || isExpanded) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 rounded-full blur-2xl bg-primary/30 -z-1"
                      style={{ 
                        width: isExpanded ? "160px" : "80px", 
                        height: isExpanded ? "160px" : "80px",
                        left: isExpanded ? "-48px" : "-8px",
                        top: isExpanded ? "-48px" : "-8px"
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Node Body */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
                  ${isExpanded ? "bg-white shadow-[0_0_40px_#fff]" : isRelated ? "bg-primary/50 border-white" : "bg-black/90"}
                  border-2 ${isExpanded ? "border-transparent" : isRelated ? "border-white" : "border-white/20"}
                `}>
                  <Icon size={24} className={isExpanded ? "text-black" : "text-white"} />
                </div>

                {/* Label (always white and clearly visible) */}
                {!isExpanded && (
                  <div className={`absolute top-20 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.25em] text-white transition-opacity duration-300 ${opacity > 0.6 ? "opacity-100" : "opacity-0"}`}>
                    {item.title}
                  </div>
                )}

                {/* Dynamic Content Card */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-72 z-[1000]"
                  >
                    <Card className="bg-neutral-950/90 backdrop-blur-2xl border-white/20 shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-emerald-500" />
                      <CardHeader className="pb-2 space-y-1">
                        <div className="flex justify-between items-baseline">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase">
                            {item.status === 'completed' ? 'Live' : 'Beta'}
                          </Badge>
                          <span className="text-[10px] font-mono text-gray-500">{item.date}</span>
                        </div>
                        <CardTitle className="text-lg font-black text-white tracking-tight leading-tight uppercase">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-400 font-light leading-relaxed">
                        <p>{item.content}</p>

                        <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                          <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase">
                            <span className="flex items-center gap-1"><Zap size={10} className="text-primary" /> Sync Level</span>
                            <span>{item.energy}%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.energy}%` }}
                              className="h-full bg-primary" 
                            />
                          </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="mt-6 pt-4 border-t border-white/5">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Sync Partners</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.relatedIds.map(id => {
                                const partner = timelineData.find(t => t.id === id);
                                return (
                                  <button key={id} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-white hover:bg-white/10 transition-colors">
                                    {partner?.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
