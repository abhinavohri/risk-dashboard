"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { format } from "date-fns";
import numbro from "numbro";
import { TimeSeriesPoint } from "@/types";
import { TimeRangeFilter, TimeRange, TIME_RANGE_MS, MetricTabs, MetricTab, METRIC_TABS } from "./TimeRangeFilter";
import { ChartContainer } from "./ChartContainer";

interface TimeSeriesChartProps {
  data: TimeSeriesPoint[];
  title: string;
  type?: "line" | "area";
}

export function TimeSeriesChart({
  data,
  title,
  type = "line",
}: TimeSeriesChartProps) {
  const [activeTab, setActiveTab] = useState<MetricTab>("tvl");
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const ChartComponent = type === "line" ? LineChart : AreaChart;
  const DataComponent = type === "line" ? Line : Area;

  const chartData = React.useMemo(() => {
    const now = Date.now();
    const cutoffTime = now - TIME_RANGE_MS[timeRange];
    return data.filter(point => point.timestamp >= cutoffTime);
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
        <ChartComponent data={chartData}>
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
            formatter={(value: number) =>
              activeTab === "borrow"
                ? [`${(value * 100).toFixed(2)}%`, "Borrow Rate"]
                : activeTab === "utilization"
                ? [`${(value * 100).toFixed(1)}%`, "Utilization"]
                : [numbro(value).formatCurrency({ average: true, mantissa: 2 }).toUpperCase(), "TVL"]
            }
          />
          <DataComponent
            type="monotone"
            dataKey={activeTab === "tvl" ? "value" : activeTab}
            stroke={currentTab.color}
            fill={type === "area" ? currentTab.color : "none"}
            fillOpacity={type === "area" ? 0.1 : 0}
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-in-out"
          />
        </ChartComponent>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
