"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";
import { FluidBackground } from "@/components/ui/fluid-background";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AnimatedTitle } from "@/components/ui/gradient-text";
import { MovingBorder } from "@/components/ui/moving-border";
import { teamInfo } from "@/lib/data/team";
import { Mail, MessageCircle, Globe, MapPin, Clock, Users, Github, Trophy } from "lucide-react";
import { CodeHoverCards } from "@/components/ui/code-hover-cards";

export default function ContactPage() {
  const teamInfo2 = [
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Location",
      value: teamInfo.location
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: "Timezone",
      value: teamInfo.timezone
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "Recruitment",
      value: teamInfo.recruiting ? "Open" : "Closed"
    }
  ];

  const externalLinks = [
    {
      id: "github",
      icon: Github,
      title: "GitHub",
      description: "Explore our code repositories",
      href: "https://github.com/Flagaholic"
    },
    {
      id: "ctftime",
      icon: Trophy,
      title: "CTFtime",
      description: "View our CTF competition history",
      href: "https://ctftime.org/team/113364"
    },
    {
      id: "website",
      icon: Globe,
      title: "Official Site",
      description: "Visit our main website",
      href: "https://www.flagaholic.xyz"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary via-charcoal to-bg-primary">
      <FluidBackground />
      <Sparkles className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AnimatedTitle className="text-4xl md:text-6xl font-bold mb-6">
            Get In Touch
          </AnimatedTitle>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ready to join {teamInfo.name}? Have questions or want to collaborate? We'd love to hear from you!
          </p>
        </motion.div>


        {/* External Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Find Us Online
          </h2>
          <CodeHoverCards
            cards={externalLinks}
            columns={3}
            gradientColors={["#005F02", "#427A43", "#C0B87A", "#F2E3BB"]}
            backgroundColor="transparent"
            borderColor="rgba(138, 128, 104, 0.2)"
            iconColor="#C0B87A"
            maskRadius={300}
            characterCount={1500}
            animationDuration={1.5}
            enableTouch={true}
            showBorder={true}
            onCardClick={(card) => console.log(`Clicked: ${card.title}`)}
          />
        </motion.div>

        {/* Team Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-bg-secondary/80 backdrop-blur-sm border border-soft-gray rounded-2xl p-8 max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Team Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {teamInfo2.map((info, index) => (
              <div
                key={info.label}
                className="flex items-center space-x-3 bg-deep-green/10 rounded-lg p-4"
              >
                <div className="text-warm-gold">
                  {info.icon}
                </div>
                <div>
                  <div className="text-sm text-text-muted">{info.label}</div>
                  <div className="text-text-primary font-medium">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Team aliases */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Also known as:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {teamInfo.aliases.map((alias) => (
                <span
                  key={alias}
                  className="px-3 py-1 bg-forest-green/20 border border-forest-green/30 rounded-full text-sm font-mono text-warm-gold"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recruitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="bg-gradient-to-r from-deep-green/20 to-forest-green/20 backdrop-blur-sm border border-forest-green/30 rounded-2xl p-8 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            🚀 Join Our Team
          </h2>

          <p className="text-text-secondary text-lg mb-6">
            {teamInfo.recruitmentInfo}
          </p>

          <div className="space-y-4 mb-8">
            <p className="text-text-muted">
              We're always looking for passionate CTF players who want to learn, grow, and compete at the highest level.
            </p>
            <p className="text-text-muted">
              Whether you're a beginner or an expert, there's a place for you in our team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MovingBorder
              onClick={() => window.open(`https://discord.com/users/${teamInfo.discord}`, '_blank')}
              className="px-8 py-3"
              containerClassName="rounded-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact on Discord
            </MovingBorder>

            <MovingBorder
              onClick={() => window.open(`mailto:${teamInfo.email}`, '_blank')}
              className="px-8 py-3"
              containerClassName="rounded-full"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </MovingBorder>
          </div>
        </motion.div>
      </div>
    </main>
  );
}