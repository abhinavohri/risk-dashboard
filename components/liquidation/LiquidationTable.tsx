"use client";

import { AssetLiquidationConfig } from "@/types";
import numbro from "numbro";
import { CheckCircle2, XCircle } from "lucide-react";
import { TokenIcon } from "@/components/ui/TokenIcon";

interface LiquidationTableProps {
  data: AssetLiquidationConfig[];
  isLoading?: boolean;
}

export function LiquidationTable({ data, isLoading }: LiquidationTableProps) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200/50 dark:border-zinc-800/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Asset
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                LTV
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Liq. Bonus
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Supplied
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Borrowed
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Utilization
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Collateral
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
            {data.map((asset) => (
              <tr
                key={asset.asset}
                className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <TokenIcon symbol={asset.asset} />
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {asset.asset}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {asset.ltv > 0 ? `${(asset.ltv * 100).toFixed(2)}%` : "—"}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {asset.liquidationBonus > 0
                    ? `${(asset.liquidationBonus * 100).toFixed(2)}%`
                    : "—"}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {numbro(asset.supplied)
                    .formatCurrency({ average: true, mantissa: 2 })
                    .toUpperCase()}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {numbro(asset.borrowed)
                    .formatCurrency({ average: true, mantissa: 2 })
                    .toUpperCase()}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      asset.utilization > 0.8
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : asset.utilization > 0.6
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    }`}
                  >
                    {(asset.utilization * 100).toFixed(1)}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {asset.canBeCollateral ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200/50 dark:border-zinc-800/50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Asset
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                LTV
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Liq. Bonus
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Supplied
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Borrowed
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Utilization
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Collateral
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="ml-auto h-4 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </td>
                <td className="px-6 py-4">
                  <div className="ml-auto h-4 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </td>
                <td className="px-6 py-4">
                  <div className="ml-auto h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </td>
                <td className="px-6 py-4">
                  <div className="ml-auto h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                </td>
                <td className="px-6 py-4">
                  <div className="ml-auto h-6 w-14 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                </td>
                <td className="px-6 py-4">
                  <div className="mx-auto h-5 w-5 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
