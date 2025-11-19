import React from "react";
import { ArrowUpRight, ArrowDownRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskOverviewCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  description?: string;
  icon?: React.ElementType;
  status?: "healthy" | "warning" | "critical";
}

export function RiskOverviewCard({
  title,
  value,
  change,
  trend,
  description,
  icon: Icon,
  status,
}: RiskOverviewCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-indigo-300/50 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-indigo-700/50">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {title}
          </h3>
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
        </div>
        {status && (
          <div className="mt-4 flex items-center gap-2">
            <div className={cn("h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden")}>
              <div
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  status === "healthy" ? "bg-gradient-to-r from-emerald-500 to-teal-500" : status === "warning" ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-rose-500 to-red-600"
                )}
                style={{ width: "100%" }}
              />
            </div>
            <span className={cn(
                "text-xs font-bold",
                 status === "healthy" ? "text-emerald-600 dark:text-emerald-400" : status === "warning" ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
            )}>
                {status.toUpperCase()}
            </span>
          </div>
        )}
        {description && (
          <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
        )}
      </div>
    </div>
  );
}
