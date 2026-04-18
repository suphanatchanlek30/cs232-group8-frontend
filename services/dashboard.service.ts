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
  status: string;
  reportCount?: number;
  latestUpdatedAt?: string;
  assignedUnitId?: string;
  assignedUnitName?: string;
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
  const response = await staffApiClient.get<{ success: boolean; message: string; data: PaginatedIncidents }>(
    `/incidents/${incidentId}/reports`,
    { params: { page, pageSize } }
  );
  return response.data.data;
};

export const getIncidentTimeline = async (incidentId: string) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: { timeline: { actionType: string; actorType: string; actorName: string | null; description: string; changedAt: string }[] } }>(
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

