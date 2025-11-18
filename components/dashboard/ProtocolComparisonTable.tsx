"use client";

import React, { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtocolComparison } from "@/lib/additionalMockData";

interface ProtocolComparisonTableProps {
  data: ProtocolComparison[];
}

type SortKey = keyof ProtocolComparison;
type SortDirection = "asc" | "desc";

export function ProtocolComparisonTable({ data }: ProtocolComparisonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("tvl");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc" 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortDirection === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-4 w-4 text-zinc-400" />;
    return sortDirection === "asc" 
      ? <ArrowUp className="h-4 w-4 text-indigo-600" />
      : <ArrowDown className="h-4 w-4 text-indigo-600" />;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">Protocol Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th
                className="cursor-pointer px-4 py-3 text-left text-sm font-medium text-zinc-500 dark:text-zinc-400"
                onClick={() => handleSort("protocol")}
              >
                <div className="flex items-center gap-2">
                  Protocol
                  <SortIcon columnKey="protocol" />
                </div>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400"
                onClick={() => handleSort("tvl")}
              >
                <div className="flex items-center justify-end gap-2">
                  TVL
                  <SortIcon columnKey="tvl" />
                </div>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400"
                onClick={() => handleSort("healthFactor")}
              >
                <div className="flex items-center justify-end gap-2">
                  Health Factor
                  <SortIcon columnKey="healthFactor" />
                </div>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400"
                onClick={() => handleSort("utilizationRate")}
              >
                <div className="flex items-center justify-end gap-2">
                  Utilization
                  <SortIcon columnKey="utilizationRate" />
                </div>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-right text-sm font-medium text-zinc-500 dark:text-zinc-400"
                onClick={() => handleSort("apy")}
              >
                <div className="flex items-center justify-end gap-2">
                  APY
                  <SortIcon columnKey="apy" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((protocol) => (
              <tr
                key={protocol.protocol}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/50"
              >
                <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-white">
                  {protocol.protocol}
                </td>
                <td className="px-4 py-3 text-right text-sm text-zinc-600 dark:text-zinc-400">
                  ${(protocol.tvl / 1e9).toFixed(2)}B
                </td>
                <td className="px-4 py-3 text-right text-sm">
                  <span className={cn(
                    "font-medium",
                    protocol.healthFactor > 2 ? "text-emerald-600" :
                    protocol.healthFactor > 1.5 ? "text-amber-600" :
                    "text-rose-600"
                  )}>
                    {protocol.healthFactor.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm text-zinc-600 dark:text-zinc-400">
                  {(protocol.utilizationRate * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-emerald-600">
                  {protocol.apy.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
