// components/home/category.tsx

import { CATEGORY_ITEMS } from "./constants";

export default function Category() {
  return (
    <div className="bg-white px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:gap-4 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0">
        {CATEGORY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex h-23 w-23 snap-start shrink-0 flex-col items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm sm:h-24.5 sm:w-24.5 md:h-27.5 md:w-full"
            >
              <Icon size={22} className="text-(--primary) sm:size-6" />

              <p className="mt-1 text-center text-xs whitespace-pre-line text-(--text) sm:text-sm">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}