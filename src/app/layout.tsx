import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/navigation";
import { RootLayoutClient } from "@/components/layout/root-client";

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
  authors: [{ name: "Flagaholic" }],
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
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon.ico" }
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sanrioholic CTF Team",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/assets/favicon/site.webmanifest",
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
        <RootLayoutClient />
      </body>
    </html>
  );
}
