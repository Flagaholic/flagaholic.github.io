"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  gradient?: string;
  index?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient = "from-deep-green to-forest-green",
  index = 0,
  trend
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-warm-gold/20 to-deep-green/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bg-secondary/40 to-bg-secondary/20 backdrop-blur-md border border-soft-gray/30 shadow-2xl">
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header with icon */}
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-warm-gold/20 to-deep-green/20 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Icon className="h-6 w-6 text-warm-gold" />
            </motion.div>

            {trend && (
              <div className={cn(
                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-forest-green/30 text-forest-green border border-forest-green/50"
                  : "bg-red-500/30 text-red-400 border border-red-500/50"
              )}>
                {trend.isPositive ? "↗" : "↘"} {trend.value}%
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <motion.div
              className="text-3xl font-bold text-text-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {value}
            </motion.div>

            <div className="text-sm font-medium text-warm-gold">
              {title}
            </div>

            <div className="text-xs text-text-muted">
              {subtitle}
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-warm-gold/30 rounded-full animate-pulse" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-forest-green/40 rounded-full animate-bounce" style={{ animationDelay: "1s" }} />
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-warm-gold/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      </div>
    </motion.div>
  );
}