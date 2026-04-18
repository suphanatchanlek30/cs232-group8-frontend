// components/analytics/peaktime.tsx

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const peakData = [
  { hour: 0, count: 1 }, { hour: 1, count: 2 }, { hour: 2, count: 1 },
  { hour: 3, count: 0 }, { hour: 4, count: 0 }, { hour: 5, count: 1 },
  { hour: 6, count: 0 }, { hour: 7, count: 3 }, { hour: 8, count: 8 },
  { hour: 9, count: 18 }, { hour: 10, count: 13 }, { hour: 11, count: 14 },
  { hour: 12, count: 19 }, { hour: 13, count: 21 }, { hour: 14, count: 20 },
  { hour: 15, count: 16 }, { hour: 16, count: 18 }, { hour: 17, count: 15 },
  { hour: 18, count: 13 }, { hour: 19, count: 12 }, { hour: 20, count: 10 },
  { hour: 21, count: 9 }, { hour: 22, count: 6 }, { hour: 23, count: 1 },
];

export default function PeakTimeAnalysis() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full">
      <h2 className="text-sm font-semibold text-gray-800 mb-4 tracking-wide">
        PEAK TIME ANALYSIS
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={peakData} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            label={{ value: "เวลา (ชั่วโมง)", position: "insideBottom", offset: -10, fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            label={{ value: "จำนวนเหตุการณ์", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "#6b7280" }}
            allowDecimals={false}
          />
          <Tooltip
            formatter={(value) => [value, "เหตุการณ์"]}
            labelFormatter={(label) => `${label}:00 น.`}
          />
          <Bar dataKey="count" fill="#8979FF" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}