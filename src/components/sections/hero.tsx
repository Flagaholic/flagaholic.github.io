"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";
import { TextReveal, TextGenerate } from "@/components/ui/text-reveal";
import { MovingBorder } from "@/components/ui/moving-border";
import { FluidBackground } from "@/components/ui/fluid-background";
import { StatsCard } from "@/components/ui/stats-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GradientText, AnimatedTitle } from "@/components/ui/gradient-text";
import { GlassCard } from "@/components/ui/glass-card";
import { teamInfo, teamStats } from "@/lib/data/team";
import { Trophy, MapPin, Users, Mail, Crown, Target, Globe, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-charcoal to-bg-primary" />
      <FluidBackground />
      <Sparkles className="absolute inset-0" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 mt-8"
        >
          {/* Team aliases */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {teamInfo.aliases.map((alias, index) => (
              <GlassCard
                key={alias}
                className="px-4 py-2"
                hover={false}
              >
                <motion.span
                  className="text-xs font-mono text-warm-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {alias}
                </motion.span>
              </GlassCard>
            ))}
          </motion.div>

          {/* Main title */}
          <div className="space-y-8">
            <AnimatedTitle
              className="text-5xl md:text-7xl lg:text-8xl font-bold"
              delay={0.5}
            >
              {teamInfo.name}
            </AnimatedTitle>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-text-secondary">
                A Hong Kong-based CTF Team conquering challenges worldwide
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16">
            <StatsCard
              icon={Crown}
              title="Global Ranking"
              value={`#${teamStats.currentRanking}`}
              subtitle="Out of thousands of teams worldwide"
              gradient="from-warm-gold to-forest-green"
              index={0}
              trend={{
                value: 33,
                isPositive: true
              }}
            />

            <StatsCard
              icon={Target}
              title="Hong Kong Ranking"
              value={`#${teamStats.countryRanking}`}
              subtitle="Leading CTF team in HK"
              gradient="from-deep-green to-warm-gold"
              index={1}
              trend={{
                value: 15,
                isPositive: true
              }}
            />

            <StatsCard
              icon={Users}
              title="Team Members"
              value={teamStats.memberCount}
              subtitle="Active cybersecurity experts"
              gradient="from-forest-green to-deep-green"
              index={2}
            />

            <StatsCard
              icon={Globe}
              title="Time Zone"
              value={teamStats.timezone}
              subtitle="Based in Hong Kong"
              gradient="from-warm-gold to-deep-green"
              index={3}
            />
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
          >
            <MagneticButton
              variant="primary"
              strength={15}
              className="group"
            >
              <Mail className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
              Join Our Team
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              strength={15}
              className="group"
            >
              <Trophy className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
              View Achievements
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              strength={20}
              className="group"
            >
              <Globe className="h-5 w-5 mr-3 transition-transform group-hover:scale-110" />
              Explore Website
            </MagneticButton>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, type: "spring" }}
            className="mt-20 mb-16"
          >
            <GlassCard className="max-w-lg mx-auto p-8">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  Ready to compete? Get in touch!
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-warm-gold" />
                    <span className="text-text-muted">Email:</span>
                    <GradientText className="font-mono text-sm">
                      {teamInfo.email}
                    </GradientText>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-warm-gold" />
                    <span className="text-text-muted">Discord:</span>
                    <GradientText className="font-mono text-sm">
                      {teamInfo.discord}
                    </GradientText>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Spacer for visual separation */}
            <div className="mt-12 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm-gold/30 to-transparent mx-auto"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-soft-gray rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-text-secondary rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}