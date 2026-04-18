// components/dashboard/sidebar/types.ts

export type DashboardNavIcon = "clipboard" | "siren" | "chart" | "settings";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: DashboardNavIcon;
};
