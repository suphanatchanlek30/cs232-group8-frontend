"use client";

import React, { useState, useEffect } from 'react';
import { 
  updateIncidentStatus, 
  assignIncidentUnit, 
  resolveIncident,
  getDashboardMetadata,
  DashboardMetadata
} from '@/services/dashboard.service';
import { Send, CheckCircle } from 'lucide-react';

interface IncidentActionPanelProps {
  incidentId: string;
  currentStatus: string;
  currentUnitId: string | undefined;
  onUpdate: () => void;
}

export function IncidentActionPanel({ 
  incidentId, 
  currentStatus, 
  currentUnitId,
  onUpdate 
}: IncidentActionPanelProps) {
  const [status, setStatus] = useState(currentStatus);
  const [unitId, setUnitId] = useState(currentUnitId || '');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<DashboardMetadata | null>(null);

  // Sync state with props when incident data refreshes
  useEffect(() => {
    setStatus(currentStatus);
    setUnitId(currentUnitId || '');
  }, [currentStatus, currentUnitId]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getDashboardMetadata();
        setMetadata(data);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    };
    fetchMetadata();
  }, []);

  const handleUpdateStatus = async () => {
    try {
      setLoading(true);
      await updateIncidentStatus(incidentId, status, note);
      onUpdate();
      setNote('');
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignUnit = async () => {
    try {
      setLoading(true);
      await assignIncidentUnit(incidentId, unitId, note);
      onUpdate();
      setNote('');
    } catch (error) {
      console.error("Failed to assign unit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async () => {
    if (!note) {
      alert("Please provide a resolution summary.");
      return;
    }
    try {
      setLoading(true);
      await resolveIncident(incidentId, note);
      alert("ปิดงานสำเร็จ!");
      onUpdate();
      setNote('');
    } catch (error) {
      console.error("Failed to resolve incident:", error);
      alert("เกิดข้อผิดพลาดในการปิดงาน");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 space-y-6">
      <h3 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase flex items-center gap-2">
        <Send className="w-4 h-4 text-indigo-600" />
        แผงอัปเดตสถานะ
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">สถานะ</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-10 px-3 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
          >
            {metadata?.statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            )) || (
              <option value={currentStatus}>{currentStatus}</option>
            )}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">หน่วยงาน</label>
          <select 
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
            className="w-full h-10 px-3 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
          >
            <option value="">-- เลือกหน่วยงาน --</option>
            {metadata?.units.map(unit => (
              <option key={unit.unitId} value={unit.unitId}>{unit.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">หมายเหตุ</label>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="ใส่เหตุผลหรือบันทึกภายใน..."
            className="w-full h-24 p-3 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={handleUpdateStatus}
            disabled={loading}
            className="h-10 bg-indigo-600 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            บันทึกการอัปเดต
          </button>
          <button 
            onClick={handleAssignUnit}
            disabled={loading}
            className="h-10 bg-white text-neutral-700 border border-neutral-200 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
          >
            มอบหมายงาน
          </button>
        </div>

        <button 
          onClick={handleResolve}
          disabled={loading || currentStatus === 'RESOLVED'}
          className="w-full h-11 bg-emerald-600 text-white rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-2 shadow-md shadow-emerald-200"
        >
          <CheckCircle className="w-4 h-4" />
          ปิดงาน
        </button>
      </div>
    </div>
  );
}
