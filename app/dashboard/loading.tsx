export default function DashboardLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-9 w-64 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="mt-2 h-4 w-96 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900"
          />
        ))}
      </div>

      {/* Charts Grid Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="h-[400px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900"
          />
        ))}
      </div>

      {/* Bottom Section Skeleton */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="h-[500px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 lg:col-span-2 dark:border-zinc-800/50 dark:bg-zinc-900" />
        <div className="space-y-6">
          <div className="h-[400px] animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}
