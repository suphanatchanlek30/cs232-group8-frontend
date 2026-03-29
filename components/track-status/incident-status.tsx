import React from "react";

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
    <div style={styles.card}>
      {/* Incident Info */}
      <p style={styles.sectionTitle}>INCIDENT STATUS</p>
      <table style={styles.table}>
        <tbody>
          <Row label="Incident type :">
            <span style={styles.linkText}>{data.incidentType}</span>
          </Row>
          <Row label="Status :">
            <span style={styles.inProgressText}>{data.status}</span>
          </Row>
          <Row label="Severity :">
            <span style={{ color: severityColor[data.severity] ?? "#ff9800", fontWeight: "500" }}>
              {data.severity}
            </span>
          </Row>
          <Row label="Assigned unit :">
            <span style={styles.normalText}>{data.assignedUnit}</span>
          </Row>
          <Row label="Last updated time :">
            <span style={styles.normalText}>{data.lastUpdatedTime}</span>
          </Row>
        </tbody>
      </table>

      {/* Timeline */}
      <p style={{ ...styles.sectionTitle, marginTop: "16px" }}>STATUS TIMELINE</p>
      <div style={styles.timeline}>
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={step} style={styles.stepWrapper}>
              {/* Connector line */}
              {index > 0 && (
                <div
                  style={{
                    ...styles.connector,
                    backgroundColor: isDone || isCurrent ? "#4CAF50" : "#ddd",
                  }}
                />
              )}

              {/* Circle icon */}
              <div
                style={{
                  ...styles.circle,
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

              {/* Label */}
              <span
                style={{
                  ...styles.stepLabel,
                  color: isPending ? "#aaa" : "#333",
                  fontWeight: isCurrent ? "600" : "400",
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
    <td style={styles.labelCell}>{label}</td>
    <td style={styles.valueCell}>{children}</td>
  </tr>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
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
  normalText: { color: "#333" },
  linkText: { color: "#283DFF", fontWeight: "500" },
  inProgressText: { color: "#FF7728", fontWeight: "500" },
  timeline: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    position: "relative",
    paddingTop: "4px",
  },
  stepWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  connector: {
    position: "absolute",
    top: "16px",
    left: "-50%",
    width: "100%",
    height: "2px",
    zIndex: 0,
  },
  circle: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "relative",
  },
  stepLabel: {
    fontSize: "10px",
    marginTop: "5px",
    textAlign: "center",
  },
};

export default IncidentStatus;
