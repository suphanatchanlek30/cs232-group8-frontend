// app/page.tsx

import { ActionButtons, Category, Hero, HowItWorks } from "@/components/home";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-3xl">
        <Hero />
        <ActionButtons />
        <Category />
        <HowItWorks />
      </div>
    </div>
  );
}