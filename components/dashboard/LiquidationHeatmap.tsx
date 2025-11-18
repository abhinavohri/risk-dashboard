"use client";

import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { RiskPosition } from "@/types";

interface LiquidationHeatmapProps {
  data: RiskPosition[];
}

export function LiquidationHeatmap({ data }: LiquidationHeatmapProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">Liquidation Risk Map</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis 
              type="number" 
              dataKey="collateralUSD" 
              name="Collateral" 
              unit="$" 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis 
              type="number" 
              dataKey="borrowedUSD" 
              name="Borrowed" 
              unit="$" 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-white p-2 shadow-md dark:bg-slate-900 dark:border-slate-700">
                      <p className="font-medium text-slate-900 dark:text-white">User: {data.userAddress}</p>
                      <p className="text-sm text-slate-500">Health Factor: {data.healthFactor.toFixed(2)}</p>
                      <p className="text-sm text-slate-500">Collateral: ${data.collateralUSD.toFixed(0)}</p>
                      <p className="text-sm text-slate-500">Borrowed: ${data.borrowedUSD.toFixed(0)}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Positions" data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    entry.riskLevel === 'critical' ? '#ef4444' : 
                    entry.riskLevel === 'high' ? '#f97316' : 
                    entry.riskLevel === 'medium' ? '#eab308' : '#22c55e'
                  } 
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
