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
import { ChartWatermark } from "./ChartWatermark";

interface LiquidationHeatmapProps {
  data: RiskPosition[];
}

export function LiquidationHeatmap({ data }: LiquidationHeatmapProps) {
  return (
    <div className="relative h-full rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-900/80 dark:shadow-zinc-900/50">
      <ChartWatermark />
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">Liquidation Risk Map</h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Healthy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            <span className="text-zinc-600 dark:text-zinc-400">High Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-zinc-600 dark:text-zinc-400">Critical</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="collateralUSD"
              name="Collateral"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="number"
              dataKey="borrowedUSD"
              name="Borrowed"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div
                      className="rounded-lg border p-3 shadow-md"
                      style={{
                        backgroundColor: "var(--tooltip-bg)",
                        borderColor: "var(--tooltip-border)",
                        color: "var(--tooltip-text)",
                      }}
                    >
                      <p className="font-medium mb-1" style={{ color: "var(--tooltip-text)" }}>
                        User: {data.userAddress.slice(0, 6)}...{data.userAddress.slice(-4)}
                      </p>
                      <p className="text-sm" style={{ color: "var(--tooltip-label)" }}>Health Factor: {data.healthFactor.toFixed(2)}</p>
                      <p className="text-sm" style={{ color: "var(--tooltip-label)" }}>Collateral: ${data.collateralUSD.toFixed(0)}</p>
                      <p className="text-sm" style={{ color: "var(--tooltip-label)" }}>Borrowed: ${data.borrowedUSD.toFixed(0)}</p>
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
