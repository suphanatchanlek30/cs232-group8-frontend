// components/dashboard/sidebar/dashboard-icons.ts

import { BarChart3, ClipboardList, Siren } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardNavIcon } from "./types";

const DASHBOARD_ICON_MAP: Record<DashboardNavIcon, LucideIcon> = {
  clipboard: ClipboardList,
  siren: Siren,
  chart: BarChart3,
};

export function getDashboardIcon(icon: DashboardNavIcon): LucideIcon {
  return DASHBOARD_ICON_MAP[icon];
}
