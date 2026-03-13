"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Calendar, Star } from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  placement: number;
  points: number;
  ratingPoints: number;
  description?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-warm-gold to-deep-green" />

      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative flex items-start ml-16"
          >
            {/* Timeline dot */}
            <div className="absolute -left-12 top-2">
              <div className="w-6 h-6 bg-warm-gold rounded-full border-4 border-stone-gray flex items-center justify-center">
                <Trophy className="h-3 w-3 text-text-primary" />
              </div>
            </div>

            {/* Content card */}
            <div className="bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-xl p-6 w-full hover:border-warm-gold/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>#{item.placement}</span>
                    </div>
                  </div>
                </div>

                {/* Placement badge */}
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-bold",
                    item.placement <= 10
                      ? "bg-warm-gold/30 text-text-primary border border-warm-gold"
                      : item.placement <= 50
                      ? "bg-forest-green/30 text-text-primary border border-forest-green"
                      : "bg-deep-green/30 text-text-primary border border-deep-green"
                  )}
                >
                  #{item.placement}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-deep-green/20 border border-deep-green/30 rounded-lg p-3">
                  <div className="text-lg font-bold text-text-primary">
                    {item.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-muted">CTF Points</div>
                </div>
                <div className="bg-warm-gold/20 border border-warm-gold/30 rounded-lg p-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-warm-gold" />
                    <div className="text-lg font-bold text-text-primary">
                      {item.ratingPoints.toFixed(3)}
                    </div>
                  </div>
                  <div className="text-sm text-text-muted">Rating Points</div>
                </div>
              </div>

              {item.description && (
                <p className="mt-4 text-text-secondary text-sm">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}