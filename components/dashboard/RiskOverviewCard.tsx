import React from "react";
import { ArrowUpRight, ArrowDownRight, HelpCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskOverviewCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  description?: string;
  tooltip?: string;
  icon?: LucideIcon;
  status?: "healthy" | "warning" | "critical";
}

export function RiskOverviewCard({
  title,
  value,
  change,
  trend,
  description,
  tooltip,
  icon: Icon,
  status,
}: RiskOverviewCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 dark:border-black/30 dark:bg-[#232e31] dark:shadow-black/50" style={{ borderColor: 'var(--card-border)' }}>
      <div className="relative">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-[#fdf8d8]">
            {title}
          </h3>
          {tooltip && (
            <div className="group/tooltip relative">
              <HelpCircle className="h-3.5 w-3.5 text-zinc-400 cursor-help" />
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-48 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white p-2 text-xs text-zinc-600 opacity-0 shadow-lg transition-opacity group-hover/tooltip:opacity-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</span>
          {change !== undefined && (
            <span
              className={cn(
                "flex items-center text-sm font-semibold",
                trend === "up" ? "text-emerald-600 dark:text-emerald-400" : trend === "down" ? "text-rose-600 dark:text-rose-400" : "text-zinc-500"
              )}
            >
              {trend === "up" ? <ArrowUpRight className="mr-0.5 h-4 w-4" /> : trend === "down" ? <ArrowDownRight className="mr-0.5 h-4 w-4" /> : null}
              {Math.abs(change)}%
            </span>
          )}
          {status && (
            <span className={cn(
              "ml-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
              status === "healthy"
                ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                : status === "warning"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                status === "healthy" ? "bg-cyan-500" : status === "warning" ? "bg-yellow-500" : "bg-red-500"
              )} />
              {status.toUpperCase()}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
        )}
      </div>
    </div>
  );
}
