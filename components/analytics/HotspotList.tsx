import React from 'react';

interface Hotspot {
  locationName: string;
  incidentCount: number;
  lat: number;
  lng: number;
}

export function HotspotList({ hotspots }: { hotspots: Hotspot[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100">
      <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-6">Hotspot Locations</h3>
      <div className="space-y-4">
        {hotspots.map((h, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-bold">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-800">{h.locationName}</p>
                <p className="text-[10px] text-neutral-400">Lat: {h.lat.toFixed(3)}, Lng: {h.lng.toFixed(3)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-neutral-800">{h.incidentCount}</p>
              <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-tight">Incidents</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
