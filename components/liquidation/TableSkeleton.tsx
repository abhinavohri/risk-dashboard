interface Column {
  key: string;
  label: string;
  align: "left" | "right" | "center";
  skeletonWidth: string;
  skeletonType?: "icon" | "badge" | "text";
}

interface TableSkeletonProps {
  columns: Column[];
  rows?: number;
}

export function TableSkeleton({ columns, rows = 8 }: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200/50 dark:border-zinc-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 ${
                    col.align === "left"
                      ? "text-left"
                      : col.align === "right"
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-700">
            {[...Array(rows)].map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    <SkeletonCell column={col} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkeletonCell({ column }: { column: Column }) {
  const alignClass =
    column.align === "left"
      ? ""
      : column.align === "right"
      ? "ml-auto"
      : "mx-auto";

  if (column.skeletonType === "icon") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className={`h-4 ${column.skeletonWidth} animate-pulse rounded bg-zinc-200 dark:bg-zinc-700`} />
      </div>
    );
  }

  if (column.skeletonType === "badge") {
    return (
      <div
        className={`h-6 ${column.skeletonWidth} animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700 ${alignClass}`}
      />
    );
  }

  return (
    <div
      className={`h-4 ${column.skeletonWidth} animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${alignClass}`}
    />
  );
}
