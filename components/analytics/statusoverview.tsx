// components/analytics/statusoverview.tsx

const statusData = [
  { label: "มาใหม่", value: 7, color: "bg-red-500" },
  { label: "กำลังตรวจสอบ", value: 5, color: "bg-yellow-400" },
  { label: "กำลังดำเนินการ", value: 9, color: "bg-blue-500" },
  { label: "เสร็จสิ้น", value: 19, color: "bg-green-500" },
];

const total = statusData.reduce((sum, item) => sum + item.value, 0);

export default function StatusOverview() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-md">
      <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">
        STATUS OVERVIEW
      </h2>
      <div className="space-y-3">
        {statusData.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="w-36 text-sm text-gray-700">{item.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className={`${item.color} h-3 rounded-full transition-all`}
                style={{ width: `${(item.value / total) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-700 w-4 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}