"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { AssetDistribution } from "@/lib/additionalMockData";

interface AssetDistributionChartProps {
  data: AssetDistribution[];
}

export function AssetDistributionChart({ data }: AssetDistributionChartProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">Asset Distribution</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(value: number) => `${value}%`}
            />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {value} ({entry.payload.value}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
