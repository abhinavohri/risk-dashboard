"use client";

import { AssetLiquidationConfig } from "@/types";
import { RiskOverviewCard } from "@/components/dashboard/RiskOverviewCard";
import { Target, TrendingDown, Percent, Layers, DollarSign, AlertTriangle } from "lucide-react";
import numbro from "numbro";

interface LiquidationKPIsProps {
  data: AssetLiquidationConfig[];
  isLoading?: boolean;
}

export function LiquidationKPIs({ data, isLoading }: LiquidationKPIsProps) {
  if (isLoading) {
    return <KPISkeleton />;
  }

  // Calculate aggregate metrics
  const collateralAssets = data.filter((a) => a.canBeCollateral);
  const avgLTV =
    collateralAssets.reduce((sum, a) => sum + a.ltv, 0) / collateralAssets.length;
  const avgLiqBonus =
    collateralAssets.reduce((sum, a) => sum + a.liquidationBonus, 0) /
    collateralAssets.length;

  const totalSupplied = data.reduce((sum, a) => sum + a.supplied, 0);
  const totalBorrowed = data.reduce((sum, a) => sum + a.borrowed, 0);
  const weightedAvgUtilization =
    data.reduce((sum, a) => sum + a.utilization * a.supplied, 0) / totalSupplied;

  // Calculate risk metrics
  const highRiskAssets = data.filter((a) => a.utilization > 0.8).length;
  const maxUtilization = Math.max(...data.map((a) => a.utilization));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RiskOverviewCard
          title="Avg. LTV Ratio"
          value={`${(avgLTV * 100).toFixed(2)}%`}
          tooltip="Max % of collateral value that can be borrowed"
          icon={Target}
        />
        <RiskOverviewCard
          title="Avg. Liq. Bonus"
          value={`${(avgLiqBonus * 100).toFixed(2)}%`}
          tooltip="Discount liquidators receive when buying collateral"
          icon={TrendingDown}
        />
        <RiskOverviewCard
          title="Weighted Utilization"
          value={`${(weightedAvgUtilization * 100).toFixed(1)}%`}
          tooltip="Supply-weighted average utilization across all assets"
          icon={Percent}
          status={
            weightedAvgUtilization > 0.8
              ? "critical"
              : weightedAvgUtilization > 0.6
              ? "warning"
              : "healthy"
          }
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <RiskOverviewCard
          title="Total Assets"
          value={data.length.toString()}
          description={`${collateralAssets.length} can be used as collateral`}
          tooltip="Number of supported assets in the protocol"
          icon={Layers}
        />
        <RiskOverviewCard
          title="Total Supplied"
          value={numbro(totalSupplied)
            .formatCurrency({ average: true, mantissa: 2, optionalMantissa: true })
            .toUpperCase()}
          description={`${numbro(totalBorrowed)
            .formatCurrency({ average: true, mantissa: 2, optionalMantissa: true })
            .toUpperCase()} borrowed`}
          tooltip="Total value supplied and borrowed across all assets"
          icon={DollarSign}
        />
        <RiskOverviewCard
          title="High Risk Assets"
          value={highRiskAssets.toString()}
          description={`Max utilization: ${(maxUtilization * 100).toFixed(1)}%`}
          tooltip="Assets with >80% utilization rate"
          icon={AlertTriangle}
          status={highRiskAssets > 3 ? "critical" : highRiskAssets > 0 ? "warning" : "healthy"}
        />
      </div>
    </>
  );
}

function KPISkeleton() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-800"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-zinc-200/50 bg-zinc-100 dark:border-zinc-800/50 dark:bg-zinc-800"
          />
        ))}
      </div>
    </>
  );
}
