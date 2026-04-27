import React from 'react';

interface KPIProps {
  label: string;
  value: string | number;
  suffix?: string;
  subValue?: string;
  color?: string;
}

export function KPIStats({ totalReports, totalIncidents, fusionRate, resolvedRate, avgResponse }: {
  totalReports: number;
  totalIncidents: number;
  fusionRate: number;
  resolvedRate: number;
  avgResponse: number;
}) {
  const kpis: KPIProps[] = [
    { label: 'Total Reports', value: totalReports, color: 'text-blue-600' },
    { label: 'Total Incidents', value: totalIncidents, color: 'text-purple-600' },
    { label: 'Fusion Rate', value: fusionRate, suffix: '%', subValue: 'Efficiency in grouping', color: 'text-indigo-600' },
    { label: 'Resolved Rate', value: resolvedRate, suffix: '%', color: 'text-green-600' },
    { label: 'Avg. Response', value: avgResponse, suffix: 'm', subValue: 'Minutes to action', color: 'text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 transition-all hover:shadow-md">
          <p className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2">{kpi.label}</p>
          <div className="flex items-baseline gap-1">
            <h2 className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</h2>
            {kpi.suffix && <span className="text-neutral-400 font-medium">{kpi.suffix}</span>}
          </div>
          {kpi.subValue && <p className="text-neutral-400 text-[10px] mt-1">{kpi.subValue}</p>}
        </div>
      ))}
    </div>
  );
}
