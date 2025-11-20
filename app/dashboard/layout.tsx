import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition } from "@/components/PageTransition";

export default function DashboardSegmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <PageTransition>{children}</PageTransition>
    </DashboardLayout>
  );
}
