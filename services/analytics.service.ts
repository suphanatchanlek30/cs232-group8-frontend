import staffApiClient from "@/services/http/staff-axios-instance";

export interface KPISummary {
  totalReports: number;
  totalIncidents: number;
  fusionRate: number;
  avgResponseMinutes: number;
  resolvedRate: number;
}

export interface TypeDistribution {
  incidentType: string;
  count: number;
}

export interface HotspotLocation {
  locationName: string;
  incidentCount: number;
  lat: number;
  lng: number;
}

export interface PeakTimeData {
  hour?: number;
  day?: number;
  count: number;
}

export interface FusionStatistics {
  totalReports: number;
  totalIncidents: number;
  mergedReports: number;
  fusionRate: number;
  avgReportsPerIncident: number;
}

export interface StatusOverview {
  status: string;
  count: number;
}

export const getKPISummary = async (params: { dateFrom?: string; dateTo?: string; unitId?: string } = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: KPISummary }>(
    "/analytics/kpi-summary",
    { params }
  );
  return response.data.data;
};

export const getTypeDistribution = async (params: { dateFrom?: string; dateTo?: string } = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: TypeDistribution[] }>(
    "/analytics/incident-type-distribution",
    { params }
  );
  return response.data.data;
};

export const getHotspots = async (params: { dateFrom?: string; dateTo?: string; limit?: number } = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: HotspotLocation[] }>(
    "/analytics/hotspot-locations",
    { params }
  );
  return response.data.data;
};

export const getPeakTimeAnalysis = async (params: { dateFrom?: string; dateTo?: string; groupBy?: "hour" | "day" } = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: PeakTimeData[] }>(
    "/analytics/peak-time-analysis",
    { params }
  );
  return response.data.data;
};

export const getFusionStatistics = async (params: { dateFrom?: string; dateTo?: string } = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: FusionStatistics }>(
    "/analytics/fusion-statistics",
    { params }
  );
  return response.data.data;
};

export const getStatusOverview = async (params: { dateFrom?: string; dateTo?: string } = {}) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: StatusOverview[] }>(
    "/analytics/status-overview",
    { params }
  );
  return response.data.data;
};
