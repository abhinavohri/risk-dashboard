import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { fetchProtocolData } from "@/lib/api";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ protocol?: string }> }) {
  const { protocol = "aave" } = await searchParams;
  const initialData = await fetchProtocolData(protocol);

  return <DashboardContainer initialData={initialData} />;
}
