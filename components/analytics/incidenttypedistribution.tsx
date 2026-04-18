// components/analytics/incidenttypedistribution.tsx

const incidentData = [
  { label: "Water leak", value: 12, color: "bg-blue-500" },
  { label: "Fire/Smoke", value: 8, color: "bg-yellow-400" },
  { label: "Garbage", value: 35, color: "bg-purple-500" },
  { label: "Safety Issues", value: 25, color: "bg-green-500" },
  { label: "Facility Damage", value: 20, color: "bg-red-400" },
];

export default function IncidentTypeDistribution() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-2xl">
      <h2 className="text-sm font-bold text-gray-800 mb-4 tracking-wide">
        INCIDENT TYPE DISTRIBUTION
      </h2>
      <div className="space-y-3">
        {incidentData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-32 text-sm text-gray-700">{item.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className={`${item.color} h-3 rounded-full`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-8 text-right">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}