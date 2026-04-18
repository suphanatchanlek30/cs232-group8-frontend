import Link from 'next/link';
import type { IncidentRow } from './types';

interface IncidentsTableProps {
  incidents: IncidentRow[];
}

export function IncidentsTable({ incidents }: IncidentsTableProps) {
  return (
    <div className="col-span-12 bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-x-auto lg:col-span-9">
      <h3 className="font-semibold mb-6 text-neutral-800 text-sm tracking-wide">ALL INCIDENTS</h3>

      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-neutral-400 border-b border-neutral-100">
          <tr>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Incident ID</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Type/Location</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Severity</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Confidence</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Status</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Assigned Unit</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Reports</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider">Latest</th>
            <th className="pb-3 font-medium uppercase text-[11px] tracking-wider text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-50">
          {incidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-neutral-50/50 transition-colors group">
              <td className="py-4 font-medium text-neutral-700">{incident.code}</td>
              <td className="py-4 text-neutral-900 font-medium">{incident.type}</td>
              <td className="py-4">
                <span className={`font-semibold ${incident.severityColor}`}>{incident.severity}</span>
              </td>
              <td className="py-4 text-neutral-500">{incident.confidence}</td>
              <td className="py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  incident.status.toLowerCase().includes('resolve') 
                    ? 'bg-green-100 text-green-800' 
                    : incident.status.toLowerCase().includes('progress')
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {incident.status}
                </span>
              </td>
              <td className="py-4 text-neutral-600">{incident.unit}</td>
              <td className="py-4 text-neutral-500">{incident.reports}</td>
              <td className="py-4 text-neutral-400">{incident.latest}</td>
              <td className="py-4 text-right">
                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/incidents/${incident.id}`} 
                    className="px-3 py-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors"
                  >
                    View
                  </Link>
                  <button type="button" className="px-3 py-1 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-900 rounded-md transition-colors">
                    Resolve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
