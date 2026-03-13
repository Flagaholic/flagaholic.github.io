"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export interface TextGenerateProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerate({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateProps) {
  const wordsArray = words.split(" ");

  return (
    <div className={className}>
      <div className="mt-4">
        <div className="text-text-primary">
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                className="text-text-primary opacity-0"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: duration,
                  delay: idx * 0.1,
                }}
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}