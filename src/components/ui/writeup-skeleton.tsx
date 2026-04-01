"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function WriteupSectionSkeleton() {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md">
      {/* Year header skeleton */}
      <Skeleton className="h-6 w-32" />

      {/* CTF cards skeletons */}
      <div className="space-y-2 pl-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-48" />
      </div>
    </div>
  );
}

export function WriteupPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <WriteupSectionSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
