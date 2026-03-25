// components/home/step-item.tsx

import type { HowItWorksStep } from "./types";

interface StepItemProps extends HowItWorksStep {
  step: number;
  isLast?: boolean;
}

export default function StepItem({
  step,
  title,
  description,
  icon: Icon,
  isLast,
}: StepItemProps) {
  return (
    <div className="relative flex gap-3 pb-5 sm:gap-4 sm:pb-6">
      {!isLast && (
        <div className="absolute top-11 bottom-0 left-5 w-0.5 -translate-x-1/2 bg-gray-200 sm:left-6 sm:top-12" />
      )}

      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--muted) sm:h-12 sm:w-12">
        <Icon size={18} className="text-(--primary) sm:size-5" />
      </div>

      <div className="flex-1 border-b border-gray-100 pb-4 sm:pb-5">
        <h4 className="text-[15px] font-semibold leading-tight text-(--text) sm:text-base">
          {step}. {title}
        </h4>

        <p className="mt-1.5 text-sm leading-relaxed text-(--subtext) sm:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}