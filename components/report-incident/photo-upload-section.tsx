// components/report-incident/photo-upload-section.tsx

"use client";

import { ImagePlus, X } from "lucide-react";
import { useMemo } from "react";
import type { PhotoUploadSectionProps } from "./types";

export default function PhotoUploadSection({
  photos,
  onAddPhotos,
  onRemovePhoto,
}: PhotoUploadSectionProps) {
  const previews = useMemo(
    () => photos.map((file) => URL.createObjectURL(file)),
    [photos]
  );

  const slots = [0, 1, 2];

  return (
    <section>
      <div className="mb-2 flex items-end gap-2">
        <label className="text-base font-medium text-(--color-text)">
          Upload photo
        </label>
        <span className="text-xs text-[var(--color-subtext)">
          (JPG/PNG, Max: 3)
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {slots.map((slotIndex) => {
          const photo = photos[slotIndex];
          const imageUrl = previews[slotIndex];

          if (photo && imageUrl) {
            return (
              <div
                key={slotIndex}
                className="relative overflow-hidden rounded-2xl border border-neutral-300 bg-white"
              >
                <img
                  src={imageUrl}
                  alt={`Uploaded ${slotIndex + 1}`}
                  className="h-40 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => onRemovePhoto(slotIndex)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-(--color-text) shadow"
                >
                  <X size={18} />
                </button>
              </div>
            );
          }

          return (
            <label
              key={slotIndex}
              className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-400 bg-white px-4 text-center transition hover:border-(--color-primary) hover:bg-(--primary-soft)"
            >
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => onAddPhotos(e.target.files)}
                disabled={photos.length >= 3}
              />

              <ImagePlus size={28} className="mb-3 text-(--color-subtext)" />
              <span className="text-sm font-medium text-(--color-text)">
                Add photo {slotIndex + 1}
              </span>
            </label>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-(--color-subtext)">
        Upload a clear photo if available
      </p>
    </section>
  );
}