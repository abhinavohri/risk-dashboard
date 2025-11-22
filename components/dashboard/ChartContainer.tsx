"use client";

import { ReactNode } from "react";
import { ChartWatermark } from "./ChartWatermark";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
  subHeader?: ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  children,
  headerRight,
  subHeader,
  className = "",
}: ChartContainerProps) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50 ${className}`}
    >
      <ChartWatermark />
      <div className="mb-4 relative" style={{ zIndex: 10 }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
          {headerRight}
        </div>
        {subHeader}
      </div>
      <div className="h-[300px] w-full relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
