// components/analytics/hotspotlocation.tsx

const hotspotData = [
  { rank: 1, label: "โรงอาหาร", value: 29, color: "bg-red-500" },
  { rank: 2, label: "อาคาร SC", value: 8, color: "bg-orange-400" },
  { rank: 3, label: "ลานพญานาค", value: 3, color: "bg-red-400" },
];

export default function HotspotLocations() {
  const max = hotspotData[0].value;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-2xl">
      <h2 className="text-sm font-bold text-gray-800 mb-4 tracking-wide">
        HOTSPOT LOCATIONS
      </h2>
      <div className="space-y-4">
        {hotspotData.map((item) => (
          <div key={item.rank} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
              {item.rank}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 mb-1">{item.label}</p>
              <div className="bg-gray-200 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full`}
                  style={{ width: `${(item.value / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-gray-600 w-6 text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}