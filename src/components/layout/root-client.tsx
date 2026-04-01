"use client";

import React from "react";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Footer } from "@/components/layout/footer";
import { WebVitals } from "@/components/web-vitals";

export function RootLayoutClient() {
  return (
    <>
      <WebVitals />
      <ScrollToTop />
      <Footer />
    </>
  );
}
