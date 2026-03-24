import Hero from "@/components/home/hero";
import ActionButtons from "@/components/home/action-buttons";
import Category from "@/components/home/category";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto w-full max-w-3xl">
      <Hero />
      <ActionButtons />
      <Category />
      </div>
    </div>
  );
}