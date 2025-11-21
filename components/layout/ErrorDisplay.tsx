"use client";

import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  title: string;
  message: string;
  reset: () => void;
}

export function ErrorDisplay({ title, message, reset }: ErrorDisplayProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-red-100 p-4 dark:bg-red-900/20">
          <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-800 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
