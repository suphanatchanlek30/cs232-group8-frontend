// components/report-incident/location-section.tsx

"use client";

import { MapPinned, Navigation } from "lucide-react";
import { BUILDING_OPTIONS } from "@/lib/constants/building-options";

interface LocationSectionProps {
  building: string;
  locationNote: string;
  latitude: string;
  longitude: string;
  onChangeBuilding: (value: string) => void;
  onChangeLocationNote: (value: string) => void;
  onChangeLatitude: (value: string) => void;
  onChangeLongitude: (value: string) => void;
}

export default function LocationSection({
  building,
  locationNote,
  latitude,
  longitude,
  onChangeBuilding,
  onChangeLocationNote,
  onChangeLatitude,
  onChangeLongitude,
}: LocationSectionProps) {
  const handleGetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("เบราว์เซอร์นี้ไม่รองรับการดึงตำแหน่ง");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(7);
        const lng = position.coords.longitude.toFixed(7);

        onChangeLatitude(lat);
        onChangeLongitude(lng);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("คุณปฏิเสธการเข้าถึงตำแหน่ง");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("ไม่สามารถระบุตำแหน่งปัจจุบันได้");
            break;
          case error.TIMEOUT:
            alert("ใช้เวลานานเกินไปในการดึงตำแหน่ง กรุณาลองใหม่");
            break;
          default:
            alert("เกิดข้อผิดพลาดในการดึงตำแหน่ง");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-(--color-text)">
          Location
        </h3>
        <p className="mt-1 text-sm text-(--color-subtext)">
          เลือกอาคารหรือระบุตำแหน่งเพิ่มเติม เพื่อให้เจ้าหน้าที่หาจุดเกิดเหตุได้ง่ายขึ้น
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_150px]">
        <div className="space-y-3">
          <select
            value={building}
            onChange={(e) => onChangeBuilding(e.target.value)}
            className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
          >
            {BUILDING_OPTIONS.map((option) => (
              <option key={option.value || "placeholder"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            value={locationNote}
            onChange={(e) => onChangeLocationNote(e.target.value)}
            placeholder="Location note เช่น ข้างตึก, หน้าอาคาร, ลานจอดรถ"
            className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={latitude}
              onChange={(e) => onChangeLatitude(e.target.value)}
              placeholder="Latitude"
              className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
            />

            <input
              value={longitude}
              onChange={(e) => onChangeLongitude(e.target.value)}
              placeholder="Longitude"
              className="h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleGetCurrentLocation}
          className="flex min-h-[100px] flex-col items-center justify-center rounded-xl border border-neutral-300 bg-(--color-muted) px-3 py-3 text-center text-(--color-subtext) transition hover:bg-neutral-200"
        >
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <Navigation size={24} className="text-(--color-subtext)" />
          </div>

          <span className="text-sm font-medium text-(--color-text)">
            Use current location
          </span>
          <span className="mt-1 text-xs text-(--color-subtext)">
            จะมีการขอสิทธิ์เข้าถึงตำแหน่ง
          </span>
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-(--color-subtext)">
        <MapPinned size={14} />
        <span>สามารถใช้ current location หรือกรอกพิกัดเองได้</span>
      </div>
    </section>
  );
}