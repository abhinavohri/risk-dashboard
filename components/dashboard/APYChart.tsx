"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer } from "./ChartContainer";

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
    <ChartContainer title="Supply vs Borrow APY">
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
    </ChartContainer>
  );
}
