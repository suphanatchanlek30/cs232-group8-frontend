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
  sortOrder?: string;
} = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: PaginatedIncidents }>(
    "/incidents",
    { params }
  );
  return response.data.data;
};
