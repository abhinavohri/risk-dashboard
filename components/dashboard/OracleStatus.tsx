import React from "react";
import { OracleEvent } from "@/types";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface OracleStatusProps {
  events: OracleEvent[];
}

export function OracleStatus({ events }: OracleStatusProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">Oracle Health</h3>
      <div className="space-y-4">
        {events.slice(0, 5).map((event) => (
          <div key={event.id} className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="mt-0.5">
              {event.severity === "critical" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : event.severity === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-900 dark:text-white">
                  {event.asset} / USD
                </p>
                <span className="text-xs text-slate-500">
                  {format(new Date(event.timestamp), "HH:mm:ss")}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Source: {event.priceSource}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs">
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  ${event.price.toFixed(2)}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-medium",
                    event.deviation > 1
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  )}
                >
                  {event.deviation.toFixed(2)}% dev
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
