import type { DashboardStat, IncidentRow, PriorityIncident } from './types';

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: 'Total Open', value: '24' },
  { label: 'High Severity', value: '3' },
  { label: 'Under review', value: '8' },
  { label: 'Resolved Today', value: '12' },
  { label: 'Reports Merged', value: '38' },
];

export const INCIDENTS: IncidentRow[] = [
  {
    id: '#INC-0005',
    type: 'Water Leak/Flooding SC',
    severity: 'MEDIUM',
    severityColor: 'text-yellow-600',
    confidence: '85%',
    status: 'In progress',
    unit: 'Facilities Mgmt.',
    reports: '2 reports Merged',
    latest: '14:32',
  },
  {
    id: '#INC-0004',
    type: 'Garbage/Sanitation',
    severity: 'LOW',
    severityColor: 'text-gray-600',
    confidence: '70%',
    status: 'Under review',
    unit: 'Sanitation',
    reports: '1 reports',
    latest: '17:00',
  },
  {
    id: '#INC-0003',
    type: 'Fire/Smoke',
    severity: 'HIGH',
    severityColor: 'text-red-600',
    confidence: '92%',
    status: 'In progress',
    unit: 'Security',
    reports: '3 reports Merged',
    latest: '10:05',
  },
  {
    id: '#INC-0002',
    type: 'Electrical Issue',
    severity: 'HIGH',
    severityColor: 'text-red-600',
    confidence: '82%',
    status: 'Assigned',
    unit: 'Electrical Team',
    reports: '2 reports',
    latest: '11:15',
  },
  {
    id: '#INC-0001',
    type: 'Facility Damage',
    severity: 'MEDIUM',
    severityColor: 'text-yellow-600',
    confidence: '68%',
    status: 'Resolved',
    unit: 'Security',
    reports: '1 reports',
    latest: '19:20',
  },
];

export const PRIORITY_QUEUE: PriorityIncident[] = [
  {
    id: '#INC-0003',
    title: 'Fire/Smoke',
    details: 'Facilities 3 reports 5 min ago',
    severity: 'HIGH',
  },
  {
    id: '#INC-0002',
    title: 'Electrical Issue',
    details: 'Facilities 2 reports 12 min ago',
    severity: 'HIGH',
  },
];

export const STATUS_FILTERS = [
  'All status',
  'Under review',
  'In progress',
  'Assigned',
  'Resolved',
];

export const EXTRA_FILTERS = ['All severity', 'All types', 'All units', 'All time'];
