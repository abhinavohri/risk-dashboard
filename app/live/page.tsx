import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";
import { AaveEventsStream } from "@/components/live/AaveEventsStream";

export default function LivePage() {
  return (
    <DashboardLayout>
      <PageTransition>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-[#fdf8d8] mb-8">
          Aave v3 Live Events
        </h1>
        <AaveEventsStream />
      </PageTransition>
    </DashboardLayout>
  );
}
