// app/(dashboard)/analytics/page.tsx

import StatusOverview from "@/components/analytics/statusoverview";

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <StatusOverview />
    </div>
  );
}