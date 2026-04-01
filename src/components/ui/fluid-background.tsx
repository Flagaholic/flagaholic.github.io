"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FluidBackground({ className }: { className?: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // If user prefers reduced motion, show static only
  if (prefersReducedMotion) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden bg-gradient-to-b from-warm-gold/10 to-deep-green/5", className)} />
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Primary fluid blob */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-warm-gold/30 to-forest-green/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary fluid blob */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-deep-green/20 to-warm-gold/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Tertiary blob - reduced particles for performance */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-forest-green/15 to-deep-green/10 rounded-full blur-2xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Reduced floating particles - only 2 instead of 6 */}
      {[
        { left: 15, top: 20, duration: 10, delay: 0 },
        { left: 70, top: 15, duration: 8, delay: 6 },
      ].map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-warm-gold/40 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}