"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertCircle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <DashboardLayout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Failed to load dashboard data. Please try again.
          </p>
          <button
            onClick={reset}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            Try again
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
