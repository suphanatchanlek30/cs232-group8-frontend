// components/report-incident/submission-success.tsx

import Link from "next/link";

interface SubmissionSuccessProps {
  onReset: () => void;
  reportData: {
    reportId: string;
    incidentDate: string;
    incidentTime: string;
    location: string;
    summaryText: string;
    incidentType: string;
    severity: string;
    status: string;
    addedToExisting: string;
  };
}

export default function SubmissionSuccess({
  onReset,
  reportData,
}: SubmissionSuccessProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pt-4 sm:px-6">
      {/* Success Icon */}
      <div className="mb-6 flex justify-center">
        <svg
          width="110"
          height="110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l2.5 2.5 5.5-6.5" />
        </svg>
      </div>

      <h2 className="mb-8 px-2 text-center text-lg font-medium text-(--color-text) sm:px-4">
        Your report has been submitted successfully
      </h2>

      <div className="w-full space-y-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="space-y-3 text-sm text-(--color-text)">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Report ID :</span>
              <span>{reportData.reportId}</span>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Incident date :</span>
              <span>{reportData.incidentDate}</span>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Incident time :</span>
              <span>{reportData.incidentTime}</span>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Location :</span>
              <span>{reportData.location}</span>
            </div>
            <div className="grid flex-col sm:grid-cols-[140px_1fr] sm:flex-row gap-1 sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Summary text :</span>
              <span>{reportData.summaryText}</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="space-y-3 text-sm text-(--color-text)">
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[180px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Preliminary incident type :</span>
              <span className="wrap-break-word">{reportData.incidentType}</span>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[180px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Severity :</span>
              <span>{reportData.severity}</span>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[180px_1fr] sm:gap-0">
              <span className="font-medium text-(--color-subtext)">Status :</span>
              <span>{reportData.status}</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="space-y-1 text-sm text-(--color-text)">
            <div className="font-medium text-(--color-subtext)">Added to Existing Incident :</div>
            <div className="text-(--color-subtext)">ยังไม่ระบุ (อยู่ระหว่างพิจารณา)</div>
          </div>
        </div>
      </div>

      <p className="mt-6 px-2 text-center text-sm font-medium text-(--color-text)">
        The system is now routing this incident to the responsible unit
      </p>

      {/* Action Buttons */}
      <div className="mt-8 w-full space-y-3 pb-2">
        <Link
          href="/track-status"
          className="flex w-full items-center justify-center rounded-xl bg-(--color-primary) py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--color-primary-hover)"
        >
          Track Status
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="flex w-full items-center justify-center rounded-xl bg-neutral-200 py-3.5 text-sm font-medium text-(--color-text) transition-colors hover:bg-neutral-300"
        >
          Submit another report
        </button>
      </div>
    </div>
  );
}
