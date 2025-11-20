import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";
import { LiquidationParamsContainer } from "@/components/liquidation/LiquidationParamsContainer";
import { generateAssetLiquidationData } from "@/lib/mockData";

export const revalidate = 60;

export default async function LiquidationPage() {
  // Initial server-side data fetch
  const initialData = generateAssetLiquidationData("aave-v3");

  return (
    <DashboardLayout>
      <PageTransition>
        <LiquidationParamsContainer initialData={initialData} />
      </PageTransition>
    </DashboardLayout>
  );
}
