"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";
import { FluidBackground } from "@/components/ui/fluid-background";
import { AnimatedTitle } from "@/components/ui/gradient-text";
import { MembersGridSkeleton } from "@/components/ui/member-card-skeleton";
import { MembersContent } from "@/components/sections/members-content";
import { currentMembers, teamInfo } from "@/lib/data/team";

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

        {/* Members Grid with Suspense */}
        <Suspense fallback={<MembersGridSkeleton />}>
          <MembersContent />
        </Suspense>
      </div>
    </main>
  );
}