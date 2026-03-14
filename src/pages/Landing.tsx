import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bot, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/HeroSection";
import { Features } from "@/components/sections/Features";
import { Integrations } from "@/components/sections/Integrations";
import { Pricing } from "@/components/sections/Pricing";
import { SpaceBackground } from "@/components/SpaceBackground";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Features");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "features") setActiveTab("Features");
          if (id === "integrations") setActiveTab("Integrations");
          if (id === "pricing") setActiveTab("Pricing");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Sections to observe
    const sections = ["features", "integrations", "pricing"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Navigation */}
      <NavBar 
        isScrolled={isScrolled}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        items={[
          { name: "Features", url: "#features", icon: Bot },
          { name: "Integrations", url: "#integrations", icon: Bot },
          { name: "Pricing", url: "#pricing", icon: Bot },
        ]} 
      />

      {/* Main Content — one SpaceBackground wraps everything */}
      <SpaceBackground>
        <main className="flex flex-col">
          <HeroSection />
          <SectionDivider />
          <Features />
          <SectionDivider />
          <Integrations />
          <SectionDivider />
          <Pricing />

          {/* Footer */}
          <footer className="py-16 md:py-24 border-t border-white/5 relative">
            <div className="absolute inset-0 ai-grid opacity-5 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xl font-black text-white tracking-tighter">
                  Support<span className="text-primary">AI</span>
                </span>
              </div>

              <p className="text-gray-500 text-sm font-light">
                © 2024 SupportAI. Built with the intelligence of the future.
              </p>

              <div className="flex gap-8">
                {["Twitter", "GitHub", "Discord"].map(social => (
                  <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </SpaceBackground>
    </div>
  );
};

export default Landing;
