"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { format } from "date-fns";
import numbro from "numbro";
import { TimeSeriesPoint } from "@/types";
import { cn } from "@/lib/utils";

interface TimeSeriesChartProps {
  data: TimeSeriesPoint[];
  title: string;
  color?: string;
  type?: "line" | "area";
}

type MetricTab = "tvl" | "borrow" | "utilization";

export function TimeSeriesChart({
  data,
  title,
  color = "#6366f1",
  type = "line",
}: TimeSeriesChartProps) {
  const [activeTab, setActiveTab] = useState<MetricTab>("tvl");
  const ChartComponent = type === "line" ? LineChart : AreaChart;
  const DataComponent = type === "line" ? Line : Area;

  // Generate mock data for borrow rate and utilization (memoized)
  const chartData = React.useMemo(() =>
    data.map((point, index) => {
      const seed = index / data.length;
      return {
        ...point,
        borrow: 0.03 + seed * 0.05, // 3-8% borrow rate
        utilization: 0.5 + seed * 0.3, // 50-80% utilization
      };
    }), [data]
  );

  const tabs: { key: MetricTab; label: string; color: string }[] = [
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
          <ChartComponent data={chartData}>
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
              formatter={(value: number) =>
                activeTab === "borrow"
                  ? [`${(value * 100).toFixed(2)}%`, "Borrow Rate"]
                  : activeTab === "utilization"
                  ? [`${(value * 100).toFixed(1)}%`, "Utilization"]
                  : [`$${(value / 1000000).toFixed(2)}M`, "TVL"]
              }
            />
            <DataComponent
              type="monotone"
              dataKey={activeTab === "tvl" ? "value" : activeTab}
              stroke={currentTab.color}
              fill={type === "area" ? currentTab.color : "none"}
              fillOpacity={type === "area" ? 0.1 : 0}
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
