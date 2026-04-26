"use client";

import React, { useEffect, useState } from 'react';
import { KPIStats } from '@/components/analytics/KPIStats';
import { DistributionChart } from '@/components/analytics/DistributionChart';
import { StatusOverview } from '@/components/analytics/statusoverview';
import { PeakTimeChart } from '@/components/analytics/PeakTimeChart';
import { HotspotList } from '@/components/analytics/HotspotList';
import { FusionStats } from '@/components/analytics/FusionStats';
import { 
  getKPISummary, 
  getTypeDistribution, 
  getHotspots, 
  getPeakTimeAnalysis, 
  getFusionStatistics, 
  getStatusOverview,
  KPISummary,
  TypeDistribution,
  HotspotLocation,
  PeakTimeData,
  FusionStatistics,
  StatusOverview as StatusData
} from '@/services/analytics.service';

export default function AnalyticsPage() {
  const [kpi, setKpi] = useState<KPISummary | null>(null);
  const [distribution, setDistribution] = useState<TypeDistribution[]>([]);
  const [hotspots, setHotspots] = useState<HotspotLocation[]>([]);
  const [peakTime, setPeakTime] = useState<PeakTimeData[]>([]);
  const [fusion, setFusion] = useState<FusionStatistics | null>(null);
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [kpiData, distData, hostspotData, peakData, fusionData, statusOverview] = await Promise.all([
          getKPISummary(),
          getTypeDistribution(),
          getHotspots({ limit: 5 }),
          getPeakTimeAnalysis({ groupBy: 'hour' }),
          getFusionStatistics(),
          getStatusOverview()
        ]);

        setKpi(kpiData);
        setDistribution(distData);
        setHotspots(hostspotData);
        setPeakTime(peakData);
        setFusion(fusionData);
        setStatusData(statusOverview);
      } catch (error) {
        console.error("Failed to load analytics data", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-neutral-400 animate-pulse font-medium">Analyzing TU Pulse data...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Intelligence Analytics</h1>
        <p className="text-neutral-500 text-sm">System performance and incident distribution overview</p>
      </div>

      {kpi && (
        <KPIStats 
          totalReports={kpi.totalReports}
          totalIncidents={kpi.totalIncidents}
          fusionRate={kpi.fusionRate}
          resolvedRate={kpi.resolvedRate}
          avgResponse={kpi.avgResponseMinutes}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DistributionChart data={distribution} />
        <StatusOverview data={statusData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <PeakTimeChart data={peakTime} type="hour" />
        </div>
        {fusion && <FusionStats data={fusion} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <HotspotList hotspots={hotspots} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100">
           <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider mb-6">Spatial Intelligence Map</h3>
           <div className="w-full h-[300px] bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden relative">
              {/* Map Placeholder with visual cues */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-size-[20px_20px]" />
              <div className="text-neutral-400 text-xs text-center z-10">
                <p className="font-bold mb-1">GEOSPATIAL CLUSTERING ACTIVE</p>
                <p>Interactive Map Module — Analyzing {hotspots.length} major hotspots</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}