"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement>;
  customVariants: any;
  children: React.ReactNode;
  className?: string;
  as?: any;
}

export const TimelineContent = ({
  animationNum,
  timelineRef,
  customVariants,
  children,
  className,
  as = "div",
}: TimelineContentProps) => {
  const Component = motion[as as keyof typeof motion] || motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={customVariants}
      custom={animationNum}
      className={cn(className)}
    >
      {children}
    </Component>
  );
};
