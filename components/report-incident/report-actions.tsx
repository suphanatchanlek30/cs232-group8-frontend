// components/report-incident/report-actions.tsx

import type { ReportActionsProps } from "./types";

export default function ReportActions({
  canSubmit,
  isSubmitting,
  onClear,
}: ReportActionsProps) {
  const disableSubmit = !canSubmit || isSubmitting;

  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={disableSubmit}
        className={`h-12 w-full rounded-xl text-base font-medium text-white transition ${
          !disableSubmit
            ? "bg-(--color-primary) hover:bg-(--color-primary-hover)"
            : "cursor-not-allowed bg-neutral-300"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </button>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onClear}
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-neutral-200 text-base font-medium text-(--color-text) transition hover:bg-neutral-300"
        >
          Clear Form
        </button>

        <button
          type="button"
          className="h-12 rounded-xl bg-neutral-200 text-base font-medium text-(--color-text) transition hover:bg-neutral-300"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}