"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";
import { FluidBackground } from "@/components/ui/fluid-background";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTitle } from "@/components/ui/gradient-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { currentMembers, teamInfo } from "@/lib/data/team";
import { User, Shield, Mail, MessageCircle } from "lucide-react";

export default function MembersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary via-charcoal to-bg-primary">
      <FluidBackground />
      <Sparkles className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AnimatedTitle className="text-4xl md:text-6xl font-bold mb-6">
            Team Members
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            Meet the <span className="font-bold text-warm-gold">{currentMembers.length}</span> talented individuals who make up {teamInfo.name}
          </motion.p>
        </motion.div>

        {/* Members Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
        >
          {currentMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <GlassCard className="w-64 h-80">
                <div className="text-center space-y-4 p-6">
                  {/* Avatar */}
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-deep-green to-forest-green rounded-full flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-text-primary" />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-text-primary">
                    {member.name}
                  </h3>

                  {/* Role or generic info */}
                  <div className="flex items-center justify-center space-x-2 text-warm-gold">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">CTF Player</span>
                  </div>

                  {/* Specialties placeholder */}
                  <div className="flex flex-wrap gap-1 justify-center">
                    {["Web", "Crypto", "Pwn", "Rev", "Misc", "OSINT"]
                      .slice(0, (index % 3) + 1)
                      .map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-warm-gold/20 border border-warm-gold/30 rounded-md text-xs text-warm-gold"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <GlassCard className="p-10 text-center" gradient={true}>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
            >
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                Ready to Join the Elite? 🚀
              </h2>
              <p className="text-text-secondary mb-8 text-lg leading-relaxed">
                {teamInfo.recruitmentInfo}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <MagneticButton variant="primary" strength={20}>
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Discord: {teamInfo.discord}
                </MagneticButton>
                <MagneticButton variant="secondary" strength={20}>
                  <Mail className="h-5 w-5 mr-2" />
                  Email Us
                </MagneticButton>
              </div>

              <div className="text-sm text-text-muted">
                <p>We welcome CTF enthusiasts of all skill levels!</p>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}