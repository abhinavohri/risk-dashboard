"use client";

import { AssetLiquidationConfig } from "@/types";
import { LiquidationTable } from "./LiquidationTable";
import { LiquidationKPIs } from "./LiquidationKPIs";

interface LiquidationParamsContainerProps {
  data: AssetLiquidationConfig[];
  protocol: string;
}

export function LiquidationParamsContainer({ data, protocol }: LiquidationParamsContainerProps) {

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
        <LiquidationKPIs data={data} />
      </div>

      {/* Table Section */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Asset-Level Configuration
        </h2>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          Detailed liquidation parameters and collateral settings for each supported asset
        </p>
        <LiquidationTable data={data} />
      </div>
    </>
  );
}
