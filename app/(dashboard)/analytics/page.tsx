// app/(dashboard)/analytics/page.tsx

import KpiSummary from "@/components/analytics/kpisummary";
import IncidentTypeDistribution from "@/components/analytics/incidenttypedistribution";
import HotspotLocations from "@/components/analytics/hotspotlocation";
import PeakTimeAnalysis from "@/components/analytics/peaktime";
import StatusOverview from "@/components/analytics/statusoverview";

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <KpiSummary />
      <div className="grid grid-cols-2 gap-6">
        <IncidentTypeDistribution />
        <HotspotLocations />
      </div>
      <PeakTimeAnalysis />
      <StatusOverview />
    </div>
  );
}