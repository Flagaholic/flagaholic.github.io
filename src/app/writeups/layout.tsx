import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CTF Writeups | Sanrioholic",
  description: "Explore our comprehensive CTF writeups and challenge solutions. Learn from our approaches to various cybersecurity challenges.",
  keywords: ["CTF writeups", "solutions", "challenges", "cybersecurity", "flagaholic"],
  openGraph: {
    title: "CTF Writeups | Sanrioholic",
    description: "Our CTF challenge writeups and solutions.",
    type: "website",
  },
};

export default function WriteupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
