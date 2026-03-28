// components/report-incident/report-form.tsx

"use client";

import { useMemo, useState } from "react";
import DescriptionField from "./description-field";
import PhotoUploadSection from "./photo-upload-section";
import LocationSection from "./location-section";
import IncidentTimeSection from "./incident-time-section";
import ReportActions from "./report-actions";
import SubmissionSuccess from "./submission-success";
import type { IncidentTimeMode } from "./types";

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
  const [incidentTimeMode, setIncidentTimeMode] =
    useState<IncidentTimeMode>("now");
  const [incidentAt, setIncidentAt] = useState(getCurrentDatetimeLocal());
  const [acknowledgeTruth, setAcknowledgeTruth] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setIncidentTimeMode("now");
    setIncidentAt(getCurrentDatetimeLocal());
    setAcknowledgeTruth(false);
  };

  const canSubmit = useMemo(() => {
    const hasDescription = description.trim().length > 0;
    const hasBuilding = building.trim().length > 0;
    const hasLocationReference =
      locationNote.trim().length > 0 ||
      (latitude.trim().length > 0 && longitude.trim().length > 0);
    const hasIncidentTime =
      incidentTimeMode === "now" || incidentAt.trim().length > 0;

    return (
      hasDescription &&
      hasBuilding &&
      hasLocationReference &&
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
    locationNote,
    longitude,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    const payload = {
      description,
      photos,
      building,
      locationNote,
      latitude,
      longitude,
      incidentTime:
        incidentTimeMode === "now" ? new Date().toISOString() : incidentAt,
      incidentTimeMode,
      acknowledgeTruth,
    };

    console.log("submit payload", payload);

    // Extract Date from the actual incident time that user inputted
    const incidentDateObj = incidentTimeMode === "now" ? new Date() : new Date(incidentAt);
    const day = incidentDateObj.getDate().toString().padStart(2, '0');
    const month = (incidentDateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = incidentDateObj.getFullYear();
    const h = incidentDateObj.getHours().toString().padStart(2, '0');
    const m = incidentDateObj.getMinutes().toString().padStart(2, '0');
    
    // Split into specific date and time strings
    const incidentDateStr = `${day}/${month}/${year}`;
    const incidentTimeStr = `${h}:${m}`;

    // Mock submitted data for the success screen
    setSubmittedData({
      reportId: `RP-${Math.floor(100000 + Math.random() * 900000)}`,
      incidentDate: incidentDateStr,
      incidentTime: incidentTimeStr,
      location: building || "Unknown location",
      summaryText: description,
      incidentType: "Pending Classification",
      severity: "Pending Assessment",
      status: "Processing",
      addedToExisting: "-",
    });

    setIsSubmitted(true);
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

      <ReportActions canSubmit={canSubmit} onClear={handleClear} />
    </form>
  );
}