// components/dashboard/sidebar/dashboard-sidebar-item.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_ICON_MAP } from "./dashboard-icons";
import type { DashboardNavItem } from "./types";

export function DashboardSidebarItem({ item }: { item: DashboardNavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const iconKey = item.icon;

  return (
    <Link
      href={item.href}
      className={`group relative flex items-center gap-3 px-5 py-4 text-sm font-medium transition ${
        isActive
          ? "bg-white text-(--color-primary)"
          : "bg-(--color-primary) text-white hover:brightness-95"
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-(--color-primary)" />
      )}

      {(() => {
        const Icon = DASHBOARD_ICON_MAP[iconKey];
        return <Icon className="h-4 w-4" strokeWidth={2} />;
      })()}
      <span>{item.label}</span>
    </Link>
  );
}