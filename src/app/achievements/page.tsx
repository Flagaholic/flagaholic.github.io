"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import { Sparkles } from "@/components/ui/sparkles";
import { MovingBorder } from "@/components/ui/moving-border";
import {
  achievements2026,
  achievements2025,
  topAchievements,
  teamStats,
  teamInfo
} from "@/lib/data/team";
import { Trophy, TrendingUp, Award, Calendar } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

export default function AchievementsPage() {
  const [activeYear, setActiveYear] = useState<"2026" | "2025" | "top">("top");

  const getTimelineData = () => {
    const achievements = activeYear === "2026" ? achievements2026 :
                       activeYear === "2025" ? achievements2025 :
                       topAchievements;

    return achievements.map(achievement => ({
      id: achievement.id,
      title: achievement.competition,
      date: formatDateShort(achievement.date),
      placement: achievement.placement,
      points: achievement.points,
      ratingPoints: achievement.ratingPoints,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary via-charcoal to-bg-primary">
      <Sparkles className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary">
            Achievements
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our journey through competitive CTF challenges and tournaments
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12"
        >
          <div className="bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-xl p-6 text-center">
            <Trophy className="h-8 w-8 text-warm-gold mb-2 mx-auto" />
            <div className="text-2xl font-bold text-text-primary">#{teamStats.currentRanking}</div>
            <div className="text-sm text-text-secondary">Global Ranking 2026</div>
          </div>

          <div className="bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-xl p-6 text-center">
            <Award className="h-8 w-8 text-warm-gold mb-2 mx-auto" />
            <div className="text-2xl font-bold text-text-primary">#{teamStats.countryRanking}</div>
            <div className="text-sm text-text-secondary">Hong Kong Ranking</div>
          </div>

          <div className="bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-xl p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mb-2 mx-auto" />
            <div className="text-2xl font-bold text-text-primary">
              {teamStats.previousRanking ? `+${teamStats.previousRanking.ranking - teamStats.currentRanking}` : "--"}
            </div>
            <div className="text-sm text-text-secondary">Improvement from 2025</div>
          </div>

          <div className="bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-xl p-6 text-center">
            <Calendar className="h-8 w-8 text-sage-green mb-2 mx-auto" />
            <div className="text-2xl font-bold text-text-primary">
              {(achievements2026.length + achievements2025.length)}
            </div>
            <div className="text-sm text-text-secondary">Total Competitions</div>
          </div>
        </motion.div>

        {/* Year Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center space-x-4 mb-12"
        >
          <MovingBorder
            onClick={() => setActiveYear("top")}
            className={`px-6 py-3 ${
              activeYear === "top" ? "bg-warm-gold/20" : "bg-stone-gray/60"
            }`}
            containerClassName="rounded-full"
          >
            Top Achievements
          </MovingBorder>
          <MovingBorder
            onClick={() => setActiveYear("2026")}
            className={`px-6 py-3 ${
              activeYear === "2026" ? "bg-warm-gold/20" : "bg-stone-gray/60"
            }`}
            containerClassName="rounded-full"
          >
            2026 ({achievements2026.length} events)
          </MovingBorder>
          <MovingBorder
            onClick={() => setActiveYear("2025")}
            className={`px-6 py-3 ${
              activeYear === "2025" ? "bg-warm-gold/20" : "bg-stone-gray/60"
            }`}
            containerClassName="rounded-full"
          >
            2025 ({achievements2025.length} events)
          </MovingBorder>
        </motion.div>

        {/* Timeline */}
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Timeline items={getTimelineData()} />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="text-center mt-16 bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-4">Ready to Compete?</h2>
          <p className="text-text-secondary mb-6">
            Join {teamInfo.name} and be part of our next achievement
          </p>
          <MovingBorder
            className="px-8 py-3"
            containerClassName="rounded-full mx-auto"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Join Our Team
          </MovingBorder>
        </motion.div>
      </div>
    </main>
  );
}