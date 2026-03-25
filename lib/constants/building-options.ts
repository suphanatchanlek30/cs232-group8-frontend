// lib/constants/building-options.ts

export interface BuildingOption {
  value: string;
  label: string;
}

export const BUILDING_OPTIONS: BuildingOption[] = [
  { value: "", label: "เลือกพื้นที่" },
  { value: "LC5", label: "อาคาร บร.5 (LC5)" },
  { value: "LC2", label: "อาคาร บร.2 (LC2)" },
  { value: "LC3", label: "อาคาร บร.3 (LC3)" },
  { value: "SC3", label: "อาคารเรียนรวม สังคมศาสตร์ 3 (SC3)" },
  { value: "SC1", label: "อาคารเรียนรวมกลุ่มสังคมศาสตร์ 1 (SC1)" },
  { value: "OTHER", label: "Other / อื่นๆ" },
];