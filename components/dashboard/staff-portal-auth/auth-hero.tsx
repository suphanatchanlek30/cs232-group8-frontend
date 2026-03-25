// components/dashboard/staff-portal-auth/auth-hero.tsx

export default function AuthHero() {
  return (
    <section className="flex h-full items-center bg-(--color-muted) px-8 py-12 md:px-12 lg:px-16">
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-(--color-primary) md:text-6xl">
          TU Pulse
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-(--color-text) md:text-4xl">
          สำหรับเจ้าหน้าที่
        </h2>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-(--color-subtext)">
          พื้นที่สำหรับเจ้าหน้าที่ใช้ติดตาม ตรวจสอบ
          และอัปเดตสถานะเหตุการณ์ภายในมหาวิทยาลัย
        </p>
      </div>
    </section>
  );
}