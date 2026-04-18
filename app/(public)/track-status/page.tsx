// app/(public)/track-status/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  IncidentStatus,
  RelatedReports,
  ReportLookup,
  SearchBar,
  TrackHeader,
} from "@/components/track-status";
import AuthGuard from "@/components/AuthGuard";
import {
  getMyReports,
  getTrackingInfo,
  getReportDetail,
  ReportItem,
} from "@/services/track-status.service";

// Format date helper
const formatDate = (isoString: string) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const mapSeverity = (severity: string | null): "Low" | "Medium" | "High" | "Critical" => {
  if (!severity) return "Low";
  const map: Record<string, "Low" | "Medium" | "High" | "Critical"> = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: "Critical",
  };
  return map[severity] || "Low";
};

const mapStatusToStep = (status: string | null): "Submitted" | "Analyzed" | "Routed" | "In progress" | "Resolved" => {
  if (!status) return "Submitted";
  const map: Record<string, "Submitted" | "Analyzed" | "Routed" | "In progress" | "Resolved"> = {
    SUBMITTED: "Submitted",
    NEW: "Submitted",
    IN_REVIEW: "Analyzed",
    IN_PROGRESS: "In progress",
    RESOLVED: "Resolved",
  };
  return map[status] || "Submitted";
};

const mapStatusLabel = (status: string | null): string => {
  if (!status) return "Submitted";
  const map: Record<string, string> = {
    SUBMITTED: "Submitted",
    NEW: "Submitted",
    IN_REVIEW: "In Review",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    LINKED_TO_INCIDENT: "Merged",
  };
  return map[status] || status;
};

interface ReportData {
  reportId: string;
  submissionTime: string;
  submittedLocation: string;
  linkedIncidentId: string;
  mergeResult: string;
}

interface IncidentData {
  incidentType: string;
  status: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  assignedUnit: string;
  lastUpdatedTime: string;
  currentStep: "Submitted" | "Analyzed" | "Routed" | "In progress" | "Resolved";
}

export default function TrackPage() {
  const [myReports, setMyReports] = useState<ReportItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [trackingCode, setTrackingCode] = useState("");
  const [loadingDetail, setLoadingDetail] = useState(false);
  
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [incidentData, setIncidentData] = useState<IncidentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      setLoadingList(true);
      const data = await getMyReports(1, 50);
      setMyReports(data.items);
    } catch (err: unknown) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoadingList(false);
    }
  };

  const handleSearch = async (code: string) => {
    if (!code) {
      setTrackingCode("");
      setReportData(null);
      setIncidentData(null);
      setError(null);
      return;
    }

    setTrackingCode(code);
    setLoadingDetail(true);
    setError(null);

    try {
      // 1. Get tracking info
      const tracking = await getTrackingInfo(code);
      
      // 2. Get report detail using reportId from tracking info
      let reportDet;
      if (tracking.reportId) {
        reportDet = await getReportDetail(tracking.reportId);
      }
      
      // Timeline is not used in UI component yet, skipping fetch

      // Map to component expected formats
      setReportData({
        reportId: reportDet?.reportId || "-",
        submissionTime: formatDate(reportDet?.submittedAt || ""),
        submittedLocation: "Unknown", // Assuming location mapping isn't directly in reportDet right now
        linkedIncidentId: tracking.incidentId || "-",
        mergeResult: reportDet?.linkedIncidentId ? "Merged" : "Pending",
      });

      setIncidentData({
        incidentType: tracking.incidentType || "Unknown",
        status: mapStatusLabel(tracking.status),
        severity: mapSeverity(tracking.severity),
        assignedUnit: tracking.assignedUnit || "Unassigned",
        lastUpdatedTime: formatDate(tracking.latestUpdatedAt),
        currentStep: mapStatusToStep(tracking.status),
      });

    } catch (err: unknown) {
      console.error("Tracking search error:", err);
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Not found or error occurred");
      setReportData(null);
      setIncidentData(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 pb-10">
        <TrackHeader />
        <div className="mx-auto w-full max-w-md pt-4">
          <SearchBar onSearch={handleSearch} placeholder="Enter Tracking Code (e.g. TP-...)" />
          
          {error && (
            <div className="mx-4 my-2 rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loadingDetail && (
            <div className="my-8 text-center text-gray-500">Loading tracking detail...</div>
          )}

          {!loadingDetail && trackingCode && reportData && incidentData && (
            <div className="mt-4 flex flex-col gap-4">
              <ReportLookup data={reportData} />
              <IncidentStatus data={incidentData} />
              <RelatedReports sections={[
                {
                  label: "1 related reports",
                  reports: [
                    {
                      id: reportData.reportId,
                      title: "Your Report",
                      submittedAt: reportData.submissionTime,
                    }
                  ]
                }
              ]} />
              
              <div className="px-4 mt-2">
                <button 
                  onClick={() => setTrackingCode("")}
                  className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-gray-700 shadow-sm border border-gray-200"
                >
                  Back to My Reports
                </button>
              </div>
            </div>
          )}

          {!trackingCode && !loadingDetail && (
            <div className="mt-4 px-4">
              <h2 className="mb-3 ml-1 text-sm font-bold tracking-wide text-gray-700 uppercase">My Recent Reports</h2>
              
              {loadingList ? (
                <div className="text-center text-gray-500 text-sm mt-4">Loading reports...</div>
              ) : myReports.length === 0 ? (
                <div className="text-center text-gray-500 text-sm mt-8 p-6 bg-white rounded-xl shadow-sm">
                  You haven&apos;t submitted any reports yet.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {myReports.map((item) => (
                    <div 
                      key={item.reportId} 
                      onClick={() => handleSearch(item.trackingCode)}
                      className="cursor-pointer rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-gray-200 transition-all active:scale-[0.98]"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-blue-600 text-sm">{item.trackingCode}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          item.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 
                          item.status === 'LINKED_TO_INCIDENT' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {mapStatusLabel(item.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-2">{item.reportText || "No description"}</p>
                      <div className="mt-2 text-xs text-gray-400 flex justify-between">
                        <span>{formatDate(item.submittedAt)}</span>
                        {item.candidateIncidentType && <span>{item.candidateIncidentType}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}