import type { DashboardStat } from './types';

interface DashboardStatsProps {
  stats: DashboardStat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((item) => (
        <div key={item.label} className="bg-gray-200 p-4 rounded-xl shadow-sm border border-gray-300">
          <p className="text-gray-600 text-sm font-medium">{item.label}</p>
          <h2 className="text-3xl font-bold mt-2 text-gray-900">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}
