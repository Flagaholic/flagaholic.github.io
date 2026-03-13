"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { teamInfo } from "@/lib/data/team";
import { Mail, MessageCircle, Globe, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal border-t border-soft-gray">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Team info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              {teamInfo.name}
            </h3>
            <p className="text-text-secondary mb-4 max-w-md">
              {teamInfo.description} Based in {teamInfo.location}, we compete in CTF challenges worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href={`mailto:${teamInfo.email}`}
                className="text-warm-gold hover:text-text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={`https://discord.com/users/${teamInfo.discord}`}
                className="text-warm-gold hover:text-text-primary transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`https://${teamInfo.website}`}
                className="text-warm-gold hover:text-text-primary transition-colors"
                aria-label="Website"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-text-secondary hover:text-warm-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/members"
                  className="text-text-secondary hover:text-warm-gold transition-colors"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-text-secondary hover:text-warm-gold transition-colors"
                >
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-secondary hover:text-warm-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Team aliases */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Also Known As</h4>
            <div className="space-y-1">
              {teamInfo.aliases.map((alias) => (
                <div
                  key={alias}
                  className="text-sm text-text-secondary font-mono"
                >
                  {alias}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-soft-gray/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-muted text-sm mb-4 md:mb-0">
              © {currentYear} {teamInfo.name}. All rights reserved.
            </div>
            <div className="flex items-center space-x-2 text-text-muted text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by the {teamInfo.name} team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent pointer-events-none" />
    </footer>
  );
}