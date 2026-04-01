"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTitle } from "@/components/ui/gradient-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { FluidBackground } from "@/components/ui/fluid-background";
import { Sparkles } from "@/components/ui/sparkles";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary via-charcoal to-bg-primary flex items-center justify-center">
      <FluidBackground />
      <Sparkles className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <GlassCard className="p-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-warm-gold to-forest-green mb-6">
                404
              </div>
            </motion.div>

            <AnimatedTitle className="text-4xl md:text-5xl font-bold mb-6">
              Page Not Found
            </AnimatedTitle>

            <p className="text-xl text-text-secondary mb-8">
              Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <MagneticButton variant="primary" strength={20}>
                  <Home className="h-5 w-5 mr-2" />
                  Back to Home
                </MagneticButton>
              </Link>
              <Link href="/members">
                <MagneticButton variant="secondary" strength={20}>
                  <Search className="h-5 w-5 mr-2" />
                  Explore Members
                </MagneticButton>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 text-sm text-text-muted"
            >
              <p>If you believe this is a mistake, please contact us.</p>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
