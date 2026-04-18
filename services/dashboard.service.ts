import staffApiClient from "@/services/http/staff-axios-instance";

export interface DashboardSummary {
  totalIncidents: number;
  newCount: number;
  inReviewCount: number;
  inProgressCount: number;
  resolvedCount: number;
  highSeverityCount: number;
}

export interface IncidentItem {
  incidentId: string;
  incidentCode: string;
  incidentType: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | null;
  confidence?: string;
  confidenceScore?: number;
  status: string;
  reportCount?: number;
  evidenceCount?: number;
  locationName?: string;
  locationNote?: string;
  lat?: number;
  lng?: number;
  firstReportTime?: string;
  latestReportTime?: string;
  summary?: string;
  assignedUnitId?: string;
  assignedUnitName?: string;
}

export interface ReportItem {
  reportId: string;
  trackingCode: string;
  reportText: string;
  submittedAt?: string;
  createdAt: string;
  attachments?: { fileUrl: string }[];
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

export interface DashboardMetadata {
  units: { unitId: string; name: string; code: string }[];
  statusOptions: { value: string; label: string }[];
}

export interface PaginatedIncidents {
  items: IncidentItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export const getDashboardSummary = async () => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: DashboardSummary }>(
    "/dashboard/summary"
  );
  return response.data.data;
};

export const getDashboardMetadata = async () => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: DashboardMetadata }>(
    "/dashboard/metadata"
  );
  return response.data.data;
};

export const getIncidents = async (params: {
  page?: number;
  pageSize?: number;
  status?: string;
  severity?: string;
  incidentType?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: PaginatedIncidents }>(
    "/incidents",
    { params }
  );
  return response.data.data;
};

export const getIncidentDetail = async (incidentId: string) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: IncidentItem }>(
    `/incidents/${incidentId}`
  );
  return response.data.data;
};

export const getIncidentReports = async (incidentId: string, page = 1, pageSize = 20) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: PaginatedReports }>(
    `/incidents/${incidentId}/reports`,
    { params: { page, pageSize } }
  );
  return response.data.data;
};

export interface TimelineEntry {
  actionType: string;
  actorType: string;
  actorName: string | null;
  description: string;
  changedAt: string;
}

export const getIncidentTimeline = async (incidentId: string) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: { timeline: TimelineEntry[] } }>(
    `/incidents/${incidentId}/timeline`
  );
  return response.data.data;
};

export const getFusionExplanation = async (incidentId: string) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: { explanationText: string; matchRules: { [key: string]: boolean | number | null }; mergedReports: number } }>(
    `/incidents/${incidentId}/fusion-explanation`
  );
  return response.data.data;
};

export const getScoringExplanation = async (incidentId: string) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: { severity: string; confidence: string; incidentType: string; severityReason: string; confidenceFactors: { factor: string; score: number }[] } }>(
    `/incidents/${incidentId}/scoring-explanation`
  );
  return response.data.data;
};

export const updateIncidentStatus = async (incidentId: string, status: string, note?: string) => {
  const response = await staffApiClient.patch<{ success: boolean; message: string; data: IncidentItem }>(
    `/incidents/${incidentId}/status`,
    { status, note }
  );
  return response.data.data;
};

export const assignIncidentUnit = async (incidentId: string, assignedUnitId: string, note?: string) => {
  const response = await staffApiClient.patch<{ success: boolean; message: string; data: IncidentItem }>(
    `/incidents/${incidentId}/assign-unit`,
    { assignedUnitId, note }
  );
  return response.data.data;
};

export const updateIncidentPriority = async (incidentId: string, severity: string, reason: string) => {
  const response = await staffApiClient.patch<{ success: boolean; message: string; data: IncidentItem }>(
    `/incidents/${incidentId}/priority`,
    { severity, reason }
  );
  return response.data.data;
};

export const resolveIncident = async (incidentId: string, resolutionSummary: string) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: IncidentItem }>(
    `/incidents/${incidentId}/resolve`,
    { resolutionSummary, resolvedAt: new Date().toISOString() }
  );
  return response.data.data;
};

export const addIncidentComment = async (incidentId: string, comment: string) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: { id: string; comment: string; createdAt: string; authorName: string } }>(
    `/incidents/${incidentId}/comments`,
    { comment }
  );
  return response.data.data;
};

