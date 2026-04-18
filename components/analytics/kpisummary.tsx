// components/analytics/kpisummary.tsx

const kpiData = [
  { label: "Total incidents this week", value: "40" },
  { label: "Total merged reports", value: "10" },
  { label: "High severity incidents", value: "3" },
  { label: "Most frequent incident type", value: "Garbage", bold: true },
];

export default function KpiSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full">
      <h2 className="text-sm font-semibold text-gray-800 mb-3 tracking-wide">
        KPI SUMMARY
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((item) => (
          <div key={item.label} className="bg-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2">{item.label}</p>
            <p className={`text-2xl ${item.bold ? "font-bold" : "font-semibold"} text-gray-900`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}