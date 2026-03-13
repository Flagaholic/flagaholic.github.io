import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanrioholic | flagaholic CTF Team",
  description: "Sanrioholic (flagaholic) - A Hong Kong-based CTF Team conquering challenges worldwide. Ranked #126 globally, #2 in Hong Kong.",
  keywords: ["CTF", "Capture The Flag", "Hong Kong", "Cybersecurity", "flagaholic", "Sanrioholic"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
