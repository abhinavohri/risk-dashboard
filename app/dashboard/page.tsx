import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { fetchProtocolData } from "@/lib/api";

export const revalidate = 60;

export default async function DashboardPage() {
  const initialData = await fetchProtocolData("aave-v3");
  return <DashboardContainer initialData={initialData} />;
}
