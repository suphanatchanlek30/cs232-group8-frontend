// components/dashboard/sidebar/dashboard-icons.ts

import { BarChart3, ClipboardList, Siren, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DashboardNavIcon } from "./types";

export const DASHBOARD_ICON_MAP: Record<DashboardNavIcon, LucideIcon> = {
  clipboard: ClipboardList,
  siren: Siren,
  chart: BarChart3,
  settings: Settings,
};
