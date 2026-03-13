"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  gradient = false
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-soft-gray/30",
        "backdrop-blur-md bg-bg-secondary/30",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        gradient && "bg-gradient-to-br from-bg-secondary/40 to-bg-secondary/20",
        className
      )}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-warm-gold/20 via-forest-green/20 to-warm-gold/20" />
    </motion.div>
  );
}

export function GlassPanel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl",
      "backdrop-blur-xl bg-gradient-to-br from-bg-secondary/40 to-bg-secondary/20",
      "border border-soft-gray/30 shadow-2xl",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-warm-gold/10 before:to-forest-green/5 before:rounded-3xl",
      className
    )}>
      <div className="relative z-10 p-8">
        {children}
      </div>
    </div>
  );
}