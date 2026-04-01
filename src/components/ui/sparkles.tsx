"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SparkleProps {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

export function Sparkles({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const colors = ["#005F02", "#427A43", "#C0B87A", "#F2E3BB"];

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return; // Don't animate if user prefers reduced motion

    const generateSparkle = (): SparkleProps => {
      return {
        id: String(Math.random()),
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        scale: Math.random() * 1 + 0.3,
        lifespan: Math.random() * 10 + 5,
      };
    };

    const addSparkle = () => {
      const sparkle = generateSparkle();
      setSparkles((prev) => {
        // Limit sparkles to max 10 for performance
        const updated = [...prev, sparkle];
        return updated.length > 10 ? updated.slice(-10) : updated;
      });
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, sparkle.lifespan * 1000);
    };

    // Increase interval from 300ms to 500ms to reduce sparkle creation rate
    const interval = setInterval(addSparkle, 500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Show nothing if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} {...props}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute opacity-70"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: `${sparkle.delay}s`,
            transform: `scale(${sparkle.scale})`,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 0L7.975 5.025L13 6L7.975 6.975L7 12L6.025 6.975L1 6L6.025 5.025L7 0Z"
              fill={sparkle.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}