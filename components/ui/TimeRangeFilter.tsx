"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type TimeRange = "1W" | "1M" | "3M" | "1Y" | "ALL";

interface TimeRangeFilterProps {
  selected: TimeRange;
  onSelect: (range: TimeRange) => void;
}

const TIME_RANGES: TimeRange[] = ["1W", "1M", "3M", "1Y", "ALL"];

export function TimeRangeFilter({ selected, onSelect }: TimeRangeFilterProps) {
  return (
    <div className="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-700 dark:bg-zinc-900">
      {TIME_RANGES.map((range) => (
        <button
          key={range}
          onClick={() => onSelect(range)}
          className={cn(
            "rounded-md px-3 py-1 text-sm font-medium transition-colors",
            selected === range
              ? "bg-white text-indigo-700 shadow-sm dark:bg-zinc-800 dark:text-indigo-400"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
