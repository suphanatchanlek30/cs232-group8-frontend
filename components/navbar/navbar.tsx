// components/navbar/navbar.tsx

"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS, shouldShowNavbar } from "@/lib/constants/navigation";
import NavbarItem from "./navbar-item";

export default function Navbar() {
  const pathname = usePathname();

  if (!shouldShowNavbar(pathname)) {
    return null;
  }

  return (
    <>
      <div className="h-20" />
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white shadow-md">
        <ul className="grid grid-cols-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="flex justify-center">
              <NavbarItem item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}