"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  strength = 20,
  onClick,
  variant = "primary"
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(0, { damping: 20, stiffness: 300 });
  const springY = useSpring(0, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    springX.set(deltaX / strength);
    springY.set(deltaY / strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    springX.set(0);
    springY.set(0);
  };

  const variants = {
    primary: "bg-gradient-to-r from-deep-green to-forest-green text-text-primary shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-warm-gold to-rich-gold text-text-dark shadow-lg hover:shadow-xl",
    ghost: "border-2 border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-text-dark"
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative inline-block cursor-pointer select-none",
        className
      )}
    >
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-full px-8 py-4 font-semibold transition-all duration-300",
          variants[variant]
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glowing effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0"
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
          }}
          style={{
            background: variant === "primary"
              ? "radial-gradient(circle, rgba(0,95,2,0.4) 0%, transparent 70%)"
              : variant === "secondary"
              ? "radial-gradient(circle, rgba(192,184,122,0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(192,184,122,0.2) 0%, transparent 70%)"
          }}
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: [
              "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 70%, transparent 100%)",
              "linear-gradient(45deg, transparent 60%, rgba(255,255,255,0.1) 100%, transparent 100%)"
            ]
          }}
          transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
        />
      </motion.div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-warm-gold opacity-0"
        animate={isHovered ? {
          scale: [1, 1.2],
          opacity: [0.5, 0],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
}