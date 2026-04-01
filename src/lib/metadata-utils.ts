import type { Metadata } from "next";

interface PageMetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogType?: "website" | "article" | "profile";
}

export function generateMetadata(config: PageMetadataConfig): Metadata {
  const baseUrl = "https://www.flagaholic.xyz";
  const cleanTitle = `${config.title} | Sanrioholic`;

  return {
    title: cleanTitle,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: cleanTitle,
      description: config.description,
      url: baseUrl,
      siteName: "Sanrioholic",
      type: config.ogType || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: config.description,
    },
  };
}

export const DEFAULT_METADATA: Metadata = {
  title: "Sanrioholic | flagaholic CTF Team",
  description:
    "Sanrioholic (flagaholic) - A Hong Kong-based CTF Team conquering challenges worldwide. Ranked #126 globally, #2 in Hong Kong.",
  keywords: [
    "CTF",
    "Capture The Flag",
    "Hong Kong",
    "Cybersecurity",
    "flagaholic",
    "Sanrioholic",
  ],
  authors: [{ name: "Sanrioholic CTF Team" }],
  openGraph: {
    title: "Sanrioholic | flagaholic CTF Team",
    description: "A Hong Kong-based CTF Team conquering challenges worldwide.",
    url: "https://www.flagaholic.xyz",
    siteName: "Sanrioholic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanrioholic | flagaholic CTF Team",
    description: "A Hong Kong-based CTF Team conquering challenges worldwide.",
  },
};
