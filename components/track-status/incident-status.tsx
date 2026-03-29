// components/track-status/incident-status.tsx

import React from "react";
import { BellIcon, CheckIcon, ClockIcon } from "./icons";

type StatusStep = "Submitted" | "Analyzed" | "Routed" | "In progress" | "Resolved";

interface IncidentStatusData {
  incidentType: string;
  status: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  assignedUnit: string;
  lastUpdatedTime: string;
  currentStep: StatusStep;
}

interface IncidentStatusProps {
  data?: IncidentStatusData;
}

const defaultData: IncidentStatusData = {
  incidentType: "Water Leak",
  status: "In Progress",
  severity: "Medium",
  assignedUnit: "Facilities Mgmt.",
  lastUpdatedTime: "Today, 15:10",
  currentStep: "In progress",
};

const STEPS: StatusStep[] = ["Submitted", "Analyzed", "Routed", "In progress", "Resolved"];

const severityColor: Record<string, string> = {
  Low: "#4caf50",
  Medium: "#FF7728",
  High: "#f44336",
  Critical: "#9c27b0",
};

const IncidentStatus: React.FC<IncidentStatusProps> = ({ data = defaultData }) => {
  const currentIndex = STEPS.indexOf(data.currentStep);

  return (
    <div className="mx-4 my-2 rounded-[10px] bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <p className="mb-2.5 text-[12px] font-bold tracking-[0.5px] text-[#222]">INCIDENT STATUS</p>
      <table className="w-full border-collapse">
        <tbody>
          <Row label="Incident type :">
            <span className="font-medium text-[#283DFF]">{data.incidentType}</span>
          </Row>
          <Row label="Status :">
            <span className="font-medium text-[#FF7728]">{data.status}</span>
          </Row>
          <Row label="Severity :">
            <span style={{ color: severityColor[data.severity] ?? "#ff9800" }} className="font-medium">
              {data.severity}
            </span>
          </Row>
          <Row label="Assigned unit :">
            <span className="text-[#333]">{data.assignedUnit}</span>
          </Row>
          <Row label="Last updated time :">
            <span className="text-[#333]">{data.lastUpdatedTime}</span>
          </Row>
        </tbody>
      </table>

      <p className="mt-4 mb-2.5 text-[12px] font-bold tracking-[0.5px] text-[#222]">STATUS TIMELINE</p>
      <div className="relative flex items-start justify-between pt-1">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={step} className="relative flex flex-1 flex-col items-center">
              {index > 0 && (
                <div
                  className="absolute top-4 -left-1/2 z-0 h-0.5 w-full"
                  style={{
                    backgroundColor: isDone || isCurrent ? "#4CAF50" : "#ddd",
                  }}
                />
              )}

              <div
                className="relative z-1 flex h-8.5 w-8.5 items-center justify-center rounded-full"
                style={{
                  backgroundColor: isDone
                    ? "#4CAF50"
                    : isCurrent
                    ? "#FF7728"
                    : "#e0e0e0",
                }}
              >
                {isDone && <CheckIcon />}
                {isCurrent && <BellIcon />}
                {isPending && <ClockIcon />}
              </div>

              <span
                className="mt-1.25 text-center text-[10px]"
                style={{
                  color: isPending ? "#aaa" : "#333",
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <tr>
    <td className="whitespace-nowrap pb-1.5 pr-2 align-middle text-[13px] text-[#555]">{label}</td>
    <td className="pb-1.5 align-middle text-[13px]">{children}</td>
  </tr>
);

export default IncidentStatus;
