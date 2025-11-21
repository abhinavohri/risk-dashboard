"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorDisplay } from "@/components/layout/ErrorDisplay";

export default function LiquidationError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <DashboardLayout>
      <ErrorDisplay
        title="Something went wrong"
        message="Failed to load liquidation parameters. Please try again."
        reset={reset}
      />
    </DashboardLayout>
  );
}
