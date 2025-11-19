"use client";

import React from "react";
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
import { TimeSeriesPoint } from "@/types";

interface TimeSeriesChartProps {
  data: TimeSeriesPoint[];
  title: string;
  color?: string;
  type?: "line" | "area";
}

export function TimeSeriesChart({
  data,
  title,
  color = "#6366f1",
  type = "line",
}: TimeSeriesChartProps) {
  const ChartComponent = type === "line" ? LineChart : AreaChart;
  const DataComponent = type === "line" ? Line : Area;

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
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
            />
            <YAxis
              stroke="currentColor"
              className="text-zinc-400 dark:text-zinc-500"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 16, 20, 0.95)",
                border: "1px solid rgba(129, 140, 248, 0.2)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                color: "#fff",
              }}
              labelStyle={{ color: "#a1a1aa" }}
              labelFormatter={(timestamp) => format(new Date(timestamp), "MMM d, yyyy")}
              formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Value"]}
            />
            <DataComponent
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={type === "area" ? "url(#colorGradient)" : undefined}
              strokeWidth={3}
              dot={false}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
