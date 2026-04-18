import apiClient from "@/services/http/axios-instance";

export interface SystemInfo {
  systemName: string;
  projectNameEn: string;
  allowReportSubmission: boolean;
  version: string;
  maintenanceBanner?: string;
}

export interface ReportOptions {
  incidentLabels: string[];
  reporterTypes: string[];
}

export interface LocationMaster {
  locationId: string;
  locationName: string;
  lat: number;
  lng: number;
  buildingCode: string;
}

export const getSystemInfo = async () => {
  const response = await apiClient.get<{ success: boolean; message: string; data: SystemInfo }>(
    "/public/system-info"
  );
  return response.data.data;
};

export const getReportOptions = async () => {
  const response = await apiClient.get<{ success: boolean; message: string; data: ReportOptions }>(
    "/public/report-options"
  );
  return response.data.data;
};

export const getPublicLocations = async (search = "", page = 1, pageSize = 20) => {
  const response = await apiClient.get<{ success: boolean; message: string; data: { items: LocationMaster[] } }>(
    "/public/locations",
    { params: { search, page, pageSize } }
  );
  return response.data.data.items;
};
