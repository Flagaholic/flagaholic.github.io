"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FluidBackground({ className }: { className?: string }) {
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

      {/* Tertiary blob */}
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

      {/* Floating particles */}
      {[
        { left: 15, top: 20, duration: 10, delay: 0 },
        { left: 85, top: 35, duration: 12, delay: 2 },
        { left: 45, top: 70, duration: 9, delay: 4 },
        { left: 25, top: 85, duration: 11, delay: 1 },
        { left: 70, top: 15, duration: 8, delay: 6 },
        { left: 60, top: 55, duration: 13, delay: 3 },
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

export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full h-64"
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#005F02" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#427A43" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#C0B87A" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,192 C120,150 240,100 360,128 C480,156 600,200 720,192 C840,184 960,120 1080,128 C1140,132 1170,140 1200,144 L1200,320 L0,320 Z"
          fill="url(#waveGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <motion.path
          d="M0,224 C120,200 240,160 360,180 C480,200 600,240 720,224 C840,208 960,160 1080,168 C1140,172 1170,176 1200,180 L1200,320 L0,320 Z"
          fill="url(#waveGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
}