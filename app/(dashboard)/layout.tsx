import type { ReactNode } from "react";
import { DashboardTopbar } from "@/components/dashboard/sidebar/dashboard-topbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <DashboardTopbar />

      <div className="flex">
        <DashboardSidebar />

        <main className="min-h-[calc(100vh-72px)] flex-1 bg-(--color-bg)">{children}</main>
      </div>
    </div>
  );
}