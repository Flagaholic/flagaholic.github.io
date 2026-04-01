import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sanrioholic CTF",
  description: "Get in touch with Sanrioholic. Join our CTF team or connect with us through email, Discord, GitHub, and social media.",
  keywords: ["contact", "CTF recruitment", "Discord", "flagaholic", "team"],
  openGraph: {
    title: "Contact Us | Sanrioholic CTF",
    description: "Contact information and recruitment for Sanrioholic CTF team.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
