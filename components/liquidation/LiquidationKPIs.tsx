"use client";

import { AssetLiquidationConfig } from "@/types";
import { RiskOverviewCard } from "@/components/dashboard/RiskOverviewCard";
import { Shield, Target, TrendingDown, Percent } from "lucide-react";
import numbro from "numbro";

interface LiquidationKPIsProps {
  data: AssetLiquidationConfig[];
  isLoading: boolean;
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
        <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Total Assets
          </p>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {data.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            {collateralAssets.length} can be used as collateral
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Total Supplied
          </p>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {numbro(totalSupplied)
              .formatCurrency({ average: true, mantissa: 2 })
              .toUpperCase()}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            {numbro(totalBorrowed)
              .formatCurrency({ average: true, mantissa: 2 })
              .toUpperCase()}{" "}
            borrowed
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            High Risk Assets
          </p>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {highRiskAssets}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            Max utilization: {(maxUtilization * 100).toFixed(1)}%
          </p>
        </div>
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
