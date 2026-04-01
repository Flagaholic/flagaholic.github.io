"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function MemberCardSkeleton() {
  return (
    <div className="h-full rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-md flex flex-col">
      <Skeleton className="mx-auto h-24 w-24 rounded-full" />
      <Skeleton className="mx-auto mt-4 h-6 w-32" />
      <Skeleton className="mx-auto mt-2 h-4 w-24" />
      
      <Skeleton className="mt-4 h-12 w-full rounded" /> {/* quote */}

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="mt-auto pt-6 flex justify-center gap-4">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
}

export function MembersGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <MemberCardSkeleton key={i} />
      ))}
    </div>
  );
}
