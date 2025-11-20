import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";

export default function LiquidationLoading() {
  return (
    <DashboardLayout>
      <PageTransition>
        <div className="animate-in fade-in duration-300">
          {/* Header Skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-9 w-64 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-2 h-4 w-96 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <div className="h-10 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* KPI Section Skeleton */}
          <div className="mb-8">
            <div className="mb-4 h-7 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900"
                />
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900"
                />
              ))}
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="mb-8">
            <div className="mb-4 h-7 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-[600px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900" />
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}
