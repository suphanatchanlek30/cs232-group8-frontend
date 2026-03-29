import React from 'react';

export default function DashboardContent() {
  const stats = [
    { label: "Total Open", value: "24" },
    { label: "High Severity", value: "3" },
    { label: "Under review", value: "8" },
    { label: "Resolved Today", value: "12" },
    { label: "Reports Merged", value: "38" },
  ];

  const incidents = [
    { id: "#INC-0005", type: "Water Leak/Flooding SC", severity: "MEDIUM", severityColor: "text-yellow-600", confidence: "85%", status: "In progress", unit: "Facilities Mgmt.", reports: "2 reports Merged", latest: "14:32" },
    { id: "#INC-0004", type: "Garbage/Sanitation", severity: "LOW", severityColor: "text-gray-600", confidence: "70%", status: "Under review", unit: "Sanitation", reports: "1 reports", latest: "17:00" },
    { id: "#INC-0003", type: "Fire/Smoke", severity: "HIGH", severityColor: "text-red-600", confidence: "92%", status: "In progress", unit: "Security", reports: "3 reports Merged", latest: "10:05" },
    { id: "#INC-0002", type: "Electrical Issue", severity: "HIGH", severityColor: "text-red-600", confidence: "82%", status: "Assigned", unit: "Electrical Team", reports: "2 reports", latest: "11:15" },
    { id: "#INC-0001", type: "Facility Damage", severity: "MEDIUM", severityColor: "text-yellow-600", confidence: "68%", status: "Resolved", unit: "Security", reports: "1 reports", latest: "19:20" },
  ];

  const priorityQueue = [
    { id: "#INC-0003", title: "Fire/Smoke", details: "Facilities 3 reports 5 min ago", severity: "HIGH" },
    { id: "#INC-0002", title: "Electrical Issue", details: "Facilities 2 reports 12 min ago", severity: "HIGH" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-5 gap-4 mb-8">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-gray-200 p-4 rounded-xl shadow-sm border border-gray-300">
            <p className="text-gray-600 text-sm font-medium">{item.label}</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-6 bg-white p-2 rounded-full border shadow-sm overflow-x-auto">
        <span className="px-4 font-bold border-r pr-4 text-sm text-gray-900 uppercase">Filter</span>
        {['All status', 'Under review', 'In progress', 'Assigned', 'Resolved'].map((filter, idx) => (
          <button key={filter} className={`px-4 py-1 rounded-full text-sm hover:bg-gray-100 border ${idx === 3 ? 'bg-gray-100 font-medium' : ''}`}>{filter}</button>
        ))}
        <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
        {['All severity', 'All types', 'All units', 'All time'].map(filter => (
          <button key={filter} className="px-4 py-1 rounded-full text-sm hover:bg-gray-100 border">{filter}</button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9 bg-white p-4 rounded-xl shadow-sm border overflow-x-auto">
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
                  <td className="py-4 flex gap-3">
                    <button className="text-blue-500 hover:underline">View</button>
                    <button className="text-blue-500 hover:underline">Resolved</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-3 bg-white p-4 rounded-xl shadow-sm border self-start">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">PRIORITY QUEUE</h3>
              <span className="text-[10px] text-gray-400 font-medium">High severity only</span>
           </div>
           <div className="space-y-4">
              {priorityQueue.map((item, idx) => (
                <div key={item.id} className={`${idx < priorityQueue.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold">{item.id}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{item.title}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{item.details}</p>
                    </div>
                    <p className="text-[10px] text-red-600 font-bold uppercase pt-1">{item.severity}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}