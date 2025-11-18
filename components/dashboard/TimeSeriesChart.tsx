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
  color = "#3b82f6",
  type = "line",
}: TimeSeriesChartProps) {
  const ChartComponent = type === "line" ? LineChart : AreaChart;
  const DataComponent = type === "line" ? Line : Area;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(new Date(timestamp), "MMM d")}
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              labelFormatter={(timestamp) => format(new Date(timestamp), "MMM d, yyyy")}
              formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Value"]}
            />
            <DataComponent
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={type === "area" ? `${color}20` : undefined}
              strokeWidth={2}
              dot={false}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
