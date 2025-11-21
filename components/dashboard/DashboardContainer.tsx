"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import numbro from "numbro";
import { fetchProtocolDataClient, ProtocolData } from "@/lib/api";
import { RiskOverviewCard } from "./RiskOverviewCard";
import { TimeSeriesChart } from "./TimeSeriesChart";
import { ConfidenceChart } from "./ConfidenceChart";
import { LiquidationHeatmap } from "./LiquidationHeatmap";
import { OracleDeviationChart } from "./OracleDeviationChart";
import { AssetDistributionChart } from "./AssetDistributionChart";
import { APYChart } from "./APYChart";
import { ReserveCompositionChart } from "./ReserveCompositionChart";
import { generateRiskPositions, generateOracleDeviationData, generateAPYData, generateReserveData } from "@/lib/mockData";
import { Activity, DollarSign, Percent, ShieldAlert, TrendingUp } from "lucide-react";
import { useProtocol } from "@/components/providers/ProtocolProvider";
import DashboardLoading from "@/app/dashboard/loading";

interface DashboardContainerProps {
  initialData: ProtocolData;
}

export function DashboardContainer({ initialData }: DashboardContainerProps) {
  const { protocol } = useProtocol();

  const { data, isFetching } = useQuery({
    queryKey: ["protocolData", protocol],
    queryFn: () => fetchProtocolDataClient(protocol),
    initialData,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  const isLoadingNewProtocol = isFetching && data?.metrics.protocol !== protocol;

  const tokenDistribution = data?.tokenDistribution || [];
  const riskPositions = data?.riskPositions || [];
  const oracleData = data?.oracleData || [];
  const apyData = data?.apyData || [];
  const reserveData = data?.reserveData || [];

  const latestApy = apyData[apyData.length - 1];

  const calculate24hChange = (current: number, previous: number) => {
    if (!previous || previous === 0) return { value: 0, trend: "neutral" as const };
    const change = ((current - previous) / previous) * 100;
    return {
      value: parseFloat(Math.abs(change).toFixed(2)),
      trend: (change > 0.01 ? "up" : change < -0.01 ? "down" : "neutral") as "up" | "down" | "neutral",
    };
  };

  const tvl24hChange = useMemo(() => {
    if (!data?.tvlHistory || data.tvlHistory.length < 2) {
      return { value: 0, trend: "neutral" as const };
    }

    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);

    let closest24hPoint = data.tvlHistory[0];
    let minDiff = Math.abs(data.tvlHistory[0].timestamp - oneDayAgo);

    for (const point of data.tvlHistory) {
      const diff = Math.abs(point.timestamp - oneDayAgo);
      if (diff < minDiff) {
        minDiff = diff;
        closest24hPoint = point;
      }
    }

    const currentTvl = data.metrics.tvl;
    const previousTvl = closest24hPoint.value;

    return calculate24hChange(currentTvl, previousTvl);
  }, [data?.tvlHistory, data?.metrics.tvl]);

  const apy24hChanges = useMemo(() => {
    if (apyData.length < 2) {
      return { supply: { value: 0, trend: "neutral" as const }, borrow: { value: 0, trend: "neutral" as const } };
    }
    const current = apyData[apyData.length - 1];
    const previous = apyData[apyData.length - 2];

    return {
      supply: calculate24hChange(current.supplyAPY, previous.supplyAPY),
      borrow: calculate24hChange(current.borrowAPY, previous.borrowAPY),
    };
  }, [apyData]);

  const mockMetricChanges = useMemo(() => ({
    healthFactor: calculate24hChange(data.metrics.averageHealthFactor, data.metrics.averageHealthFactor * (1 + (Math.random() - 0.5) * 0.02)),
    utilizationRate: calculate24hChange(data.metrics.utilizationRate, data.metrics.utilizationRate * (1 + (Math.random() - 0.5) * 0.03)),
    liquidations: {
      value: Math.floor(Math.random() * 5),
      trend: (Math.random() > 0.5 ? "up" : "down") as "up" | "down",
    },
  }), [data.metrics.averageHealthFactor, data.metrics.utilizationRate]);

  const lastUpdated = data.metrics.timestamp
    ? new Date(data.metrics.timestamp).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    : "";

  useEffect(() => {
    if (data) {
      const newLatestApy = apyData[apyData.length - 1];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLiveMetrics({
        healthFactor: data.metrics.averageHealthFactor,
        utilizationRate: data.metrics.utilizationRate,
        liquidations: data.metrics.liquidationsLast24h,
        supplyAPY: newLatestApy.supplyAPY,
        borrowAPY: newLatestApy.borrowAPY,
      });
    }
  }, [protocol, data, apyData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => {
        setPrevMetrics(prev);

        return {
          healthFactor: Math.max(1.0, prev.healthFactor + (Math.random() - 0.5) * 0.05),
          utilizationRate: Math.max(0.1, Math.min(0.95, prev.utilizationRate + (Math.random() - 0.5) * 0.02)),
          liquidations: Math.max(0, Math.floor(prev.liquidations + (Math.random() - 0.7) * 2)),
          supplyAPY: Math.max(1, Math.min(6, prev.supplyAPY + (Math.random() - 0.5) * 0.1)),
          borrowAPY: Math.max(4, Math.min(10, prev.borrowAPY + (Math.random() - 0.5) * 0.15)),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tvlValue = numbro(data?.metrics.tvl || 0)
    .formatCurrency({ average: true, mantissa: 2, optionalMantissa: true })
    .toUpperCase();

  const healthStatus = data.metrics.averageHealthFactor > 1.5
    ? "healthy"
    : data.metrics.averageHealthFactor > 1.1
    ? "warning"
    : "critical";

  if (isLoadingNewProtocol) {
    return <DashboardLoading />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {data?.metrics.protocol} <span className="gradient-text">Risk Overview</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {lastUpdated && `Data last updated: ${lastUpdated}`}
        </p>
      </div>

      {/* Key Metrics Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Key Metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RiskOverviewCard
            title="Total Value Locked"
            value={tvlValue}
            tooltip="Total value of all assets deposited in the protocol"
            icon={DollarSign}
            change={tvl24hChange.value}
            trend={tvl24hChange.trend}
          />
          <RiskOverviewCard
            title="Health Factor"
            value={liveMetrics.healthFactor.toFixed(2)}
            tooltip="Ratio of collateral to debt. Values below 1.0 trigger liquidation"
            status={healthStatus}
            icon={Activity}
            change={healthChange.value}
            trend={healthChange.trend}
          />
          <RiskOverviewCard
            title="Utilization Rate"
            value={`${(liveMetrics.utilizationRate * 100).toFixed(1)}%`}
            tooltip="Percentage of available assets currently being borrowed"
            icon={Percent}
            change={utilizationChange.value}
            trend={utilizationChange.trend}
          />
          <RiskOverviewCard
            title="Supply APY"
            value={`${liveMetrics.supplyAPY.toFixed(2)}%`}
            tooltip="Annual percentage yield for supplying assets"
            icon={TrendingUp}
            change={supplyAPYChange.value}
            trend={supplyAPYChange.trend}
          />
          <RiskOverviewCard
            title="Borrow APY"
            value={`${liveMetrics.borrowAPY.toFixed(2)}%`}
            tooltip="Annual percentage yield for borrowing assets"
            icon={TrendingUp}
            change={borrowAPYChange.value}
            trend={borrowAPYChange.trend}
          />
          <RiskOverviewCard
            title="24h Liquidations"
            value={liveMetrics.liquidations.toString()}
            tooltip="Number of positions liquidated in the past 24 hours"
            icon={ShieldAlert}
            change={liquidationChange.value}
            trend={liquidationChange.trend}
          />
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Market Overview</h2>
        <div className="mb-6">
          <TimeSeriesChart data={data?.tvlHistory || []} title="TVL History (30 Days)" type="area" />
        </div>
      </div>

      {/* Risk Metrics Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Risk Metrics</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <ConfidenceChart data={data?.tvlHistory || []} title="Projected Volatility (95% CI)" />
          <OracleDeviationChart data={oracleData} />
        </div>
      </div>

      {/* Supply & Borrow Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Supply & Borrow</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <APYChart data={apyData} />
          <ReserveCompositionChart data={reserveData} />
        </div>
      </div>

      {/* Risk Analysis Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">Position Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LiquidationHeatmap data={riskPositions} />
          </div>
          <div>
            <AssetDistributionChart />
          </div>
        </div>
      </div>
    </>
  );
}
