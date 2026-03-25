import type { LucideIcon } from "lucide-react";

export interface CategoryItem {
  label: string;
  icon: LucideIcon;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: LucideIcon;
}