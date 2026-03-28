// components/dashboard/sidebar/types.ts

export type DashboardNavIcon = "clipboard" | "siren" | "chart";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: DashboardNavIcon;
};
