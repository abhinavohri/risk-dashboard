"use client";

import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const ASSET_COLORS: Record<string, string> = {
  ETH: "#627EEA",
  WBTC: "#F7931A",
  USDC: "#2775CA",
  DAI: "#F5AC37",
  USDT: "#26A17B",
  LINK: "#2A5ADA",
};

interface ReserveData {
  asset: string;
  supplied: number;
  borrowed: number;
}

interface ReserveCompositionChartProps {
  data: ReserveData[];
}

function ReserveCompositionChartComponent({ data }: ReserveCompositionChartProps) {
  const chartData = data.map((item) => ({
    name: item.asset,
    Supplied: item.supplied / 1000000, // Convert to millions
    Borrowed: item.borrowed / 1000000,
  }));

  return (
    <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
        Reserve Composition (Millions USD)
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" />
            <XAxis
              dataKey="name"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Asset', position: 'insideBottom', offset: -5, style: { fill: '#71717a', fontSize: 12 } }}
            />
            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value.toFixed(0)}M`}
              label={{ value: 'Value (Millions USD)', angle: -90, position: 'insideLeft', style: { fill: '#71717a', fontSize: 12 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                borderRadius: "8px",
                color: "var(--tooltip-text)",
              }}
              labelStyle={{ color: "var(--tooltip-label)" }}
              formatter={(value: number, name: string) => [`$${Number(value).toFixed(2)}M`, name]}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="Supplied" fill="#10b981" radius={[4, 4, 0, 0]} name="Supplied" />
            <Bar dataKey="Borrowed" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Borrowed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export const ReserveCompositionChart = memo(ReserveCompositionChartComponent);
ReserveCompositionChart.displayName = "ReserveCompositionChart";
