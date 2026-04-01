import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTF Achievements | Sanrioholic",
  description: "View Sanrioholic's CTF competition achievements and rankings. Track our progress in cybersecurity competitions worldwide.",
  keywords: ["CTF achievements", "competitions", "rankings", "cybersecurity", "flagaholic"],
  openGraph: {
    title: "CTF Achievements | Sanrioholic",
    description: "Our CTF competition achievements and history.",
    type: "website",
  },
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
