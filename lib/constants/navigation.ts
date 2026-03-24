// lib/constants/navigation.ts

import {
  House,
  ClipboardList,
  ScanSearch,
  UserRound,
} from "lucide-react";

import type { NavItem } from "@/components/navbar/types";

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
    href: "/staff-portal",
    icon: UserRound,
  },
] satisfies NavItem[];