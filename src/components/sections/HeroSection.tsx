import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bot, Sparkles } from "lucide-react";
import { InteractiveRobotSpline } from "@/components/blocks/interactive-3d-robot";
import { MorphingText } from "@/components/ui/morphing-text";

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const MORPH_TEXTS = [
  "Intelligence",
  "Redefined.",
  "Automated.",
  "Always On.",
  "Intelligent.",
  "Scalable.",
  "Lightning Fast.",
  "Your AI.",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.21, 1, 0.36, 1] }
  })
};

const sideFade: Variants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -60 : 60,
    filter: "blur(10px)"
  }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.21, 1, 0.36, 1], delay: 0.6 }
  }
};

const floating: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
  },
  animateReverse: {
    y: [0, 10, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
};

export function HeroSection() {
  return (
    <section className="relative w-full h-[110vh] overflow-hidden flex items-center justify-center pt-20">
      {/* 1. Background Layer: Large Text & Grid */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <div className="absolute inset-0 ai-grid opacity-20" />
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 0.08, scale: 1, y: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="text-[25vw] font-black text-white tracking-[0.2em] opacity-10 whitespace-nowrap hidden md:block"
        >
          CORE
        </motion.h2>
      </div>

      <div className="max-w-[1600px] mx-auto px-10 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* Left Side: Tagline & Secondary Actions */}
        <motion.div
          custom="left"
          initial="hidden"
          animate="visible"
          variants={sideFade}
          className="hidden lg:flex flex-col items-start gap-16 w-1/4 font-outfit"
        >
          <motion.div variants={floating} animate="animate" className="space-y-5">
            <div className="h-1px w-16 bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <h3 className="text-sm font-medium text-white uppercase tracking-[0.4em]">Precision</h3>
            <p className="text-gray-100/80 text-sm leading-relaxed max-w-[240px] drop-shadow-md font-light">
              Neural processing at sub-millisecond speeds for instant user resolution.
            </p>
          </motion.div>
          <motion.div variants={floating} animate="animateReverse" className="space-y-5">
            <div className="h-1px w-16 bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <h3 className="text-sm font-medium text-white uppercase tracking-[0.4em]">Scalability</h3>
            <p className="text-gray-100/80 text-sm leading-relaxed max-w-[240px] drop-shadow-md font-light">
              Unified knowledge across 50+ channels with zero-latency injection.
            </p>
          </motion.div>
        </motion.div>

        {/* Center: Robot & Main Title Overlay */}
        <div className="relative flex flex-col items-center justify-center flex-1 min-h-[500px] md:min-h-[800px] w-full lg:w-auto">
          {/* Robot */}
          <div className="absolute inset-0 z-20 scale-90 md:scale-125 transform transition-transform duration-1000 flex items-center justify-center">
            <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
          </div>

          {/* Foreground Overlay */}
          <div className="relative z-30 mt-auto pb-28 md:pb-36 text-center pointer-events-none w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="flex flex-col items-center"
            >
              <h1 className="flex flex-col items-center">
                <motion.span 
                  animate={{ 
                    y: [0, -5, 0],
                    filter: ["drop-shadow(0 0 10px rgba(255,255,255,0.1))", "drop-shadow(0 0 25px rgba(255,255,255,0.3))", "drop-shadow(0 0 10px rgba(255,255,255,0.1))"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_10px_40px_rgba(0,0,0,1)]"
                >
                  SUPREME
                </motion.span>
                <span 
                  className="text-3xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 mt-1 uppercase"
                  style={{ 
                    filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))",
                  }}
                >
                  Intelligence
                </span>
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Features & Trust */}
        <motion.div
          custom="right"
          initial="hidden"
          animate="visible"
          variants={sideFade}
          className="hidden lg:flex flex-col items-end text-right gap-16 w-1/4 font-outfit"
        >
          <motion.div variants={floating} animate="animateReverse" className="space-y-5 flex flex-col items-end">
            <div className="h-1px w-16 bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <h3 className="text-sm font-medium text-white uppercase tracking-[0.4em]">Security</h3>
            <p className="text-gray-100/80 text-sm leading-relaxed max-w-[240px] drop-shadow-md font-light">
              Military-grade encryption for every customer interaction recorded.
            </p>
          </motion.div>
          <motion.div variants={floating} animate="animate" className="space-y-5 flex flex-col items-end">
            <div className="h-1px w-16 bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            <h3 className="text-sm font-medium text-white uppercase tracking-[0.4em]">Support</h3>
            <p className="text-gray-100/80 text-sm leading-relaxed max-w-[240px] drop-shadow-md font-light">
              24/7 autonomous monitoring with seamless human-in-the-loop fallback.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Visual Enhancements & Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none" />
      
      {/* Neural Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent z-50">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/20 blur-xl rounded-full" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/10 blur-[180px] rounded-full -z-1" />
    </section>
  );
}
