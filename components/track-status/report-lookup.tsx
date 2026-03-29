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
    <div style={styles.card}>
      <p style={styles.sectionTitle}>REPORT LOOKUP</p>
      <table style={styles.table}>
        <tbody>
          <Row label="Report ID :">
            <span style={styles.linkText}>{data.reportId}</span>
          </Row>
          <Row label="Submission time :">
            <span style={styles.normalText}>{data.submissionTime}</span>
          </Row>
          <Row label="Submitted location :">
            <span style={styles.normalText}>{data.submittedLocation}</span>
          </Row>
          <Row label="Linked incident ID :">
            <span style={styles.linkText}>{data.linkedIncidentId}</span>
          </Row>
          <Row label="Merge result :">
            <span style={styles.mergeText}>{data.mergeResult}</span>
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
    <td style={styles.labelCell}>{label}</td>
    <td style={styles.valueCell}>{children}</td>
  </tr>
);

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: "#fff",
    margin: "8px 16px",
    borderRadius: "10px",
    padding: "14px 16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "10px",
    letterSpacing: "0.5px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  labelCell: {
    fontSize: "13px",
    color: "#555",
    paddingBottom: "6px",
    paddingRight: "8px",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  },
  valueCell: {
    fontSize: "13px",
    paddingBottom: "6px",
    verticalAlign: "middle",
  },
  normalText: {
    color: "#333",
  },
  linkText: {
    color: "#283DFF",
    fontWeight: "500",
  },
  mergeText: {
    color: "#146F35",
    fontWeight: "600",
  },
};

export default ReportLookup;
