import staffApiClient from "@/services/http/staff-axios-instance";

export interface UnitItem {
  unitId: string;
  code: string;
  name: string;
  contactEmail?: string;
  description?: string;
  isActive: boolean;
}

export interface PaginatedUnits {
  items: UnitItem[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface RoutingRuleItem {
  ruleId: string;
  incidentType: string;
  severity: string;
  assignedUnitId: string;
  assignedUnitName?: string;
  priority: number;
  isActive: boolean;
}

// ----------------------------------------------------------- UNITS
export const getAdminUnits = async (page = 1, pageSize = 20) => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: PaginatedUnits }>(
    "/admin/units",
    { params: { page, pageSize } }
  );
  return response.data.data;
};

export const createUnit = async (payload: { name: string; code: string; email: string; description?: string }) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: UnitItem }>(
    "/admin/units",
    payload
  );
  return response.data.data;
};

// ----------------------------------------------------------- LOCATIONS
export const createLocation = async (payload: { locationName: string; lat: number; lng: number; buildingCode: string }) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: any }>(
    "/admin/locations",
    payload
  );
  return response.data.data;
};

// ----------------------------------------------------------- ROUTING RULES
export const getRoutingRules = async () => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: { items: RoutingRuleItem[] } }>(
    "/admin/routing-rules"
  );
  return response.data.data.items;
};

export const createRoutingRule = async (payload: { incidentType: string; severity: string; assignedUnitId: string; priority?: number }) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: RoutingRuleItem }>(
    "/admin/routing-rules",
    payload
  );
  return response.data.data;
};

// ----------------------------------------------------------- STAFF USERS
export const createStaffUser = async (payload: { 
  fullName: string; 
  email: string; 
  password: string; 
  unitId?: string; 
  role: "STAFF" | "ADMIN" 
}) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: any }>(
    "/admin/staff-users",
    payload
  );
  return response.data.data;
};
