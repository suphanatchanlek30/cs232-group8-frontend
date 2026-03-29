import React, { useState } from "react";

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
    <div style={styles.wrapper}>
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
    <div style={styles.card}>
      <button style={styles.header} onClick={() => setOpen((o) => !o)}>
        <span style={styles.headerText}>{label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={styles.reportList}>
          {reports.map((report) => (
            <div key={report.id} style={styles.reportItem}>
              <div style={styles.reportId}>{report.id}</div>
              {report.title && <div style={styles.reportTitle}>{report.title}</div>}
              <div style={styles.reportMeta}>
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

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    margin: "8px 16px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  headerText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  reportList: {
    borderTop: "1px solid #f0f0f0",
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  reportItem: {
    paddingBottom: "8px",
    borderBottom: "1px solid #f5f5f5",
  },
  reportId: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#e05c2a",
  },
  reportTitle: {
    fontSize: "13px",
    color: "#333",
    marginTop: "2px",
  },
  reportMeta: {
    fontSize: "12px",
    color: "#999",
    marginTop: "2px",
  },
};

export default RelatedReports;
