import { AlertTriangle } from "lucide-react";

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmSubmitModal({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmSubmitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[24px] bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-(--color-primary)" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-(--color-text)">
            Confirm Submission
          </h3>
          <p className="mb-8 text-sm text-(--color-subtext)">
            คุณแน่ใจหรือไม่ที่จะส่งรายงานนี้? โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน
          </p>
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full rounded-xl bg-neutral-100 py-3.5 text-sm font-medium text-(--color-text) transition-colors hover:bg-neutral-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-xl bg-(--color-primary) py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-(--color-primary-hover)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
