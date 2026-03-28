// lib/constants/navigation.ts

import {
  House,
  ClipboardList,
  ScanSearch,
  UserRound,
} from "lucide-react";

import type { NavItem } from "@/components/navbar/types";

// This file defines constants related to navigation, including the paths where the navbar should be visible and the items in the navbar.
export const NAVBAR_VISIBLE_PATHS = [
  "/",
  "/report-incident",
  "/track-status",
  // "/staff-portal-auth",
] as const;

export function shouldShowNavbar(pathname: string): boolean {
  return NAVBAR_VISIBLE_PATHS.some(
    (path) => pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
  );
}

export const DASHBOARD_CHROME_HIDDEN_PATHS = [
  "/staff-portal-auth",
] as const;

export function shouldShowDashboardChrome(pathname: string): boolean {
  return !DASHBOARD_CHROME_HIDDEN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Report",
    href: "/report-incident",
    icon: ClipboardList,
  },
  {
    label: "Track",
    href: "/track-status",
    icon: ScanSearch,
  },
  {
    label: "Staff",
    href: "/staff-portal-auth",
    icon: UserRound,
  },
] satisfies NavItem[];