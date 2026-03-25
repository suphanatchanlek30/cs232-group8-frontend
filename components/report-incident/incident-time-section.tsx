// components/report-incident/location-section.tsx

"use client";

type IncidentTimeMode = "now" | "earlier";

interface IncidentTimeSectionProps {
  incidentTimeMode: IncidentTimeMode;
  incidentAt: string;
  onChangeMode: (value: IncidentTimeMode) => void;
  onChangeIncidentAt: (value: string) => void;
}

export default function IncidentTimeSection({
  incidentTimeMode,
  incidentAt,
  onChangeMode,
  onChangeIncidentAt,
}: IncidentTimeSectionProps) {
  return (
    <section>
      <label className="mb-2 block text-base font-medium text-(--color-text)">
        Incident Time
      </label>

      <div className="rounded-2xl bg-neutral-200 p-1">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => onChangeMode("now")}
            className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
              incidentTimeMode === "now"
                ? "bg-white text-(--color-text) shadow-sm"
                : "text-(--color-subtext)"
            }`}
          >
            Just now
          </button>

          <button
            type="button"
            onClick={() => onChangeMode("earlier")}
            className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
              incidentTimeMode === "earlier"
                ? "bg-white text-(--color-text) shadow-sm"
                : "text-(--color-subtext)"
            }`}
          >
            Earlier
          </button>
        </div>
      </div>

      {incidentTimeMode === "earlier" && (
        <div className="mt-3">
          <input
            type="datetime-local"
            value={incidentAt}
            onChange={(e) => onChangeIncidentAt(e.target.value)}
            className="h-11 w-full rounded-xl border border-neutral-400 bg-white px-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
          />
          <p className="mt-2 text-xs text-(--color-subtext)">
            ใช้กรณีพบเหตุแล้วมาแจ้งภายหลัง เช่น เห็นขยะล้นก่อนหน้านี้
          </p>
        </div>
      )}
    </section>
  );
}