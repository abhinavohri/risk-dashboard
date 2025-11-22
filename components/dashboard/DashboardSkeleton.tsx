export function DashboardSkeleton() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Key Metrics Section */}
      <div className="mb-8">
        <div className="mb-4 h-7 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
            />
          ))}
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="mb-8">
        <div className="mb-4 h-7 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-[400px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900" />
      </div>

      {/* Risk Metrics Section */}
      <div className="mb-8">
        <div className="mb-4 h-7 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
            />
          ))}
        </div>
      </div>

      {/* Supply & Borrow Section */}
      <div className="mb-8">
        <div className="mb-4 h-7 w-36 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
            />
          ))}
        </div>
      </div>

      {/* Position Analysis Section */}
      <div className="mb-8">
        <div className="mb-4 h-7 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
