"use client";

import React, { useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import numbro from "numbro";
import { TimeSeriesPoint } from "@/types";
import { TimeRangeFilter, TimeRange, TIME_RANGE_MS, MetricTabs, MetricTab, METRIC_TABS } from "./ChartFilters";
import { ChartContainer } from "./ChartContainer";

interface ConfidenceChartProps {
  data: TimeSeriesPoint[];
  title: string;
}

export function ConfidenceChart({ data, title }: ConfidenceChartProps) {
  const [activeTab, setActiveTab] = useState<MetricTab>("tvl");
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  const chartData = React.useMemo(() => {
    const now = Date.now();
    const cutoffTime = now - TIME_RANGE_MS[timeRange];
    return data.filter(point => point.timestamp >= cutoffTime).map((point) => {
      const borrowValue = point.borrow ?? 0.05;
      const utilizationValue = point.utilization ?? 0.65;

      return {
        timestamp: point.timestamp,
        tvlValue: point.value,
        tvlLower: point.lowerBound || point.value * 0.9,
        tvlUpper: point.upperBound || point.value * 1.1,
        borrowValue,
        borrowLower: borrowValue * 0.9,
        borrowUpper: borrowValue * 1.1,
        utilizationValue,
        utilizationLower: Math.max(0.1, utilizationValue * 0.85),
        utilizationUpper: Math.min(0.95, utilizationValue * 1.15),
      };
    });
  }, [data, timeRange]);

  const currentTab = METRIC_TABS.find((t) => t.key === activeTab)!;

  return (
    <ChartContainer
      title={title}
      headerRight={<MetricTabs value={activeTab} onChange={setActiveTab} />}
      subHeader={<TimeRangeFilter value={timeRange} onChange={setTimeRange} />}
      className="transition-all duration-300 hover:shadow-xl"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-zinc-200 dark:text-zinc-800" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(new Date(timestamp), "MMM d")}
            stroke="currentColor"
            className="text-zinc-400 dark:text-zinc-500"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={50}
            label={{ value: 'Date', position: 'insideBottom', offset: -5, style: { fill: '#71717a', fontSize: 12 } }}
          />
          <YAxis
            stroke="currentColor"
            className="text-zinc-400 dark:text-zinc-500"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={80}
            tickFormatter={(value) =>
              activeTab === "borrow"
                ? `${(value * 100).toFixed(1)}%`
                : activeTab === "utilization"
                ? `${(value * 100).toFixed(0)}%`
                : numbro(value).formatCurrency({ average: true, mantissa: 1 }).toUpperCase()
            }
            label={{
              value: activeTab === "tvl" ? "Value (USD)" : activeTab === "borrow" ? "Borrow Rate (%)" : "Utilization (%)",
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#71717a', fontSize: 12 }
            }}
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
            labelFormatter={(timestamp) => format(new Date(timestamp), "MMM d, yyyy")}
            formatter={(value: number, name: string) => {
              const formatValue = (v: number) =>
                activeTab === "borrow"
                  ? `${(v * 100).toFixed(2)}%`
                  : activeTab === "utilization"
                  ? `${(v * 100).toFixed(1)}%`
                  : numbro(v).formatCurrency({ average: true, mantissa: 2 }).toUpperCase();
              if (name.includes("Upper")) return [formatValue(value), "Upper 95% CI"];
              if (name.includes("Lower")) return [formatValue(value), "Lower 95% CI"];
              return [formatValue(value), "Value"];
            }}
          />

          {/* Confidence Interval Shaded Area */}
          <Area
            type="monotone"
            dataKey={`${activeTab}Upper`}
            stroke="none"
            fill={currentTab.color}
            fillOpacity={0.15}
            legendType="none"
            tooltipType="none"
          />
          <Area
            type="monotone"
            dataKey={`${activeTab}Lower`}
            stroke="none"
            fill="transparent"
            legendType="none"
            tooltipType="none"
          />

          <Line
            type="monotone"
            dataKey={`${activeTab}Upper`}
            stroke={currentTab.color}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
            strokeOpacity={0.6}
            name="Upper 95% CI"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <Line
            type="monotone"
            dataKey={`${activeTab}Lower`}
            stroke={currentTab.color}
            strokeDasharray="5 5"
            dot={false}
            strokeWidth={1.5}
            strokeOpacity={0.6}
            name="Lower 95% CI"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
          <Line
            type="monotone"
            dataKey={`${activeTab}Value`}
            stroke={currentTab.color}
            strokeWidth={3}
            dot={false}
            name="Value"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
