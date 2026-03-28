import type { ReactNode } from "react";
import { DashboardLayoutShell } from "@/components/dashboard/sidebar/dashboard-layout-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutShell>{children}</DashboardLayoutShell>;
}