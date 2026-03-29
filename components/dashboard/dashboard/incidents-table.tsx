import type { IncidentRow } from './types';

interface IncidentsTableProps {
  incidents: IncidentRow[];
}

export function IncidentsTable({ incidents }: IncidentsTableProps) {
  return (
    <div className="col-span-12 bg-white p-4 rounded-xl shadow-sm border overflow-x-auto lg:col-span-9">
      <h3 className="font-bold mb-4 text-gray-400 text-xs uppercase tracking-wider">ALL INCIDENTS</h3>

      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead className="text-gray-400 border-b">
          <tr>
            <th className="pb-2 font-medium uppercase">Incident ID</th>
            <th className="pb-2 font-medium uppercase">Type/Location</th>
            <th className="pb-2 font-medium uppercase">Severity</th>
            <th className="pb-2 font-medium uppercase">Confidence</th>
            <th className="pb-2 font-medium uppercase">Status</th>
            <th className="pb-2 font-medium uppercase">Assigned Unit</th>
            <th className="pb-2 font-medium uppercase">Reports</th>
            <th className="pb-2 font-medium uppercase">Latest</th>
            <th className="pb-2 font-medium uppercase">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {incidents.map((incident) => (
            <tr key={incident.id} className="hover:bg-gray-50">
              <td className="py-4 font-medium text-gray-900">{incident.id}</td>
              <td className="py-4 text-blue-600 font-medium cursor-pointer">{incident.type}</td>
              <td className={`py-4 font-bold ${incident.severityColor}`}>{incident.severity}</td>
              <td className="py-4 text-gray-700">{incident.confidence}</td>
              <td className="py-4 text-gray-900">{incident.status}</td>
              <td className="py-4 text-gray-700">{incident.unit}</td>
              <td className="py-4 text-gray-700">{incident.reports}</td>
              <td className="py-4 text-gray-500">{incident.latest}</td>
              <td className="py-4">
                <div className="flex gap-3">
                  <button type="button" className="text-blue-500 hover:underline">
                    View
                  </button>
                  <button type="button" className="text-blue-500 hover:underline">
                    Resolved
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
