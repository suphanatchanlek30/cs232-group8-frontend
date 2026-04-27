"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { HotspotLocation } from '@/services/analytics.service';

// Fix for default Leaflet marker icons in Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  hotspots: HotspotLocation[];
}

export default function LeafletMap({ hotspots }: LeafletMapProps) {
  // Default to TU Rangsit coordinates if no hotspots
  const defaultCenter: [number, number] = hotspots.length > 0 
    ? [hotspots[0].lat, hotspots[0].lng] 
    : [14.072, 100.601];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={16} 
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ borderRadius: '0.75rem', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {hotspots.map((hotspot, index) => (
          <Marker 
            key={index} 
            position={[hotspot.lat, hotspot.lng]}
          >
            <Popup>
              <div className="text-sm min-w-[120px]">
                <p className="font-bold mb-1 text-neutral-800">{hotspot.locationName}</p>
                <div className="flex justify-between items-center mt-2 border-t pt-2">
                  <span className="text-neutral-500 text-xs uppercase tracking-wider">Incidents</span>
                  <span className="font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                    {hotspot.incidentCount}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
