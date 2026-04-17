"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { currentMembers, teamInfo } from "@/lib/data/team";
import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function SocialIcon({ type, social }: { type: string; social: any }) {
  if (!social || !social.url) return null;

  let icon = null;
  let label = "";

  switch (type) {
    case "github":
      icon = <FaGithub className="h-4 w-4" />;
      label = "GitHub";
      break;
    case "twitter":
      icon = <FaTwitter className="h-4 w-4" />;
      label = "Twitter";
      break;
    case "instagram":
      icon = <FaInstagram className="h-4 w-4" />;
      label = "Instagram";
      break;
    case "discord":
      icon = <MessageCircle className="h-4 w-4" />;
      label = "Discord";
      break;
    case "linkedin":
      icon = <FaLinkedin className="h-4 w-4" />;
      label = "LinkedIn";
      break;
    case "blog":
      icon = <ExternalLink className="h-4 w-4" />;
      label = "Blog";
      break;
    default:
      return null;
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="text-text-secondary hover:text-warm-gold transition-colors"
    >
      {icon}
    </a>
  );
}

export function MembersContent() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {currentMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="flex"
          >
            <GlassCard className="w-full h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col flex-1 p-6 text-center">
                <div className="flex flex-col items-center mb-2">
                  {/* Avatar */}
                  <div className="w-24 h-24 bg-gradient-to-br from-deep-green to-forest-green rounded-full flex items-center justify-center overflow-hidden mb-4">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        priority={index < 4}
                      />
                    ) : (
                      <div className="text-4xl">👤</div>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-text-primary">{member.name}</h3>
                  {/* Role */}
                  {member.role && (
                    <p className="text-sm text-warm-gold">{member.role}</p>
                  )}
                </div>

                {/* Quote */}
                <div className="flex-1 flex items-center justify-center min-h-[30px]">
                  {member.quote ? (
                    <p className="text-xs text-text-muted italic px-2">
                      "{member.quote}"
                    </p>
                  ) : (
                    <div className="h-4" />
                  )}
                </div>

                {/* Specialties */}
                <div className="min-h-[20px] flex flex-wrap gap-1 justify-center items-center mb-6">
                  {member.specialties?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-warm-gold/20 border border-warm-gold/30 rounded-md text-xs text-warm-gold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Socials */}
                <div className="mt-auto pt-5 border-t border-text-secondary/10">
                  <div className="flex gap-5 justify-center">
                    {member.socials && (
                      <>
                        <SocialIcon type="github" social={member.socials.github} />
                        <SocialIcon type="twitter" social={member.socials.twitter} />
                        <SocialIcon type="instagram" social={member.socials.instagram} />
                        <SocialIcon type="discord" social={member.socials.discord} />
                        <SocialIcon type="linkedin" social={member.socials.linkedin} />
                        <SocialIcon type="blog" social={member.socials.blog} />
                      </>
                    )}
                  </div>
                </div>

              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Join Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-20 max-w-3xl mx-auto"
      >
        <GlassCard className="p-10 text-center" gradient={true}>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
          >
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Ready to Join the Elite? 🚀
            </h2>
            <p className="text-text-secondary mb-8 text-lg leading-relaxed">
              {teamInfo.recruitmentInfo}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <MagneticButton variant="primary" strength={20}>
                <MessageCircle className="h-5 w-5 mr-2" />
                Discord: {teamInfo.discord}
              </MagneticButton>
              <MagneticButton variant="secondary" strength={20}>
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </MagneticButton>
            </div>

            <div className="text-sm text-text-muted">
              <p>We welcome CTF enthusiasts of all skill levels!</p>
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </>
  );
}
