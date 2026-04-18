// components/dashboard/sidebar/dashboard-config.ts

import type { DashboardNavItem } from "./types";

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    label: "Incident Dashboard",
    href: "/dashboard",
    icon: "clipboard",
  },
  {
    label: "Incident Detail",
    href: "/incident-detail",
    icon: "siren",
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: "chart",
  },
  {
    label: "Admin Center",
    href: "/admin",
    icon: "settings",
  },
];