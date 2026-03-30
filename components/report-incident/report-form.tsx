// components/report-incident/report-form.tsx

"use client";

import { useMemo, useState } from "react";
import DescriptionField from "./description-field";
import PhotoUploadSection from "./photo-upload-section";
import LocationSection from "./location-section";
import IncidentTimeSection from "./incident-time-section";
import ReportActions from "./report-actions";
import SubmissionSuccess from "./submission-success";
import ConfirmSubmitModal from "./confirm-submit-modal";
import { submitIncidentReport } from "@/services/report-incident.service";
import type { IncidentTimeMode } from "./types";

const INCIDENT_LABEL_OPTIONS = [
  { value: "trash", label: "Trash / Waste" },
  { value: "safety", label: "Safety Hazard" },
  { value: "infrastructure", label: "Infrastructure Damage" },
  { value: "other", label: "Other" },
];

function getCurrentDatetimeLocal() {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - tzOffset);
  return local.toISOString().slice(0, 16);
}

export default function ReportForm() {
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [building, setBuilding] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [incidentLabel, setIncidentLabel] = useState("trash");
  const [incidentTimeMode, setIncidentTimeMode] =
    useState<IncidentTimeMode>("now");
  const [incidentAt, setIncidentAt] = useState(getCurrentDatetimeLocal());
  const [acknowledgeTruth, setAcknowledgeTruth] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleAddPhotos = (files: FileList | null) => {
    if (!files) return;
    const nextFiles = Array.from(files).slice(0, 3 - photos.length);
    setPhotos((prev) => [...prev, ...nextFiles].slice(0, 3));
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeTimeMode = (value: IncidentTimeMode) => {
    setIncidentTimeMode(value);

    if (value === "now") {
      setIncidentAt(getCurrentDatetimeLocal());
    }
  };

  const handleClear = () => {
    setDescription("");
    setPhotos([]);
    setBuilding("");
    setLocationNote("");
    setLatitude("");
    setLongitude("");
    setIncidentLabel("trash");
    setIncidentTimeMode("now");
    setIncidentAt(getCurrentDatetimeLocal());
    setAcknowledgeTruth(false);
    setSubmitError("");
  };

  const canSubmit = useMemo(() => {
    const hasDescription = description.trim().length > 0;
    const hasBuilding = building.trim().length > 0;
    const hasCoordinates =
      latitude.trim().length > 0 && longitude.trim().length > 0;
    const hasPhoto = photos.length > 0;
    const hasIncidentTime =
      incidentTimeMode === "now" || incidentAt.trim().length > 0;

    return (
      hasDescription &&
      hasPhoto &&
      hasBuilding &&
      hasCoordinates &&
      hasIncidentTime &&
      acknowledgeTruth
    );
  }, [
    acknowledgeTruth,
    building,
    description,
    incidentAt,
    incidentTimeMode,
    latitude,
    photos,
    locationNote,
    longitude,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    setSubmitError("");
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirm(false);

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const incidentDatetime =
        incidentTimeMode === "now"
          ? new Date().toISOString()
          : new Date(incidentAt).toISOString();

      const apiResponse = await submitIncidentReport({
        userId: "64012222",
        description,
        latitude,
        longitude,
        incidentDatetime,
        label: incidentLabel,
        placeName: locationNote.trim() || building,
        images: photos,
      });

      const incidentDateObj =
        incidentTimeMode === "now" ? new Date() : new Date(incidentAt);
      const day = incidentDateObj.getDate().toString().padStart(2, "0");
      const month = (incidentDateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const year = incidentDateObj.getFullYear();
      const h = incidentDateObj.getHours().toString().padStart(2, "0");
      const m = incidentDateObj.getMinutes().toString().padStart(2, "0");

      const incidentDateStr = `${day}/${month}/${year}`;
      const incidentTimeStr = `${h}:${m}`;

      setSubmittedData({
        reportId:
          typeof apiResponse.reportId === "string"
            ? apiResponse.reportId
            : `RP-${Math.floor(100000 + Math.random() * 900000)}`,
        incidentDate: incidentDateStr,
        incidentTime: incidentTimeStr,
        location: building || "Unknown location",
        summaryText: description,
        incidentType:
          INCIDENT_LABEL_OPTIONS.find((option) => option.value === incidentLabel)
            ?.label || incidentLabel,
        severity: "Pending Assessment",
        status: "Processing",
        addedToExisting: "-",
      });

      setIsSubmitted(true);
    } catch {
      setSubmitError("Submit failed. Please check your network or API URL and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && submittedData) {
    return (
      <SubmissionSuccess
        onReset={() => {
          handleClear();
          setIsSubmitted(false);
        }}
        reportData={submittedData}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-t-[28px] bg-white px-4 py-0 sm:px-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-semibold text-(--color-text)">
          แจ้งเหตุใหม่ / New Report
        </h2>
      </div>

      <DescriptionField value={description} onChange={setDescription} />

      <PhotoUploadSection
        photos={photos}
        onAddPhotos={handleAddPhotos}
        onRemovePhoto={handleRemovePhoto}
      />

      <section>
        <label className="mb-2 block text-base font-medium text-(--color-text)">
          Incident Label
        </label>
        <select
          value={incidentLabel}
          onChange={(e) => setIncidentLabel(e.target.value)}
          className="h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 text-sm text-(--color-text) outline-none transition focus:border-(--color-primary) focus:ring-2 focus:ring-(--primary-soft)"
        >
          {INCIDENT_LABEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-(--color-subtext)">
          เลือกประเภทเหตุเบื้องต้นเพื่อให้ระบบส่งต่อหน่วยงานได้เร็วขึ้น
        </p>
      </section>

      <LocationSection
        building={building}
        locationNote={locationNote}
        latitude={latitude}
        longitude={longitude}
        onChangeBuilding={setBuilding}
        onChangeLocationNote={setLocationNote}
        onChangeLatitude={setLatitude}
        onChangeLongitude={setLongitude}
      />

      <IncidentTimeSection
        incidentTimeMode={incidentTimeMode}
        incidentAt={incidentAt}
        onChangeMode={handleChangeTimeMode}
        onChangeIncidentAt={setIncidentAt}
      />

      <div>
        <label className="flex items-start gap-3 text-sm text-(--color-text)">
          <input
            type="checkbox"
            checked={acknowledgeTruth}
            onChange={(e) => setAcknowledgeTruth(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-neutral-400 text-(--color-primary) focus:ring-(--color-primary)"
          />
          <span>I acknowledge that reported information is true</span>
        </label>

        <div className="mt-3 space-y-1 text-xs text-(--color-subtext)">
          <p>Notice: This platform is for campus incident reporting.</p>
          <p>
            For life-threatening emergencies, contact emergency services
            immediately.
          </p>
        </div>
      </div>

      {submitError && (
        <p className="text-sm text-red-600">{submitError}</p>
      )}

      <ReportActions
        canSubmit={canSubmit}
        isSubmitting={isSubmitting}
        onClear={handleClear}
      />

      <ConfirmSubmitModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
      />
    </form>
  );
}