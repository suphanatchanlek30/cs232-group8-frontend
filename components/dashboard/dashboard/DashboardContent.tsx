"use client";

import { useEffect, useState } from 'react';
import {
  EXTRA_FILTERS,
  STATUS_FILTERS,
} from './constants';
import { DashboardFilters } from './dashboard-filters';
import { DashboardStats } from './dashboard-stats';
import { IncidentsTable } from './incidents-table';
import { PriorityQueue } from './priority-queue';
import { getDashboardSummary, getIncidents, resolveIncident } from '@/services/dashboard.service';
import type { DashboardStat, IncidentRow, PriorityIncident } from './types';

// Map API Severity to Color
const getSeverityColor = (severity: string | null) => {
  if (severity === "CRITICAL") return "text-purple-600 bg-purple-50 px-2 py-1 rounded-md text-xs";
  if (severity === "HIGH") return "text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs";
  if (severity === "MEDIUM") return "text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md text-xs";
  return "text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs";
};

const mapStatusLabel = (status: string | null) => {
  if (!status) return "New";
  const map: Record<string, string> = {
    NEW: "New",
    IN_REVIEW: "Under review",
    IN_PROGRESS: "In progress",
    RESOLVED: "Resolved",
  };
  return map[status] || status;
};

export default function DashboardContent() {
  const [stats, setStats] = useState<DashboardStat[]>([
    { label: 'Total Open', value: '...' },
    { label: 'High Severity', value: '...' },
    { label: 'Under review', value: '...' },
    { label: 'Resolved Today', value: '...' },
    { label: 'New', value: '...' },
  ]);
  
  const [incidents, setIncidents] = useState<IncidentRow[]>([]);
  const [priorityQueue, setPriorityQueue] = useState<PriorityIncident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch Summary
      const summary = await getDashboardSummary();
      setStats([
        { label: 'Total Open', value: summary.totalIncidents.toString() },
        { label: 'High Severity', value: summary.highSeverityCount.toString() },
        { label: 'Under review', value: summary.inReviewCount.toString() },
        { label: 'Resolved', value: summary.resolvedCount.toString() },
        { label: 'New', value: summary.newCount.toString() },
      ]);

      // Fetch Incidents
      const incidentsData = await getIncidents({ pageSize: 50 });
      const mappedIncidents: IncidentRow[] = incidentsData.items.map((inc) => {
        let latestTime = "-";
        if (inc.latestReportTime) {
          const d = new Date(inc.latestReportTime);
          latestTime = `${d.getHours().toString().padStart(2, "0")}.${d.getMinutes().toString().padStart(2, "0")} น.`;
        }

        return {
          id: inc.incidentId,
          code: inc.incidentCode,
          type: inc.incidentType || "Unknown",
          severity: inc.severity || "LOW",
          severityColor: getSeverityColor(inc.severity),
          confidence: "N/A", 
          status: mapStatusLabel(inc.status),
          unit: inc.assignedUnitName || "Unassigned",
          reports: inc.reportCount ? `${inc.reportCount} reports` : "-",
          latest: latestTime,
        };
      });

      setIncidents(mappedIncidents);

      // Create Priority Queue (High/Critical severity incidents)
      const highPriority = incidentsData.items
        .filter(inc => inc.severity === "HIGH" || inc.severity === "CRITICAL")
        .map(inc => ({
          id: inc.incidentId,
          title: inc.incidentType || "Unknown",
          details: `${inc.assignedUnitName || "Unassigned"} · ${inc.reportCount || 0} reports`,
          severity: inc.severity || "HIGH",
        }))
        .slice(0, 5); // Take top 5

      setPriorityQueue(highPriority);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickResolve = async (id: string) => {
    console.log("Resolving incident:", id);
    const summary = window.prompt("กรุณาระบุสรุปการแก้ไขเหตุการณ์ (Resolution Summary):", "ดำเนินการแก้ไขเรียบร้อยแล้ว");
    
    if (summary === null) return; 

    try {
      setLoading(true);
      const result = await resolveIncident(id, summary);
      console.log("Resolve result:", result);
      alert("ปิดงานสำเร็จ!");
      await fetchData(); // Force re-fetch
    } catch (error) {
      console.error("Failed to resolve incident:", error);
      alert("เกิดข้อผิดพลาดในการปิดงาน: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardStats stats={stats} />

      <DashboardFilters
        statusFilters={STATUS_FILTERS}
        extraFilters={EXTRA_FILTERS}
        activeStatusIndex={0}
      />

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading dashboard data...</div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <IncidentsTable incidents={incidents} onResolve={handleQuickResolve} />
          <PriorityQueue items={priorityQueue} />
        </div>
      )}
    </div>
  );
}