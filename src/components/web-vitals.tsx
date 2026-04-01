'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

export function WebVitals() {
  useEffect(() => {
    // Track Cumulative Layout Shift (CLS)
    onCLS(console.log);
    
    // Track First Input Delay (FID)
    onFID(console.log);
    
    // Track First Contentful Paint (FCP)
    onFCP(console.log);
    
    // Track Largest Contentful Paint (LCP)
    onLCP(console.log);
    
    // Track Time To First Byte (TTFB)
    onTTFB(console.log);
  }, []);

  return null;
}
