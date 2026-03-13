"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animated?: boolean;
}

export function GradientText({
  children,
  className,
  gradient = "from-warm-gold via-forest-green to-deep-green",
  animated = true
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`,
        animated && "bg-[length:200%_100%]",
        className
      )}
      animate={animated ? {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      } : undefined}
      transition={animated ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      } : undefined}
      style={animated ? {
        backgroundImage: `linear-gradient(90deg, #C0B87A 0%, #427A43 25%, #005F02 50%, #427A43 75%, #C0B87A 100%)`,
      } : undefined}
    >
      {children}
    </motion.span>
  );
}

export function AnimatedTitle({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <div className={cn("overflow-hidden", className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.25, 0.25, 0, 1],
          }}
        >
          <GradientText>{word}</GradientText>
        </motion.span>
      ))}
    </div>
  );
}