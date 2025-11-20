"use client";

import { useState, useEffect } from "react";
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

interface DashboardContainerProps {
  initialData: ProtocolData;
}

export function DashboardContainer({ initialData }: DashboardContainerProps) {
  const { protocol } = useProtocol();
  const [isChangingProtocol, setIsChangingProtocol] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["protocolData", protocol],
    queryFn: () => fetchProtocolDataClient(protocol),
    initialData,
    refetchInterval: 60 * 1000,
    staleTime: 60 * 1000,
  });

  // Track protocol changes for loading state
  useEffect(() => {
    setIsChangingProtocol(true);
    const timer = setTimeout(() => setIsChangingProtocol(false), 500);
    return () => clearTimeout(timer);
  }, [protocol]);

  const [liveMetrics, setLiveMetrics] = useState(() => ({
    healthFactor: initialData.metrics.averageHealthFactor,
    utilizationRate: initialData.metrics.utilizationRate,
    liquidations: initialData.metrics.liquidationsLast24h,
    supplyAPY: 3.2,
    borrowAPY: 6.5,
  }));

  const [prevMetrics, setPrevMetrics] = useState(liveMetrics);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Protocol-specific data (regenerated when protocol changes)
  const [riskPositions, setRiskPositions] = useState(() => generateRiskPositions(50));
  const [oracleData, setOracleData] = useState(() => generateOracleDeviationData(24, protocol));
  const [apyData, setApyData] = useState(() => generateAPYData(30, protocol));
  const [reserveData, setReserveData] = useState(() => generateReserveData(protocol));

  // Regenerate data when protocol changes
  useEffect(() => {
    setOracleData(generateOracleDeviationData(24, protocol));
    setApyData(generateAPYData(30, protocol));
    setReserveData(generateReserveData(protocol));
  }, [protocol]);

  useEffect(() => {
    if (data?.metrics.timestamp) {
      setLastUpdated(new Date(data.metrics.timestamp).toLocaleTimeString());
    }
  }, [data?.metrics.timestamp]);

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

  const healthStatus = liveMetrics.healthFactor > 1.5 ? "healthy" : liveMetrics.healthFactor > 1.1 ? "warning" : "critical";

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: parseFloat(Math.abs(change).toFixed(2)),
      trend: (change > 0.01 ? "up" : change < -0.01 ? "down" : "neutral") as "up" | "down" | "neutral",
    };
  };

  const healthChange = calculateChange(liveMetrics.healthFactor, prevMetrics.healthFactor);
  const utilizationChange = calculateChange(liveMetrics.utilizationRate, prevMetrics.utilizationRate);
  const supplyAPYChange = calculateChange(liveMetrics.supplyAPY, prevMetrics.supplyAPY);
  const borrowAPYChange = calculateChange(liveMetrics.borrowAPY, prevMetrics.borrowAPY);
  const liquidationChange = {
    value: Math.abs(liveMetrics.liquidations - prevMetrics.liquidations),
    trend: (liveMetrics.liquidations > prevMetrics.liquidations ? "up" : liveMetrics.liquidations < prevMetrics.liquidations ? "down" : "neutral") as "up" | "down" | "neutral",
  };

  if (isChangingProtocol || isLoading) {
    return (
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading {protocol === "aave-v3" ? "Aave V3" : "Compound"} data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          {data?.metrics.protocol} <span className="gradient-text">Risk Overview</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {lastUpdated && `TVL data refreshed: ${lastUpdated} • `}
          Live metrics update every 5s
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
