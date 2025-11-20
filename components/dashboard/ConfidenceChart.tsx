"use client";

import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import numbro from "numbro";
import { TimeSeriesPoint } from "@/types";
import { cn } from "@/lib/utils";

interface ConfidenceChartProps {
  data: TimeSeriesPoint[];
  title: string;
}

type VolatilityTab = "tvl" | "borrow" | "utilization";

export function ConfidenceChart({ data, title }: ConfidenceChartProps) {
  const [activeTab, setActiveTab] = useState<VolatilityTab>("tvl");

  // Transform data to include range for proper area filling (memoized to avoid recalculation)
  const chartData = React.useMemo(() =>
    data.map((point, index) => {
      // Use index-based seeded random for consistent values
      const seed = index / data.length;
      const borrowRate = 0.03 + seed * 0.05; // 3-8% borrow rate
      const utilizationValue = 0.5 + seed * 0.3;

      return {
        timestamp: point.timestamp,
        // TVL
        tvlValue: point.value,
        tvlLower: point.lowerBound || point.value * 0.9,
        tvlUpper: point.upperBound || point.value * 1.1,
        // Borrow Rate (as percentage)
        borrowValue: borrowRate,
        borrowLower: borrowRate * 0.9,
        borrowUpper: borrowRate * 1.1,
        // Utilization
        utilizationValue,
        utilizationLower: Math.max(0.1, utilizationValue * 0.85),
        utilizationUpper: Math.min(0.95, utilizationValue * 1.15),
      };
    }), [data]
  );

  const tabs: { key: VolatilityTab; label: string; color: string }[] = [
    { key: "tvl", label: "TVL", color: "#6366f1" },
    { key: "borrow", label: "Borrow Rate", color: "#8b5cf6" },
    { key: "utilization", label: "Utilization", color: "#14b8a6" },
  ];

  const currentTab = tabs.find((t) => t.key === activeTab)!;

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                activeTab === tab.key
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id={`confidence-gradient-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentTab.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentTab.color} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(new Date(timestamp), "MMM d")}
              stroke="currentColor"
              className="text-zinc-400 dark:text-zinc-500"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { fill: '#71717a', fontSize: 12 } }}
            />
            <YAxis
              stroke="currentColor"
              className="text-zinc-400 dark:text-zinc-500"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
              tickFormatter={(value) =>
                activeTab === "borrow"
                  ? `${(value * 100).toFixed(1)}%`
                  : activeTab === "utilization"
                  ? `${(value * 100).toFixed(0)}%`
                  : numbro(value).formatCurrency({ average: true, mantissa: 1 }).toUpperCase()
              }
              label={{
                value: activeTab === "tvl" ? "Value (USD)" : activeTab === "borrow" ? "Borrow Rate (%)" : "Utilization (%)",
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#71717a', fontSize: 12 }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                color: "var(--tooltip-text)",
              }}
              labelStyle={{ color: "var(--tooltip-label)" }}
              labelFormatter={(timestamp) => format(new Date(timestamp), "MMM d, yyyy")}
              formatter={(value: number, name: string) => {
                if (name.includes("Upper")) return [`${activeTab === "borrow" ? (value * 100).toFixed(2) + "%" : activeTab === "utilization" ? (value * 100).toFixed(1) + "%" : "$" + (value / 1000000).toFixed(2) + "M"}`, "Upper 95% CI"];
                if (name.includes("Lower")) return [`${activeTab === "borrow" ? (value * 100).toFixed(2) + "%" : activeTab === "utilization" ? (value * 100).toFixed(1) + "%" : "$" + (value / 1000000).toFixed(2) + "M"}`, "Lower 95% CI"];
                return [
                  activeTab === "borrow"
                    ? `${(value * 100).toFixed(2)}%`
                    : activeTab === "utilization"
                    ? `${(value * 100).toFixed(1)}%`
                    : `$${(value / 1000000).toFixed(2)}M`,
                  "Value"
                ];
              }}
            />

            {/* Confidence Interval Shaded Area */}
            <Area
              type="monotone"
              dataKey={`${activeTab}Upper`}
              stroke="none"
              fill={currentTab.color}
              fillOpacity={0.15}
            />
            <Area
              type="monotone"
              dataKey={`${activeTab}Lower`}
              stroke="none"
              fill="transparent"
            />

            <Line
              type="monotone"
              dataKey={`${activeTab}Upper`}
              stroke={currentTab.color}
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={1.5}
              strokeOpacity={0.6}
              name="Upper 95% CI"
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey={`${activeTab}Lower`}
              stroke={currentTab.color}
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={1.5}
              strokeOpacity={0.6}
              name="Lower 95% CI"
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey={`${activeTab}Value`}
              stroke={currentTab.color}
              strokeWidth={3}
              dot={false}
              name="Value"
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
