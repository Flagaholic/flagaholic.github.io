"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnimationType =
  | "none"
  | "circle-spread"
  | "round-morph"
  | "swipe-left"
  | "swipe-up"
  | "diag-down-right"
  | "fade-in-out"
  | "shrink-grow"
  | "flip-x-in"
  | "split-vertical"
  | "swipe-right"
  | "swipe-down"
  | "wave-ripple";

export interface ToggleThemeProps {
  duration?: number;
  animationType?: AnimationType;
  className?: string;
}

export function ToggleTheme({
  duration = 400,
  animationType = "circle-spread",
  className
}: ToggleThemeProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const getAnimationCSS = (type: AnimationType): string => {
    switch (type) {
      case "circle-spread":
        return `
          ::view-transition-old(root),
          ::view-transition-new(root) {
            animation-duration: ${duration}ms;
          }

          ::view-transition-new(root) {
            mask: circle(0% at 50% 50%);
            animation-name: circle-spread;
          }

          @keyframes circle-spread {
            to {
              mask: circle(100% at 50% 50%);
            }
          }
        `;

      case "shrink-grow":
        return `
          ::view-transition-old(root) {
            animation: shrink ${duration}ms ease-in-out;
          }

          ::view-transition-new(root) {
            animation: grow ${duration}ms ease-in-out;
          }

          @keyframes shrink {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0.8);
              opacity: 0;
            }
          }

          @keyframes grow {
            from {
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `;

      case "fade-in-out":
        return `
          ::view-transition-old(root) {
            animation: fade-out ${duration}ms ease-in-out;
          }

          ::view-transition-new(root) {
            animation: fade-in ${duration}ms ease-in-out;
          }

          @keyframes fade-out {
            to { opacity: 0; }
          }

          @keyframes fade-in {
            from { opacity: 0; }
          }
        `;

      case "swipe-left":
        return `
          ::view-transition-old(root) {
            animation: swipe-out-left ${duration}ms ease-in-out;
          }

          ::view-transition-new(root) {
            animation: swipe-in-right ${duration}ms ease-in-out;
          }

          @keyframes swipe-out-left {
            to { transform: translateX(-100%); }
          }

          @keyframes swipe-in-right {
            from { transform: translateX(100%); }
          }
        `;

      case "wave-ripple":
        return `
          ::view-transition-old(root) {
            animation: wave-out ${duration}ms ease-in-out;
          }

          ::view-transition-new(root) {
            animation: wave-in ${duration}ms ease-in-out;
          }

          @keyframes wave-out {
            to {
              transform: scale(0) rotate(180deg);
              opacity: 0;
              border-radius: 50%;
            }
          }

          @keyframes wave-in {
            from {
              transform: scale(0) rotate(-180deg);
              opacity: 0;
              border-radius: 50%;
            }
          }
        `;

      default:
        return "";
    }
  };

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      document.documentElement.classList.toggle('dark');
      setIsDark(!isDark);
      return;
    }

    // Add animation CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = getAnimationCSS(animationType);
    document.head.appendChild(styleElement);

    // Start view transition
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark');
      setIsDark(!isDark);
    });

    // Clean up style element after transition
    transition.finished.finally(() => {
      document.head.removeChild(styleElement);
    });
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-12 w-12 items-center justify-center rounded-full",
        "bg-gradient-to-br from-warm-gold/20 to-deep-green/20 backdrop-blur-md",
        "border border-soft-gray/30 shadow-lg transition-all duration-300",
        "hover:scale-110 hover:shadow-xl hover:from-warm-gold/30 hover:to-deep-green/30",
        "active:scale-95",
        className
      )}
      whileHover={{ rotate: 180 }}
      whileTap={{ rotate: 360 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-warm-gold/20"
        animate={{
          scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Icon container */}
      <div className="relative z-10">
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-blue-200" />
          ) : (
            <Sun className="h-5 w-5 text-warm-gold" />
          )}
        </motion.div>
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-warm-gold/30"
        animate={{
          scale: [1, 1.5],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
}