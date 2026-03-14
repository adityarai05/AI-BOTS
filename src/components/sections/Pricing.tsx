"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    description:
      "Great for small businesses and startups looking to get started with AI",
    price: 49,
    yearlyPrice: 39,
    buttonText: "Get started",
    buttonVariant: "outline" as const,
    includes: [
      "Access to AI Network",
      "1,000 Messages/mo",
      "Standard Voice Agents",
      "Essential Analytics",
      "Community Support",
    ],
  },
  {
    name: "Business",
    description:
      "Best value for growing businesses that need more advanced features",
    price: 129,
    yearlyPrice: 99,
    buttonText: "Go Pro",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Everything in Starter, plus:",
      "10,000 Messages/mo",
      "HD Voice Agents",
      "Priority API Access",
      "Custom Workflow Hub",
      "Priority 24/7 Support",
    ],
  },
  {
    name: "Enterprise",
    description:
      "Advanced plan with enhanced security and unlimited access for large teams",
    price: 499,
    yearlyPrice: 399,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    includes: [
      "Everything in Business, plus:",
      "Unlimited AI Nodes",
      "Custom LLM Fine-tuning",
      "Dedicated Technical Lead",
      "SLA Guarantee",
      "On-premise Deployment",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10  rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-400",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border border-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-gradient-to-t from-primary/80 to-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-400",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full  rounded-full border border-primary/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-gradient-to-t from-primary/80 to-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yearly</span>
        </button>
      </div>
    </div>
  );
};

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(parseInt(value) === 1);

  return (
    <section 
      id="pricing"
      className="py-32 relative bg-[#030303] overflow-hidden scroll-mt-20"
      ref={pricingRef}
    >
      {/* Deep Void Background sync with Hero */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Deep Nebula pulses (Matching HeroSection) */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-violet-900/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Material Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-90 contrast-125 mix-blend-overlay" />
      <div className="absolute top-0 left-0 right-0 h-96 [mask-image:radial-gradient(50%_50%,white,transparent)] pointer-events-none">
        <SparklesComp
          density={800}
          direction="bottom"
          speed={0.5}
          color="#38bdf8"
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-50">
        <article className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              containerClassName="justify-center "
            >
              INVEST IN SUPREMACY
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Flexible plans designed for teams pushing the boundaries of autonomous intelligence.
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <PricingSwitch onSwitch={togglePricingPeriod} />
          </TimelineContent>
        </article>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <TimelineContent
              key={plan.name}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
            >
              <Card
                className={`relative h-full flex flex-col border-neutral-800 transition-all duration-500 hover:border-primary/50 group ${
                  plan.popular
                    ? "bg-gradient-to-b from-neutral-900 via-black to-black shadow-[0_20px_80px_-20px_rgba(34,211,238,0.15)] ring-1 ring-primary/20"
                    : "bg-black/50 backdrop-blur-sm shadow-2xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full z-30">
                    Most Advanced
                  </div>
                )}
                
                <CardHeader className="text-left space-y-4 pt-10">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-widest">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">$</span>
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-5xl font-black text-white"
                    />
                    <span className="text-gray-500 font-medium ml-1">
                      /{isYearly ? "yr" : "mo"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col pt-0">
                  <button
                    className={cn(
                      "w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all duration-300 transform group-hover:scale-[1.02]",
                      plan.popular
                        ? "bg-primary text-black shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    )}
                  >
                    {plan.buttonText}
                  </button>

                  <div className="mt-8 space-y-4 pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                      Included Capabilities
                    </h4>
                    <ul className="space-y-3">
                      {plan.includes.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="mt-1 h-3 w-3 rounded-full border border-primary/30 bg-primary/10 flex-shrink-0" />
                          <span className="text-sm text-gray-300 font-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  );
}
