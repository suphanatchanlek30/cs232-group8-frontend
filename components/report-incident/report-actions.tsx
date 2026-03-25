// components/report-incident/report-actions.tsx

interface ReportActionsProps {
  canSubmit: boolean;
  onClear: () => void;
}

export default function ReportActions({
  canSubmit,
  onClear,
}: ReportActionsProps) {
  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={!canSubmit}
        className={`h-12 w-full rounded-xl text-base font-medium text-white transition ${
          canSubmit
            ? "bg-(--color-primary) hover:bg-(--color-primary-hover)"
            : "cursor-not-allowed bg-neutral-300"
        }`}
      >
        Submit Report
      </button>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onClear}
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