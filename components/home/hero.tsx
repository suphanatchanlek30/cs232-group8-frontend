export default function Hero() {
  return (
    <section className="bg-(--muted) px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-9">
      <h1 className="text-3xl font-bold text-(--primary) sm:text-4xl md:text-[2.6rem] md:leading-tight">
        TU Pulse
      </h1>

      <h2 className="mt-3 text-2xl font-semibold leading-tight text-(--text) sm:mt-4 sm:text-3xl md:max-w-xl md:text-[2.1rem] md:leading-tight">
        Report campus incidents quickly and intelligently
      </h2>

      <p className="mt-3 text-sm font-medium tracking-[0.2px] leading-relaxed text-(--subtext) sm:text-base md:max-w-lg">
        แจ้งเหตุในมหาวิทยาลัยได้ง่าย
        <br />
        พร้อมระบบรวมเคสซ้ำและส่งต่ออัตโนมัติ
      </p>
    </section>
  );
}