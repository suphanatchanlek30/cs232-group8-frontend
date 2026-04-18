import apiClient from "./http/axios-instance";

export interface ReportItem {
  reportId: string;
  trackingCode: string;
  reportText: string;
  candidateIncidentType: string | null;
  status: string;
  submittedAt: string;
}

export interface PaginatedReports {
  items: ReportItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface TrackingData {
  trackingCode: string;
  reportId: string;
  incidentId: string | null;
  incidentType: string | null;
  status: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | null;
  assignedUnit: string | null;
  latestUpdatedAt: string;
}

export interface ReportDetail {
  reportId: string;
  trackingCode: string;
  reportText: string;
  voiceText: string | null;
  normalizedText: string | null;
  detectedLabels: string[];
  candidateIncidentType: string | null;
  linkedIncidentId: string | null;
  attachments: any[];
  submittedAt: string;
}

export interface TimelineEvent {
  actionType?: string;
  actorType?: string;
  description?: string;
  status?: string;
  changedAt: string;
  note?: string;
}

export interface TimelineData {
  timeline: TimelineEvent[];
}

export const getMyReports = async (page = 1, pageSize = 20) => {
  const response = await apiClient.get<{ success: boolean; message: string; data: PaginatedReports }>("/reports/my", {
    params: { page, pageSize },
  });
  return response.data.data;
};

export const getTrackingInfo = async (trackingCode: string) => {
  const response = await apiClient.get<{ success: boolean; message: string; data: TrackingData }>(
    `/tracking/${trackingCode}`
  );
  return response.data.data;
};

export const getReportDetail = async (reportId: string) => {
  const response = await apiClient.get<{ success: boolean; message: string; data: ReportDetail }>(
    `/reports/${reportId}`
  );
  return response.data.data;
};

export const getTrackingTimeline = async (trackingCode: string) => {
  const response = await apiClient.get<{ success: boolean; message: string; data: TimelineData }>(
    `/tracking/${trackingCode}/timeline`
  );
  return response.data.data;
};
