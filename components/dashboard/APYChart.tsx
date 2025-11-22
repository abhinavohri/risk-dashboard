"use client";

import { memo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartWatermark } from "./ChartWatermark";

interface APYChartProps {
  data: Array<{
    timestamp: number;
    supplyAPY: number;
    borrowAPY: number;
  }>;
}

export function APYChart({ data }: APYChartProps) {
  const chartData = data.map((point) => ({
    date: new Date(point.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    "Supply APY": point.supplyAPY,
    "Borrow APY": point.borrowAPY,
  }));

  return (
    <div className="relative rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50">
      <ChartWatermark />
      <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white relative" style={{ zIndex: 10 }}>
        Supply vs Borrow APY
      </h3>
      <div className="h-[300px] w-full relative" style={{ zIndex: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" />
            <XAxis
              dataKey="date"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { fill: '#71717a', fontSize: 12 } }}
            />
            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              label={{ value: 'APY (%)', angle: -90, position: 'insideLeft', style: { fill: '#71717a', fontSize: 12 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: "8px",
                color: "var(--tooltip-text)",
              }}
              labelStyle={{ color: "var(--tooltip-label)" }}
              formatter={(value: number, name: string) => [`${Number(value).toFixed(2)}%`, name]}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="Supply APY"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Supply APY"
            />
            <Line
              type="monotone"
              dataKey="Borrow APY"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="Borrow APY"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
