// components/home/action-buttons.tsx

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="space-y-3 bg-(--muted) px-5 pb-6 sm:px-6 sm:pb-7 md:px-8 md:pb-8">
      
      {/* Primary */}
      <Link
        href="/report-incident"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-(--primary) py-3 text-[15px] font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) sm:gap-2.5 sm:py-3.5 sm:text-base md:py-4"
      >
        Report Now
        <ArrowRight size={18} className="sm:size-5" />
      </Link>

      {/* Secondary */}
      <Link 
        href="/track-status" 
        className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[15px] font-medium text-(--text) shadow-sm sm:gap-2.5 sm:py-3.5 sm:text-base">
        Track Incident
        <Search size={18} className="sm:size-5" />
      </Link>

    </div>
  );
}