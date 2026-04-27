import React from 'react';

interface FusionData {
  totalReports: number;
  totalIncidents: number;
  mergedReports: number;
  fusionRate: number;
  avgReportsPerIncident: number;
}

export function FusionStats({ data }: { data: FusionData }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 flex flex-col justify-center">
      <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-6">Fusion Intelligence</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-50 p-4 rounded-xl">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Merged Reports</p>
          <p className="text-2xl font-bold text-neutral-800 mt-1">{data.mergedReports}</p>
        </div>
        <div className="bg-neutral-50 p-4 rounded-xl">
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Avg Reports / Inc</p>
          <p className="text-2xl font-bold text-neutral-800 mt-1">{data.avgReportsPerIncident}</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-neutral-600">Overall Fusion Rate</span>
          <span className="text-xs font-bold text-indigo-600">{data.fusionRate}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
            style={{ width: `${data.fusionRate}%` }}
          />
        </div>
        <p className="text-[10px] text-neutral-400 mt-3 italic text-center">
          Intelligence score based on spatial and temporal clustering
        </p>
      </div>
    </div>
  );
}
