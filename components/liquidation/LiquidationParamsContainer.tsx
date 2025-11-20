"use client";

import { useState, useEffect } from "react";
import { AssetLiquidationConfig } from "@/types";
import { generateAssetLiquidationData } from "@/lib/mockData";
import { LiquidationTable } from "./LiquidationTable";
import { LiquidationKPIs } from "./LiquidationKPIs";
import { useProtocol } from "@/components/providers/ProtocolProvider";

interface LiquidationParamsContainerProps {
  initialData: AssetLiquidationConfig[];
}

export function LiquidationParamsContainer({ initialData }: LiquidationParamsContainerProps) {
  const { protocol } = useProtocol();
  const [data, setData] = useState<AssetLiquidationConfig[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate async data fetching
    const timer = setTimeout(() => {
      setData(generateAssetLiquidationData(protocol));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [protocol]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Asset Risk <span className="gradient-text">Parameters</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Loan-to-Value ratios, liquidation penalties, and collateral configurations per asset
        </p>
      </div>

      {/* KPIs Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Protocol Risk Overview
        </h2>
        <LiquidationKPIs data={data} isLoading={isLoading} />
      </div>

      {/* Table Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Asset-Level Configuration
        </h2>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          Detailed liquidation parameters and collateral settings for each supported asset
        </p>
        <LiquidationTable data={data} isLoading={isLoading} />
      </div>
    </>
  );
}
