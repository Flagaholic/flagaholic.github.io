"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface CardData {
  id: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  href?: string;
}

export interface CodeHoverCardsProps {
  cards: CardData[];
  className?: string;
  cardClassName?: string;
  gradientColors?: string[];
  maskRadius?: number;
  characterCount?: number;
  characterSet?: string;
  animationDuration?: number;
  borderRadius?: number;
  cardGap?: string;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  enableTouch?: boolean;
  columns?: 1 | 2 | 3 | 4;
  minHeight?: number;
  onCardClick?: (card: CardData) => void;
  onCardHover?: (card: CardData) => void;
  disabled?: boolean;
  showBorder?: boolean;
}

const generateRandomCharacters = (count: number, characterSet: string): string[] => {
  const chars = [];
  for (let i = 0; i < count; i++) {
    chars.push(characterSet[Math.floor(Math.random() * characterSet.length)]);
  }
  return chars;
};

export function CodeHoverCards({
  cards,
  className,
  cardClassName,
  gradientColors = ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
  maskRadius = 400,
  characterCount = 2000,
  characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
  animationDuration = 2,
  borderRadius = 16,
  cardGap = "1rem",
  iconSize = 48,
  iconColor = "#C0B87A",
  backgroundColor = "#2D2B26",
  borderColor = "rgba(255,255,255,0.1)",
  enableTouch = true,
  columns = 3,
  minHeight = 200,
  onCardClick,
  onCardHover,
  disabled = false,
  showBorder = true
}: CodeHoverCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [characters, setCharacters] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCharacters(generateRandomCharacters(characterCount, characterSet));
    setIsMounted(true);
  }, [characterCount, characterSet]);

  const handleCardClick = (card: CardData) => {
    if (disabled) return;
    if (card.href) {
      window.open(card.href, '_blank');
    }
    onCardClick?.(card);
  };

  const handleCardHover = (card: CardData | null) => {
    if (disabled) return;
    setHoveredCard(card?.id || null);
    if (card) onCardHover?.(card);
  };

  const getGridCols = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 3: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div
      className={cn("grid gap-4 p-4", getGridCols(), className)}
      style={{
        backgroundColor,
        gap: cardGap
      }}
    >
      {cards.map((card) => (
        <HoverCard
          key={card.id}
          card={card}
          isHovered={hoveredCard === card.id}
          onHover={() => handleCardHover(card)}
          onLeave={() => handleCardHover(null)}
          onClick={() => handleCardClick(card)}
          className={cardClassName}
          characters={characters}
          isMounted={isMounted}
          maskRadius={maskRadius}
          animationDuration={animationDuration}
          borderRadius={borderRadius}
          iconSize={iconSize}
          iconColor={iconColor}
          borderColor={borderColor}
          enableTouch={enableTouch}
          minHeight={minHeight}
          disabled={disabled}
          showBorder={showBorder}
          gradientColors={gradientColors}
        />
      ))}
    </div>
  );
}

interface HoverCardProps {
  card: CardData;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  className?: string;
  characters: string[];
  isMounted: boolean;
  maskRadius: number;
  animationDuration: number;
  borderRadius: number;
  iconSize: number;
  iconColor: string;
  borderColor: string;
  enableTouch: boolean;
  minHeight: number;
  disabled: boolean;
  showBorder: boolean;
  gradientColors: string[];
}

function HoverCard({
  card,
  isHovered,
  onHover,
  onLeave,
  onClick,
  className,
  characters,
  isMounted,
  maskRadius,
  animationDuration,
  borderRadius,
  iconSize,
  iconColor,
  borderColor,
  enableTouch,
  minHeight,
  disabled,
  showBorder,
  gradientColors
}: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 700 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 700 });

  const maskImage = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(${maskRadius}px circle at ${x}px ${y}px, white 0%, white 50%, transparent 100%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden cursor-pointer group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        borderRadius,
        minHeight,
        border: showBorder ? `1px solid ${borderColor}` : 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={enableTouch ? onHover : undefined}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-secondary" />

      {/* Character Matrix */}
      {isMounted && (
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 text-text-muted text-xs font-mono leading-none select-none"
            style={{
              maskImage: isHovered ? maskImage : undefined,
              WebkitMaskImage: isHovered ? maskImage : undefined,
            }}
          >
            {characters.map((char, index) => (
            <motion.span
              key={index}
              className="absolute"
              style={{
                left: `${(index * 13) % 100}%`,
                top: `${Math.floor((index * 13) / 100) * 1.2}%`,
              }}
              animate={isHovered ? {
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              } : { opacity: 0.3 }}
              transition={{
                duration: animationDuration,
                repeat: isHovered ? Infinity : 0,
                delay: (index % 100) * 0.01,
              }}
            >
              {char}
            </motion.span>
          ))}
          </motion.div>
        </div>
      )}

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${gradientColors.join(', ')})`,
        }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          className="mb-4"
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            size={iconSize}
            color={iconColor}
            className="drop-shadow-lg"
          />
        </motion.div>

        <motion.h3
          className="text-xl font-bold text-text-primary mb-2"
          animate={{ y: isHovered ? -2 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {card.title}
        </motion.h3>

        {card.description && (
          <motion.p
            className="text-sm text-text-muted"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {card.description}
          </motion.p>
        )}

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 w-8 h-1 bg-warm-gold rounded-full"
          initial={{ scale: 0, x: "-50%" }}
          animate={{ scale: isHovered ? 1 : 0, x: "-50%" }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          borderRadius,
          background: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
          padding: '1px',
          opacity: 0,
        }}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}