// components/home/how-it-works.tsx

import { HOW_IT_WORKS_STEPS } from "./constants";
import StepItem from "./step-item";

export default function HowItWorks() {
  return (
    <section className="bg-white px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8">
      <h3 className="text-lg font-semibold text-(--text) sm:text-xl">
        How it works
      </h3>

      <div className="mt-4 sm:mt-5">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <StepItem
            key={index}
            step={index + 1}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isLast={index === HOW_IT_WORKS_STEPS.length - 1}
          />
        ))}
      </div>
    </section>
  );
}