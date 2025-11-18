"use client";

import React from "react";
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
import { TimeSeriesPoint } from "@/types";

interface ConfidenceChartProps {
  data: TimeSeriesPoint[];
  title: string;
}

export function ConfidenceChart({ data, title }: ConfidenceChartProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
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
            />
            
            {/* Confidence Interval Shaded Area */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="#6366f1"
              fillOpacity={0.15}
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="transparent"
            />
            
            <Line
              type="monotone"
              dataKey="upperBound"
              stroke="#a5b4fc"
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={2}
              name="Upper 95% CI"
            />
            <Line
              type="monotone"
              dataKey="lowerBound"
              stroke="#a5b4fc"
              strokeDasharray="5 5"
              dot={false}
              strokeWidth={2}
              name="Lower 95% CI"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={false}
              name="Value"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
