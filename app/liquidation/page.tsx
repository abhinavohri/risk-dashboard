import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";
import { LiquidationParamsContainer } from "@/components/liquidation/LiquidationParamsContainer";
import { generateAssetLiquidationData } from "@/lib/mockData";

export default async function LiquidationPage({ searchParams }: { searchParams: Promise<{ protocol?: string }> }) {
  const { protocol = "aave-v3" } = await searchParams;
  const initialData = generateAssetLiquidationData(protocol);

  return (
    <DashboardLayout>
      <PageTransition>
        <LiquidationParamsContainer data={initialData} protocol={protocol} />
      </PageTransition>
    </DashboardLayout>
  );
}
