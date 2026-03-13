"use client";

import React from "react";
import { motion } from "framer-motion";
import { ToggleTheme, AnimationType } from "@/components/ui/toggle-theme";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientText } from "@/components/ui/gradient-text";

const animations: { name: string; type: AnimationType; description: string }[] = [
  { name: "Shrink Grow", type: "shrink-grow", description: "Smooth scale transition" },
  { name: "Circle Spread", type: "circle-spread", description: "Radial expansion effect" },
  { name: "Fade In Out", type: "fade-in-out", description: "Simple opacity transition" },
  { name: "Swipe Left", type: "swipe-left", description: "Horizontal slide effect" },
  { name: "Wave Ripple", type: "wave-ripple", description: "Ripple wave animation" },
  { name: "None", type: "none", description: "Instant toggle" },
];

export function ThemeShowcase() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <GradientText className="text-4xl md:text-5xl font-bold mb-6">
            Theme Toggle Showcase
          </GradientText>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Click each button to toggle the theme and see the unique <span className="text-warm-gold font-semibold">View Transition</span> effect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animations.map((animation, index) => (
            <motion.div
              key={animation.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-6 text-center h-full">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {animation.name}
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  {animation.description}
                </p>

                <div className="flex justify-center mb-4">
                  <ToggleTheme
                    animationType={animation.type}
                    duration={600}
                    className="h-14 w-14"
                  />
                </div>

                <div className="text-xs text-text-muted font-mono bg-bg-elevated rounded px-2 py-1">
                  {animation.type}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16"
        >
          <GlassCard className="p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
              How to Use
            </h3>

            <div className="space-y-4 text-sm">
              <div className="bg-bg-elevated rounded-lg p-4 font-mono">
                <div className="text-warm-gold mb-2">// Import the component</div>
                <div className="text-text-secondary">
                  import {"{"} ToggleTheme {"}"} from "@/components/ui/toggle-theme";
                </div>
              </div>

              <div className="bg-bg-elevated rounded-lg p-4 font-mono">
                <div className="text-warm-gold mb-2">// Basic usage with shrink-grow animation</div>
                <div className="text-text-secondary">
                  {"<"}ToggleTheme <br />
                  {"  "}animationType="shrink-grow" <br />
                  {"  "}duration={"{600}"} <br />
                  {"/>"}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-warm-gold/10 rounded-lg border border-warm-gold/20">
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-warm-gold">Note:</span> The View Transition API
                is supported in modern browsers. The component gracefully falls back to instant
                theme switching in unsupported browsers.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}