"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RiskOverviewCard } from "@/components/dashboard/RiskOverviewCard";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { ConfidenceChart } from "@/components/dashboard/ConfidenceChart";
import { LiquidationHeatmap } from "@/components/dashboard/LiquidationHeatmap";
import { OracleStatus } from "@/components/dashboard/OracleStatus";
import { fetchProtocolMetrics } from "@/lib/api";
import {
  generateTimeSeriesData,
  generateRiskPositions,
  generateOracleEvents,
} from "@/lib/mockData";
import {
  ProtocolMetrics,
  TimeSeriesPoint,
  RiskPosition,
  OracleEvent,
} from "@/types";
import { Activity, DollarSign, Percent, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<ProtocolMetrics | null>(null);
  const [tvlData, setTvlData] = useState<TimeSeriesPoint[]>([]);
  const [riskPositions, setRiskPositions] = useState<RiskPosition[]>([]);
  const [oracleEvents, setOracleEvents] = useState<OracleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = async () => {
    setLoading(true);
    try {
      const metricsData = await fetchProtocolMetrics("aave-v3");
      const tvlSeries = generateTimeSeriesData(30);
      const positions = generateRiskPositions(50);
      const events = generateOracleEvents(10);

      setMetrics(metricsData);
      setTvlData(tvlSeries);
      setRiskPositions(positions);
      setOracleEvents(events);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !metrics) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {metrics?.protocol} <span className="gradient-text">Risk Overview</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RiskOverviewCard
          title="Total Value Locked"
          value={`$${(metrics?.tvl || 0).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`}
          change={2.5}
          trend="up"
          icon={DollarSign}
        />
        <RiskOverviewCard
          title="Health Factor"
          value={(metrics?.averageHealthFactor || 0).toFixed(2)}
          change={0.1}
          trend="up"
          status={
            (metrics?.averageHealthFactor || 0) > 1.5
              ? "healthy"
              : (metrics?.averageHealthFactor || 0) > 1.1
              ? "warning"
              : "critical"
          }
          icon={Activity}
        />
        <RiskOverviewCard
          title="Utilization Rate"
          value={`${((metrics?.utilizationRate || 0) * 100).toFixed(1)}%`}
          change={1.2}
          trend="down"
          status="healthy"
          icon={Percent}
        />
        <RiskOverviewCard
          title="24h Liquidations"
          value={(metrics?.liquidationsLast24h || 0).toString()}
          trend="neutral"
          status="healthy"
          icon={ShieldAlert}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TimeSeriesChart data={tvlData} title="TVL History (30 Days)" type="area" />
        <ConfidenceChart data={tvlData} title="Projected Volatility (95% CI)" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiquidationHeatmap data={riskPositions} />
        </div>
        <div>
          <OracleStatus events={oracleEvents} />
        </div>
      </div>
    </DashboardLayout>
  );
}
