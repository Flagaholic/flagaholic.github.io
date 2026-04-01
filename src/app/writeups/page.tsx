"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "@/components/ui/sparkles";
import { FluidBackground } from "@/components/ui/fluid-background";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedTitle } from "@/components/ui/gradient-text";
import { ChevronDown, ChevronRight, ExternalLink, FileText } from "lucide-react";

interface WriteupFile {
  name: string;
  path: string;
  type: "dir" | "file";
}

interface WriteupStructure {
  year: string;
  competitions: {
    name: string;
    files: WriteupFile[];
  }[];
}

async function fetchGitHubContents(path: string): Promise<WriteupFile[]> {
  const url = `https://api.github.com/repos/Flagaholic/flagaholic.github.io/contents/site/writeups/${path}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((item: any) => !item.name.startsWith("."))
      .map((item: any) => ({
        name: item.name,
        path: item.path,
        type: item.type,
      }));
  } catch (error) {
    return [];
  }
}

function YearSection({
  year,
  competitions,
}: {
  year: string;
  competitions: { name: string; files: WriteupFile[] }[];
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xl font-bold text-warm-gold hover:text-warm-gold/80 transition-colors mb-4"
      >
        {expanded ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
        {year}
      </button>
      {expanded && (
        <div className="ml-6 space-y-4">
          {competitions.map((comp) => (
            <CompetitionSection
              key={comp.name}
              name={comp.name}
              files={comp.files}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CompetitionSection({
  name,
  files,
}: {
  name: string;
  files: WriteupFile[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 font-semibold text-text-primary hover:text-warm-gold transition-colors"
      >
        {expanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        {name.replace(/[-_]/g, " ")}
      </button>
      {expanded && (
        <div className="ml-6 mt-2 space-y-2">
          {files
            .filter((f) => f.name !== "README.md")
            .map((file) => (
              <FileItem key={file.name} file={file} />
            ))}
        </div>
      )}
    </div>
  );
}

function FileItem({ file }: { file: WriteupFile }) {
  if (file.type === "dir") {
    return (
      <a
        href={`https://github.com/Flagaholic/flagaholic.github.io/tree/main/${file.path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-warm-gold transition-colors"
      >
        <FileText className="h-4 w-4" />
        {file.name.replace(/[-_]/g, " ")}
        <ExternalLink className="h-3 w-3 ml-auto" />
      </a>
    );
  }

  return (
    <a
      href={`https://github.com/Flagaholic/flagaholic.github.io/blob/main/${file.path}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-text-secondary hover:text-warm-gold transition-colors"
    >
      <FileText className="h-4 w-4" />
      {file.name}
      <ExternalLink className="h-3 w-3 ml-auto" />
    </a>
  );
}

export default function WriteupsPage() {
  const [writeups, setWriteups] = useState<WriteupStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWriteups = async () => {
      try {
        // First, get list of years
        const years = await fetchGitHubContents("");
        const yearDirs = years.filter((y) => y.type === "dir");

        const writeupData: WriteupStructure[] = [];

        for (const yearDir of yearDirs.sort((a, b) =>
          b.name.localeCompare(a.name)
        )) {
          // Get competitions for this year
          const competitions = await fetchGitHubContents(yearDir.name);
          const compDirs = competitions.filter((c) => c.type === "dir");

          const compsData = [];
          for (const comp of compDirs) {
            const files = await fetchGitHubContents(
              `${yearDir.name}/${comp.name}`
            );
            compsData.push({
              name: comp.name,
              files: files,
            });
          }

          writeupData.push({
            year: yearDir.name,
            competitions: compsData.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          });
        }

        setWriteups(writeupData);
      } catch (err) {
        setError("Failed to load writeups");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWriteups();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-bg-primary via-charcoal to-bg-primary">
      <FluidBackground />
      <Sparkles className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AnimatedTitle className="text-4xl md:text-6xl font-bold mb-6">
            Writeups
          </AnimatedTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto"
          >
            CTF challenge solutions and writeups organized by competition
          </motion.p>
        </motion.div>

        {/* Content */}
        <GlassCard className="max-w-2xl mx-auto p-8">
          {loading && (
            <div className="text-center text-text-secondary">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                <div className="h-8 w-8 border-2 border-warm-gold border-t-transparent rounded-full" />
              </motion.div>
              <p className="mt-4">Loading writeups...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && writeups.length === 0 && (
            <div className="text-center text-text-secondary">
              <p>No writeups found yet</p>
            </div>
          )}

          {!loading && !error && writeups.length > 0 && (
            <div className="space-y-8">
              {writeups.map((yearData) => (
                <YearSection
                  key={yearData.year}
                  year={yearData.year}
                  competitions={yearData.competitions}
                />
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </main>
  );
}
