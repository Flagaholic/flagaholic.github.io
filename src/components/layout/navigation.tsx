"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Trophy, Mail, Menu, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleTheme } from "@/components/ui/toggle-theme";

export interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Members",
    link: "/members",
    icon: <Users className="h-4 w-4" />,
  },
  {
    name: "Achievements",
    link: "/achievements",
    icon: <Trophy className="h-4 w-4" />,
  },
  {
    name: "Writeups",
    link: "/writeups",
    icon: <BookOpen className="h-4 w-4" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <Mail className="h-4 w-4" />,
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block"
      >
        <div className="flex items-center space-x-3 bg-warm-gray/95 backdrop-blur-xl border border-soft-gray rounded-full px-6 py-3 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                "text-text-secondary hover:text-text-primary hover:bg-warm-gold/20"
              )}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}

          {/* Theme Toggle */}
          <div className="ml-2 pl-2 border-l border-soft-gray/50">
            <ToggleTheme
              animationType="circle-spread"
              duration={600}
              className="h-10 w-10"
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed top-6 right-6 z-50 md:hidden bg-warm-gray/95 backdrop-blur-xl border border-soft-gray rounded-full p-3 shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5 text-text-primary" /> : <Menu className="h-5 w-5 text-text-primary" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-40 md:hidden bg-warm-gray/95 backdrop-blur-xl border border-soft-gray rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                    "text-text-secondary hover:text-text-primary hover:bg-warm-gold/20"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}

              {/* Theme Toggle for Mobile */}
              <div className="flex justify-center pt-4 border-t border-soft-gray/50">
                <ToggleTheme
                  animationType="circle-spread"
                  duration={600}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}