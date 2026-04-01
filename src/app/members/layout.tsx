import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Members | Sanrioholic CTF",
  description: "Meet the talented members of Sanrioholic (flagaholic), a Hong Kong-based CTF team. Learn about their specialties and connect with them on social media.",
  keywords: ["CTF team members", "cybersecurity", "Hong Kong", "flagaholic", "Sanrioholic"],
  openGraph: {
    title: "Team Members | Sanrioholic CTF",
    description: "Meet the talented members of our CTF team.",
    type: "website",
  },
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
