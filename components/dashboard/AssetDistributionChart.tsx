"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { TokenDistribution } from "@/types";
import numbro from "numbro";

interface AssetDistributionChartProps {
  data: TokenDistribution[];
}

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
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
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
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
    <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
        Collateral Composition
      </h3>
      {chartData.length > 0 ? (
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="40%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={true}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Legend content={renderLegend} verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center text-zinc-500">
          No token distribution data available
        </div>
      )}
    </div>
  );
}
