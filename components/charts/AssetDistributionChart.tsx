"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TokenDistribution } from "@/types";
import numbro from "numbro";
import { ChartWatermark } from "./ChartWatermark";

interface AssetDistributionChartProps {
  data: TokenDistribution[];
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-col gap-y-2">
      {payload.map((entry: any) => {
        const formattedValue = numbro(entry.payload.valueUsd).formatCurrency({
          average: true,
          mantissa: 1,
          optionalMantissa: true,
        });
        return (
          <div key={entry.value} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {entry.value}: {entry.payload.value.toFixed(1)}% ({formattedValue})
            </span>
          </div>
        );
      })}
    </div>
  );
};

export function AssetDistributionChart({ data }: AssetDistributionChartProps) {
  const chartData = data.map((token) => ({
    name: token.name,
    value: token.percentage,
    color: token.color,
    valueUsd: token.value,
  }));

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50">
      <ChartWatermark />
      <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white relative" style={{ zIndex: 10 }}>
        Collateral Composition
      </h3>
      {chartData.length > 0 ? (
        <div className="flex items-center">
          <div className="h-[300px] w-2/3 relative" style={{ zIndex: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive={true}
                  legendType="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/3">
            <CustomLegend payload={chartData.map(c => ({...c, value: c.name, payload: c}))} />
          </div>
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center text-zinc-500">
          No token distribution data available
        </div>
      )}
    </div>
  );
}
