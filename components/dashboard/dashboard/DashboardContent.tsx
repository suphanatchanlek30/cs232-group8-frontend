import {
  DASHBOARD_STATS,
  EXTRA_FILTERS,
  INCIDENTS,
  PRIORITY_QUEUE,
  STATUS_FILTERS,
} from './constants';
import { DashboardFilters } from './dashboard-filters';
import { DashboardStats } from './dashboard-stats';
import { IncidentsTable } from './incidents-table';
import { PriorityQueue } from './priority-queue';

export default function DashboardContent() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardStats stats={DASHBOARD_STATS} />

      <DashboardFilters
        statusFilters={STATUS_FILTERS}
        extraFilters={EXTRA_FILTERS}
        activeStatusIndex={3}
      />

      <div className="grid grid-cols-12 gap-6">
        <IncidentsTable incidents={INCIDENTS} />
        <PriorityQueue items={PRIORITY_QUEUE} />
      </div>
    </div>
  );
}