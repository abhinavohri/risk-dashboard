"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { ChartContainer } from "./ChartContainer";

interface OracleDataPoint {
  timestamp: number;
  chainlink: number;
  uniswap: number;
  band: number;
}

interface OracleDeviationChartProps {
  data: OracleDataPoint[];
}

export function OracleDeviationChart({ data }: OracleDeviationChartProps) {
  const allPrices = data.flatMap(d => [d.chainlink, d.uniswap, d.band]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const padding = (maxPrice - minPrice) * 0.1;
  const yDomain = [minPrice - padding, maxPrice + padding];

  return (
    <ChartContainer title="Oracle Price Deviation">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(new Date(timestamp), "HH:mm")}
            stroke="currentColor"
            className="text-zinc-400 dark:text-zinc-500"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Time', position: 'insideBottom', offset: -5, style: { fill: '#71717a', fontSize: 12 } }}
          />
          <YAxis
            domain={yDomain}
            stroke="currentColor"
            className="text-zinc-400 dark:text-zinc-500"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft', style: { fill: '#71717a', fontSize: 12 } }}
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
            labelFormatter={(timestamp) => format(new Date(timestamp), "MMM d, HH:mm")}
            formatter={(value: number, name: string) => [`$${Number(value).toFixed(2)}`, name]}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="chainlink" stroke="#3b82f6" strokeWidth={2} dot={false} name="Chainlink" />
          <Line type="monotone" dataKey="uniswap" stroke="#ef4444" strokeWidth={2} dot={false} name="Uniswap" />
          <Line type="monotone" dataKey="band" stroke="#14b8a6" strokeWidth={2} dot={false} name="Band Protocol" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
