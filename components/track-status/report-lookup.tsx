// components/track-status/report-lookup.tsx

import React from "react";

interface ReportLookupData {
  reportId: string;
  submissionTime: string;
  submittedLocation: string;
  linkedIncidentId: string;
  mergeResult: string;
}

interface ReportLookupProps {
  data?: ReportLookupData;
}

const defaultData: ReportLookupData = {
  reportId: "#RP-2025-0385",
  submissionTime: "Today, 14:32",
  submittedLocation: "อาคาร SC",
  linkedIncidentId: "#INC-0005",
  mergeResult: "Merged",
};

const ReportLookup: React.FC<ReportLookupProps> = ({ data = defaultData }) => {
  return (
    <div className="mx-4 my-2 rounded-[10px] bg-white px-4 py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <p className="mb-2.5 text-[12px] font-bold tracking-[0.5px] text-[#222]">REPORT LOOKUP</p>
      <table className="w-full border-collapse">
        <tbody>
          <Row label="Report ID :">
            <span className="font-medium text-[#283DFF]">{data.reportId}</span>
          </Row>
          <Row label="Submission time :">
            <span className="text-[#333]">{data.submissionTime}</span>
          </Row>
          <Row label="Submitted location :">
            <span className="text-[#333]">{data.submittedLocation}</span>
          </Row>
          <Row label="Linked incident ID :">
            <span className="font-medium text-[#283DFF]">{data.linkedIncidentId}</span>
          </Row>
          <Row label="Merge result :">
            <span className="font-semibold text-[#146F35]">{data.mergeResult}</span>
          </Row>
        </tbody>
      </table>
    </div>
  );
};

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <tr>
    <td className="whitespace-nowrap pb-1.5 pr-2 align-middle text-[13px] text-[#555]">{label}</td>
    <td className="pb-1.5 align-middle text-[13px]">{children}</td>
  </tr>
);

export default ReportLookup;
