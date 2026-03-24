"use client";

import { NAV_ITEMS } from "@/lib/constants/navigation";
import NavbarItem from "./navbar-item";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white shadow-md">
      <ul className="grid grid-cols-4">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="flex justify-center">
            <NavbarItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}