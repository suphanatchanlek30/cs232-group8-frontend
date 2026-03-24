// components/home/constants.ts

import {
  Bell,
  ClipboardList,
  Droplets,
  Flame,
  GitMerge,
  Mail,
  Trash2,
  TriangleAlert,
} from "lucide-react";

import type { CategoryItem, HowItWorksStep } from "./types";

export const CATEGORY_ITEMS = [
  { label: "Flooding\nWater leak", icon: Droplets },
  { label: "Fire\nSmoke", icon: Flame },
  { label: "Garbage\nSanitation", icon: Trash2 },
  { label: "Safety\nIssues", icon: TriangleAlert },
] satisfies CategoryItem[];

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Submit Report",
    description:
      "ผู้ใช้สามารถแจ้งเหตุการณ์ที่พบในมหาวิทยาลัยได้อย่างง่ายดาย ผ่านการกรอกข้อมูลและแนบรูปภาพ",
    icon: Mail,
  },
  {
    title: "Merges duplicates",
    description:
      "ระบบจะทำการตรวจสอบและรวมเหตุการณ์ที่ซ้ำกันโดยอัตโนมัติ เพื่อลดความซ้ำซ้อนของข้อมูล",
    icon: GitMerge,
  },
  {
    title: "Staff gets notified",
    description:
      "เจ้าหน้าที่ที่เกี่ยวข้องจะได้รับการแจ้งเตือนทันที เพื่อให้สามารถดำเนินการแก้ไขได้อย่างรวดเร็ว",
    icon: Bell,
  },
  {
    title: "Tracked on dashboard",
    description:
      "สามารถติดตามสถานะของเหตุการณ์ได้ผ่าน dashboard แบบเรียลไทม์",
    icon: ClipboardList,
  },
] satisfies HowItWorksStep[];