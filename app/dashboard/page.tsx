import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { PageTransition } from "@/components/PageTransition";
import { fetchProtocolData } from "@/lib/api";

export const revalidate = 60;

export default async function DashboardPage() {
  const initialData = await fetchProtocolData("aave-v3");

  return (
    <DashboardLayout>
      <PageTransition>
        <DashboardContainer initialData={initialData} />
      </PageTransition>
    </DashboardLayout>
  );
}
