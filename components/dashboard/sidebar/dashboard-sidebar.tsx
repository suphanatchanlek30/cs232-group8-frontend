// components/dashboard/sidebar/dashboard-sidebar.tsx

import { DASHBOARD_NAV_ITEMS } from "./dashboard-config";
import { DashboardSidebarItem } from "./dashboard-sidebar-item";

export function DashboardSidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-72px)] w-[260px] shrink-0 border-r border-slate-300 bg-(--color-primary) lg:block">
      <div className="border-t-4 border-(--color-primary) bg-white">
        {DASHBOARD_NAV_ITEMS.map((item) => (
          <DashboardSidebarItem key={item.href} item={item} />
        ))}
      </div>
    </aside>
  );
}