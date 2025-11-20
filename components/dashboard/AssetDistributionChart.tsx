"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const ASSET_DATA = [
  { name: "ETH", value: 35.2, color: "#627EEA" },
  { name: "WBTC", value: 25.8, color: "#F7931A" },
  { name: "USDC", value: 20.1, color: "#2775CA" },
  { name: "DAI", value: 12.3, color: "#F5AC37" },
  { name: "USDT", value: 4.7, color: "#26A17B" },
  { name: "Other", value: 1.9, color: "#9CA3AF" },
];

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      {/* Background stroke for better visibility */}
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold pointer-events-none stroke-white dark:stroke-zinc-900"
        strokeWidth="3"
        fill="none"
      >
        {`${name} ${(percent * 100).toFixed(1)}%`}
      </text>
      {/* Main text */}
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold pointer-events-none fill-zinc-900 dark:fill-white"
      >
        {`${name} ${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export function AssetDistributionChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
        Collateral Composition
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ASSET_DATA}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={renderLabel}
              labelLine={false}
              isAnimationActive={false}
              activeShape={undefined}
            >
              {ASSET_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {ASSET_DATA.map((asset) => (
          <div key={asset.name} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: asset.color }}
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {asset.name}: {asset.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
