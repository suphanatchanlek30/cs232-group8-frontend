// components/report-incident/types.ts

// Speech Recognition Types
export type SpeechRecognitionType = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

export type SpeechRecognitionEventLike = {
  results: ArrayLike<{
    0: { transcript: string };
  }>;
};

// Incident Time
export type IncidentTimeMode = "now" | "earlier";

// Component Props
export interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export interface IncidentTimeSectionProps {
  incidentTimeMode: IncidentTimeMode;
  incidentAt: string;
  onChangeMode: (value: IncidentTimeMode) => void;
  onChangeIncidentAt: (value: string) => void;
}

export interface LocationSectionProps {
  building: string;
  locationNote: string;
  latitude: string;
  longitude: string;
  onChangeBuilding: (value: string) => void;
  onChangeLocationNote: (value: string) => void;
  onChangeLatitude: (value: string) => void;
  onChangeLongitude: (value: string) => void;
}

export interface PhotoUploadSectionProps {
  photos: File[];
  onAddPhotos: (files: FileList | null) => void;
  onRemovePhoto: (index: number) => void;
}

export interface ReportActionsProps {
  canSubmit: boolean;
  onClear: () => void;
}
