"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, MapPin } from 'lucide-react';
import { 
  getIncidentDetail, 
  getIncidentTimeline, 
  getFusionExplanation, 
  getScoringExplanation,
  getIncidentReports,
  getDashboardMetadata,
  IncidentItem,
  TimelineEntry,
  DashboardMetadata
} from '@/services/dashboard.service';
import { IntelligencePanel } from '@/components/dashboard/incident-detail/intelligence-panel';
import { IncidentTimeline } from '@/components/dashboard/incident-detail/incident-timeline';
import { IncidentActionPanel } from '@/components/dashboard/incident-detail/incident-action-panel';
import { RelatedReportsList, EvidenceGallery } from '@/components/dashboard/incident-detail/related-content';

interface FusionData {
  explanationText: string;
  matchRules: Record<string, boolean | number | null>;
  mergedReports: number;
}

interface ScoringData {
  severity: string;
  confidence: string;
  incidentType: string;
  severityReason: string;
  confidenceFactors: { factor: string; score: number }[];
}

export default function IncidentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const incidentId = params.id as string;

  const [incident, setIncident] = useState<IncidentItem | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [fusion, setFusion] = useState<FusionData | null>(null);
  const [scoring, setScoring] = useState<ScoringData | null>(null);
  const [reports, setReports] = useState<{ reportId: string; trackingCode: string; reportText: string; submittedAt?: string; createdAt: string; attachments?: { fileUrl: string }[] }[]>([]);
  const [metadata, setMetadata] = useState<DashboardMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  const getStatusLabel = (val: string) => {
    return metadata?.statusOptions.find((o: { value: string; label: string }) => o.value === val)?.label || val;
  };

  const loadData = useCallback(async () => {
    try {
      const [inc, tm, fs, sc, rpt, meta] = await Promise.all([
        getIncidentDetail(incidentId),
        getIncidentTimeline(incidentId),
        getFusionExplanation(incidentId),
        getScoringExplanation(incidentId),
        getIncidentReports(incidentId),
        getDashboardMetadata()
      ]);

      setIncident(inc);
      setTimeline(tm.timeline);
      setFusion(fs);
      setScoring(sc);
      setReports(rpt.items);
      setMetadata(meta);
    } catch (error) {
      console.error("Failed to load incident data:", error);
    } finally {
      setLoading(false);
    }
  }, [incidentId]);

  useEffect(() => {
    if (incidentId) loadData();
  }, [incidentId, loadData]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!incident) return <div className="p-8 text-center text-neutral-500">Incident not found</div>;

  return (
    <div className="p-6 lg:p-8 w-full space-y-8 pb-20">
      {/* Header & Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-100 pb-8">
        <div>
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 transition-colors text-[11px] font-bold uppercase tracking-widest mb-4 group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Incident Dashboard
          </button>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
              Incident ID: {incident.incidentCode}
            </span>
            <h1 className="text-4xl font-bold text-neutral-900 tracking-tight leading-none">
              {incident.incidentType.replace(/_/g, ' ')}
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
              incident.severity === 'HIGH' ? 'bg-red-50 border-red-100 text-red-600' : 
              incident.severity === 'MEDIUM' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {incident.severity} Severity
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-indigo-50 border-indigo-100 text-indigo-600">
              Confidence {incident.confidenceScore}%
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
              incident.status === 'RESOLVED' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {getStatusLabel(incident.status)}
            </span>
            {incident.assignedUnitName && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-neutral-50 border-neutral-100 text-neutral-500">
                {incident.assignedUnitName}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 text-right">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Last updated</span>
          <span className="text-sm font-medium text-neutral-600">
            {new Date(incident.latestReportTime || '').toLocaleString('th-TH')}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100">
            <h3 className="font-semibold mb-6 text-neutral-800 text-sm tracking-wide uppercase">AI Insight Summary</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-sm text-neutral-700 leading-relaxed font-medium bg-neutral-50 p-5 rounded-2xl border border-neutral-100 italic">
                  &quot;{incident.summary || 'Analytical synthesis of incident data is in progress. Preliminary assessment indicates localized impact with multiple verifying sources.'}&quot;
                </p>
                
                <div className="flex gap-4">
                  <div className="mt-1 text-indigo-500 bg-indigo-50 p-2 rounded-lg"><MapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Impact Location</p>
                    <p className="text-sm font-bold text-neutral-800">{incident.locationName || 'Main Campus Area'}</p>
                    {incident.locationNote && <p className="text-xs text-neutral-500 mt-0.5">{incident.locationNote}</p>}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-l border-neutral-100 pl-10">
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">First Reported</p>
                  <p className="text-sm font-bold text-neutral-800">
                    {incident.firstReportTime ? new Date(incident.firstReportTime).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Latest Update</p>
                  <p className="text-sm font-bold text-neutral-800">
                    {incident.latestReportTime ? new Date(incident.latestReportTime).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-neutral-50 p-3 rounded-xl">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase mb-1">Reports</p>
                    <p className="text-sm font-bold text-neutral-800">{incident.reportCount}</p>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-xl">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase mb-1">Photos</p>
                    <p className="text-sm font-bold text-neutral-800">{incident.evidenceCount || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intelligence Section */}
          <IntelligencePanel fusion={fusion} scoring={scoring} />

          {/* Reports List */}
          <RelatedReportsList reports={reports} />

          {/* Evidence Grid */}
          <EvidenceGallery images={reports.flatMap(r => r.attachments || []).map(a => a.fileUrl)} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8 sticky top-24">
          <IncidentActionPanel 
            incidentId={incidentId} 
            currentStatus={incident.status}
            currentUnitId={incident.assignedUnitId}
            onUpdate={loadData}
          />
          
          <IncidentTimeline timeline={timeline} />
          
          <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
            <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Quick Facts</h4>
            <div className="space-y-3">
              {[
                { label: 'Incident Type', value: incident.incidentType.replace(/_/g, ' ') },
                { label: 'Merged Reports', value: fusion?.mergedReports || incident.reportCount },
                { label: 'Assigned Unit', value: incident.assignedUnitName || 'Waiting Routing' },
                { label: 'System Created', value: 'Yes (AI Cluster)' }
              ].map((fact, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0">
                  <span className="text-xs text-neutral-500">{fact.label}</span>
                  <span className="text-xs font-bold text-neutral-800">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

