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
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-indigo-300/50 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-indigo-700/50">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
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
          {Icon && (
            <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2">
              <Icon className="h-4 w-4 text-white" />
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
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : status === "warning"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
            )}>
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                status === "healthy" ? "bg-emerald-500" : status === "warning" ? "bg-amber-500" : "bg-rose-500"
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
