// components/navbar/navbar-item.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./types";

interface NavbarItemProps {
  item: NavItem;
}

export default function NavbarItem({ item }: NavbarItemProps) {
  const pathname = usePathname();
  const Icon = item.icon;

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      className="flex min-w-0 flex-col items-center justify-center gap-1 px-3 py-2 transition-colors"
    >
      <Icon
        size={22}
        className={isActive ? "text-(--color-primary)" : "text-(--color-subtext)"}
      />

      <span
        className={`text-xs leading-none ${
          isActive ? "font-semibold text-(--color-primary)" : "text-(--color-subtext)"
        }`}
      >
        {item.label}
      </span>
    </Link>
  );
}