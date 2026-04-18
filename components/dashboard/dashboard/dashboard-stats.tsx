import type { DashboardStat } from './types';

interface DashboardStatsProps {
  stats: DashboardStat[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((item) => (
        <div key={item.label} className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 flex flex-col justify-between transition-transform hover:-translate-y-1">
          <p className="text-neutral-500 text-sm font-medium tracking-wide">{item.label}</p>
          <h2 className="text-4xl font-bold mt-3 text-neutral-800">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}
