"use client";

import { cn } from "@/lib/utils";

export type TimeRange = "7d" | "30d" | "90d" | "1y" | "all";
export type MetricTab = "tvl" | "borrow" | "utilization";

interface TimeRangeFilterProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

interface MetricTabsProps {
  value: MetricTab;
  onChange: (tab: MetricTab) => void;
}

export const METRIC_TABS: { key: MetricTab; label: string; color: string }[] = [
  { key: "tvl", label: "TVL", color: "#6366f1" },
  { key: "borrow", label: "Borrow Rate", color: "#8b5cf6" },
  { key: "utilization", label: "Utilization", color: "#14b8a6" },
];

export function MetricTabs({ value, onChange }: MetricTabsProps) {
  return (
    <div className="flex gap-2">
      {METRIC_TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
            value === tab.key
              ? "bg-[#fdf8d8] text-black shadow-md dark:bg-[#fdf8d8] dark:text-black"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const timeRanges: { key: TimeRange; label: string }[] = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
  { key: "1y", label: "1Y" },
  { key: "all", label: "ALL" },
];

export function TimeRangeFilter({ value, onChange }: TimeRangeFilterProps) {
  return (
    <div className="flex gap-1">
      {timeRanges.map((range) => (
        <button
          key={range.key}
          onClick={() => onChange(range.key)}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-all",
            value === range.key
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-white"
              : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:bg-zinc-800"
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

export const TIME_RANGE_MS: Record<TimeRange, number> = {
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
  "1y": 365 * 24 * 60 * 60 * 1000,
  "all": Infinity,
};
