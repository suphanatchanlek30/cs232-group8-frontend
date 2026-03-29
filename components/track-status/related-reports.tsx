// components/track-status/related-reports.tsx

import React, { useState } from "react";
import { ChevronDownIcon } from "./icons";

interface RelatedReport {
  id: string;
  title?: string;
  submittedAt?: string;
  location?: string;
}

interface RelatedReportsProps {
  sections?: {
    label: string;
    reports: RelatedReport[];
  }[];
}

const defaultSections = [
  {
    label: "1 related reports",
    reports: [
      { id: "#RP-2025-0381", title: "Water leak near elevator", submittedAt: "Today, 13:45", location: "อาคาร SC" },
    ],
  },
];

const RelatedReports: React.FC<RelatedReportsProps> = ({ sections = defaultSections }) => {
  return (
    <div className="mx-4 my-2 flex flex-col gap-2">
      {sections.map((section, idx) => (
        <CollapsibleSection key={idx} label={section.label} reports={section.reports} />
      ))}
    </div>
  );
};

const CollapsibleSection: React.FC<{ label: string; reports: RelatedReport[] }> = ({
  label,
  reports,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <button
        className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3.5"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-[14px] font-semibold text-[#333]">{label}</span>
        <ChevronDownIcon open={open} />
      </button>

      {open && (
        <div className="flex flex-col gap-2.5 border-t border-[#f0f0f0] px-4 py-2.5">
          {reports.map((report) => (
            <div key={report.id} className="border-b border-[#f5f5f5] pb-2">
              <div className="text-[13px] font-semibold text-[#e05c2a]">{report.id}</div>
              {report.title && <div className="mt-0.5 text-[13px] text-[#333]">{report.title}</div>}
              <div className="mt-0.5 text-[12px] text-[#999]">
                {report.submittedAt && <span>{report.submittedAt}</span>}
                {report.location && <span> · {report.location}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedReports;
