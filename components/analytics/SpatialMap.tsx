import React, { useMemo } from 'react';
import { Flame, Droplets, Trash2, Hammer, Siren, MapPin } from 'lucide-react';
import type { HotspotLocation } from '@/services/analytics.service';

interface SpatialMapProps {
  hotspots: HotspotLocation[];
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'fire_smoke': return <Flame size={20} className="text-red-500" />;
    case 'water_leak': return <Droplets size={20} className="text-blue-500" />;
    case 'waste_issue': return <Trash2 size={20} className="text-amber-600" />;
    case 'facility_issue': return <Hammer size={20} className="text-purple-500" />;
    case 'security_issue': return <Siren size={20} className="text-rose-600" />;
    default: return <MapPin size={20} className="text-indigo-500" />;
  }
};

const MOCK_TYPES = ['fire_smoke', 'water_leak', 'waste_issue', 'facility_issue', 'security_issue'];

export function SpatialMap({ hotspots }: SpatialMapProps) {
  // Fallback to mock data if there are no hotspots from the database
  const displayHotspots = hotspots && hotspots.length > 0 ? hotspots : [
    { locationName: "อาคาร SC", incidentCount: 5, lat: 14.073, lng: 100.600 },
    { locationName: "หอสมุดป๋วยฯ", incidentCount: 3, lat: 14.072, lng: 100.603 },
    { locationName: "โรงอาหารกลาง", incidentCount: 8, lat: 14.071, lng: 100.608 },
    { locationName: "ประตูเชียงราก 1", incidentCount: 2, lat: 14.068, lng: 100.602 },
    { locationName: "อาคารบรรยายรวม (บร.)", incidentCount: 12, lat: 14.070, lng: 100.605 }
  ];

  // Calculate relative bounds for plotting
  const bounds = useMemo(() => {
    if (!displayHotspots || displayHotspots.length === 0) return null;
    const lats = displayHotspots.map(h => h.lat);
    const lngs = displayHotspots.map(h => h.lng);
    
    // Add a tiny buffer so points don't stick exactly to the edge
    const latBuffer = (Math.max(...lats) - Math.min(...lats)) * 0.2 || 0.005;
    const lngBuffer = (Math.max(...lngs) - Math.min(...lngs)) * 0.2 || 0.005;

    const minLat = Math.min(...lats) - latBuffer;
    const maxLat = Math.max(...lats) + latBuffer;
    const minLng = Math.min(...lngs) - lngBuffer;
    const maxLng = Math.max(...lngs) + lngBuffer;

    return { minLat, maxLat, minLng, maxLng };
  }, [hotspots]);

  return (
    <div className="w-full h-[300px] bg-neutral-50 rounded-xl relative overflow-hidden border border-neutral-100 shadow-inner">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-size-[20px_20px]" />
      
      {bounds && displayHotspots.map((hotspot, idx) => {
        // Calculate relative X, Y percentages (0-100)
        // Y is inverted because larger Lat is higher (top) and smaller Lat is lower (bottom)
        const top = 100 - ((hotspot.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
        const left = ((hotspot.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
        
        // Mock a deterministic incident type based on index to show different icons
        const mockType = MOCK_TYPES[idx % MOCK_TYPES.length];

        return (
          <div 
            key={idx}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all hover:scale-110 z-10 hover:z-20"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <div className="relative flex items-center justify-center w-10 h-10">
              {/* Pulse effect for hotspots */}
              <div className="absolute inset-0 bg-white rounded-full opacity-60 group-hover:animate-ping" />
              
              <div className="bg-white p-2 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.1)] relative z-10 border border-neutral-200 group-hover:border-indigo-200 transition-colors">
                {getIconForType(mockType)}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max px-3 py-2 bg-neutral-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl scale-95 group-hover:scale-100 origin-bottom">
                <p className="font-bold text-sm">{hotspot.locationName}</p>
                <p className="text-[10px] text-neutral-300 font-medium uppercase tracking-wider mt-1">
                  {hotspot.incidentCount} Incidents · <span className="capitalize">{mockType.replace('_', ' ')}</span>
                </p>
                
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-neutral-900" />
              </div>
            </div>
          </div>
        );
      })}

      {!bounds && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <MapPin className="text-neutral-300 w-8 h-8 mb-2" />
          <p className="text-neutral-400 text-sm font-medium">No hotspot data available</p>
        </div>
      )}
    </div>
  );
}
