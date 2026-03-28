// components/dashboard/sidebar/dashboard-topbar.tsx

import { ChevronDown, CircleUserRound } from "lucide-react";
import { DashboardLogo } from "./dashboard-logo";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-slate-300 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-6 lg:px-8">
        <DashboardLogo />

        <button className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-slate-50">
          <CircleUserRound className="h-8 w-8 text-slate-500" strokeWidth={1.75} />
          <span className="text-sm font-medium text-slate-700">Mike Banana</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </header>
  );
}