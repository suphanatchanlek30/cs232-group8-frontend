export interface DashboardStat {
  label: string;
  value: string;
}

export interface IncidentRow {
  id: string;
  type: string;
  severity: string;
  severityColor: string;
  confidence: string;
  status: string;
  unit: string;
  reports: string;
  latest: string;
}

export interface PriorityIncident {
  id: string;
  title: string;
  details: string;
  severity: string;
}
