"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export function MovingBorder({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const x = useSpring(mouseX, { damping: 30, stiffness: 300 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 300 });

  return (
    <Component
      className={cn(
        "group relative inline-flex h-12 overflow-hidden rounded-md p-[1px] transition-all duration-300",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
      {...otherProps}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-md",
          "bg-gradient-to-r from-deep-green via-forest-green to-warm-gold",
          "opacity-75 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        )}
      />
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 transition duration-300 group-hover:opacity-80"
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${x}px ${y}px, rgba(192, 184, 122, 0.4), transparent 80%)`,
        }}
      />
      <div
        className={cn(
          "relative z-10 flex w-full items-center justify-center rounded-md bg-bg-primary px-8 py-2 text-sm font-medium text-text-primary backdrop-blur-sm transition-colors duration-300",
          "group-hover:bg-charcoal/90",
          className
        )}
      >
        {children}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="movingBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#005F02" />
            <stop offset="50%" stopColor="#427A43" />
            <stop offset="100%" stopColor="#C0B87A" />
          </linearGradient>
        </defs>
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          stroke="url(#movingBorderGradient)"
          strokeWidth="1"
          className={cn("opacity-0 transition-opacity duration-500 group-hover:opacity-100", borderClassName)}
        />
      </svg>
    </Component>
  );
}