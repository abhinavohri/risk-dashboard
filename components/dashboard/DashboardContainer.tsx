"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import numbro from "numbro";
import { fetchProtocolDataClient, ProtocolData } from "@/lib/api";
import { RiskOverviewCard } from "./RiskOverviewCard";
import { TimeSeriesChart } from "../charts/TimeSeriesChart";
import { ConfidenceChart } from "../charts/ConfidenceChart";
import { LiquidationHeatmap } from "../charts/LiquidationHeatmap";
import { OracleDeviationChart } from "../charts/OracleDeviationChart";
import { AssetDistributionChart } from "../charts/AssetDistributionChart";
import { APYChart } from "../charts/APYChart";
import { ReserveCompositionChart } from "../charts/ReserveCompositionChart";
import { Activity, DollarSign, Percent, ShieldAlert, TrendingUp } from "lucide-react";
import { useProtocol } from "@/components/providers/ProtocolProvider";
import { DashboardSkeleton } from "./DashboardSkeleton";

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
  const apyData = useMemo(() => data?.apyData || [], [data?.apyData]);
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

  const tvlValue = numbro(data.metrics.tvl || 0)
    .formatCurrency({ average: true, mantissa: 2, optionalMantissa: true })
    .toUpperCase();

  const healthStatus = data.metrics.averageHealthFactor > 1.5
    ? "healthy"
    : data.metrics.averageHealthFactor > 1.1
    ? "warning"
    : "critical";

  if (isLoadingNewProtocol) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-[#fdf8d8]">
          {data.metrics.protocol} <span className="text-zinc-600 dark:text-zinc-400">Risk Overview</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {lastUpdated && `Data last updated: ${lastUpdated}`}
        </p>
      </div>

      {/* Key Metrics Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-[#fdf8d8]">Key Metrics</h2>
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
            value={data.metrics.averageHealthFactor.toFixed(2)}
            tooltip="Ratio of collateral to debt. Values below 1.0 trigger liquidation"
            status={healthStatus}
            icon={Activity}
            change={mockMetricChanges.healthFactor.value}
            trend={mockMetricChanges.healthFactor.trend}
          />
          <RiskOverviewCard
            title="Utilization Rate"
            value={`${(data.metrics.utilizationRate * 100).toFixed(1)}%`}
            tooltip="Percentage of available assets currently being borrowed"
            icon={Percent}
            change={mockMetricChanges.utilizationRate.value}
            trend={mockMetricChanges.utilizationRate.trend}
          />
          <RiskOverviewCard
            title="Supply APY"
            value={`${(latestApy?.supplyAPY ?? 3.5).toFixed(2)}%`}
            tooltip="Annual percentage yield for supplying assets"
            icon={TrendingUp}
            change={apy24hChanges.supply.value}
            trend={apy24hChanges.supply.trend}
          />
          <RiskOverviewCard
            title="Borrow APY"
            value={`${(latestApy?.borrowAPY).toFixed(2)}%`}
            tooltip="Annual percentage yield for borrowing assets"
            icon={TrendingUp}
            change={apy24hChanges.borrow.value}
            trend={apy24hChanges.borrow.trend}
          />
          <RiskOverviewCard
            title="24h Liquidations"
            value={data.metrics.liquidationsLast24h.toString()}
            tooltip="Number of positions liquidated in the past 24 hours"
            icon={ShieldAlert}
            change={mockMetricChanges.liquidations.value}
            trend={mockMetricChanges.liquidations.trend}
          />
        </div>
      </div>

      {/* Market Overview Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-[#fdf8d8]">Market Overview</h2>
        <div className="mb-6">
          <TimeSeriesChart data={data.tvlHistory || []} title="TVL History" type="area" />
        </div>
      </div>

      {/* Risk Metrics Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-[#fdf8d8]">Risk Metrics</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <ConfidenceChart data={data.tvlHistory || []} title="Projected Volatility (95% CI)" />
          <OracleDeviationChart data={oracleData} />
        </div>
      </div>

      {/* Supply & Borrow Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-[#fdf8d8]">Supply & Borrow</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <APYChart data={apyData} />
          <ReserveCompositionChart data={reserveData} />
        </div>
      </div>

      {/* Risk Analysis Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-[#fdf8d8]">Position Analysis</h2>
        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          <LiquidationHeatmap data={riskPositions} />
          <AssetDistributionChart data={tokenDistribution} />
        </div>
      </div>
    </>
  );
}
