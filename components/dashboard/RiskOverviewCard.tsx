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
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-zinc-400" />}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-zinc-900 dark:text-white">{value}</span>
        {change !== undefined && (
          <span
            className={cn(
              "flex items-center text-sm font-medium",
              trend === "up" ? "text-emerald-600" : trend === "down" ? "text-rose-600" : "text-zinc-500"
            )}
          >
            {trend === "up" ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      {status && (
        <div className="mt-4 flex items-center gap-2">
          <div className={cn("h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800")}>
            <div
              className={cn(
                "h-2 rounded-full",
                status === "healthy" ? "bg-emerald-500" : status === "warning" ? "bg-amber-500" : "bg-rose-500"
              )}
              style={{ width: "100%" }}
            />
          </div>
          <span className={cn(
              "text-xs font-medium",
               status === "healthy" ? "text-emerald-600" : status === "warning" ? "text-amber-600" : "text-rose-600"
          )}>
              {status.toUpperCase()}
          </span>
        </div>
      )}
      {description && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      )}
    </div>
  );
}
