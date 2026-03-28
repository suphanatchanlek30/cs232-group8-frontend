"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { shouldShowDashboardChrome } from "@/lib/constants/navigation";
import { DashboardTopbar } from "./dashboard-topbar";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showDashboardChrome = shouldShowDashboardChrome(pathname);

  if (!showDashboardChrome) {
    return (
      <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
        <main className="min-h-screen bg-(--color-bg)">{children}</main>
      </div>
    );
  }

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
