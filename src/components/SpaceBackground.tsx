import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   Star field + falling meteor canvas (hardware-accelerated)
═══════════════════════════════════════════════════════════════ */
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;

    /* ── star ── */
    type Star = { x: number; y: number; r: number; baseA: number; phase: number; speed: number };
    let stars: Star[] = [];

    /* ── meteor ── */
    type Meteor = {
      x: number; y: number;
      vx: number; vy: number;
      len: number; alpha: number; active: boolean;
    };
    const METEOR_COUNT = 8;
    const meteors: Meteor[] = Array.from({ length: METEOR_COUNT }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, len: 0, alpha: 0, active: false,
    }));

    function spawnMeteor(m: Meteor) {
      // spawn from the top edge, anywhere across the width
      m.x   = Math.random() * W * 1.3;
      m.y   = -20 - Math.random() * 100;
      // 45-degree angle downward-left
      const spd = 6 + Math.random() * 10;
      m.vx  = -spd * 0.7;
      m.vy  = spd;
      m.len = 70 + Math.random() * 160;
      m.alpha = 0.85 + Math.random() * 0.15;
      m.active = true;
    }

    function init() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      stars = [];
      const count = Math.floor((W * H) / 1800);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.1 + 0.2,
          baseA: Math.random() * 0.65 + 0.1,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.022,
        });
      }
    }

    let tick = 0;
    function loop() {
      tick++;
      ctx.clearRect(0, 0, W, H);

      /* --- stars --- */
      for (const s of stars) {
        const a = Math.max(0.05, Math.min(1, s.baseA + Math.sin(s.phase + tick * s.speed) * 0.28));
        ctx.globalAlpha = a;
        ctx.fillStyle   = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      /* --- meteors --- */
      for (const m of meteors) {
        if (!m.active) {
          if (Math.random() < 0.006) spawnMeteor(m);
          continue;
        }
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= 0.009;
        if (m.alpha <= 0 || m.y > H + 60 || m.x < -60) { m.active = false; continue; }

        /* trail */
        const spd   = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
        const tx    = m.x - (m.vx / spd) * m.len;
        const ty    = m.y - (m.vy / spd) * m.len;
        const trail = ctx.createLinearGradient(m.x, m.y, tx, ty);
        trail.addColorStop(0, `rgba(220,235,255,${m.alpha})`);
        trail.addColorStop(1, "rgba(220,235,255,0)");
        ctx.globalAlpha  = 1;
        ctx.strokeStyle  = trail;
        ctx.lineWidth    = 1.5;
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();

        /* head glow */
        const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
        hg.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        hg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath(); ctx.arc(m.x, m.y, 6, 0, Math.PI * 2); ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(loop);
    }

    init();
    loop();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   Soft nebula glows (CSS animated, zero canvas cost)
═══════════════════════════════════════════════════════════════ */
function NebulaPulse() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* top-left violet */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "-8%", left: "-6%",
          width: "52vw", height: "38vw",
          background: "radial-gradient(circle, rgba(80,30,160,0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* right-center blue */}
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "30%", right: "-8%",
          width: "45vw", height: "40vw",
          background: "radial-gradient(circle, rgba(30,60,160,0.06) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.06, 1], x: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      {/* bottom centre warm violet */}
      <motion.div
        className="absolute rounded-full"
        style={{
          bottom: "-10%", left: "25%",
          width: "55vw", height: "35vw",
          background: "radial-gradient(circle, rgba(100,20,180,0.05) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Scan-line vignette (pure CSS, single div)
═══════════════════════════════════════════════════════════════ */
function Vignette() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 4,
        background:
          "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */
export function SpaceBackground({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#000000",
        clipPath: "inset(0)",
      }}
    >
      {/* solid black base */}
      <div className="absolute inset-0" style={{ background: "#000000", zIndex: 0 }} />

      {/* star field + meteors */}
      <StarField />

      {/* nebula colour glow pulses */}
      <NebulaPulse />

      {/* edge vignette */}
      <Vignette />

      {/* page content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
