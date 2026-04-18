// app/(dashboard)/incident-detail/page.tsx

import EscalationInfo from "@/components/incident-detail/escalationInfo";
import ActionTimeline from "@/components/incident-detail/actiontimeline";

export default function SomePage() {
  return (
    <div className="p-6 space-y-6">
      <EscalationInfo />
      <ActionTimeline />
    </div>
  );
}