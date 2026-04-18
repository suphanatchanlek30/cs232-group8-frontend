"use client";

import React from 'react';
import { FileText, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface Report {
  reportId: string;
  trackingCode: string;
  reportText: string;
  submittedAt?: string;
  createdAt: string;
  attachments?: { fileUrl: string }[];
}

export function RelatedReportsList({ reports }: { reports: Report[] }) {
  if (!reports || reports.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-indigo-600" />
        Linked Reports ({reports.length})
      </h3>

      <div className="space-y-3">
        {reports.map((report) => (
          <div key={report.reportId} className="bg-white border border-neutral-100 rounded-2xl p-4 flex items-center justify-between hover:border-indigo-100 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-800">{report.trackingCode}</p>
                <p className="text-xs text-neutral-500 line-clamp-1 max-w-[300px]">{report.reportText}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-full">
                {new Date(report.submittedAt || report.createdAt).toLocaleDateString('th-TH')}
              </span>
              <button className="p-2 text-neutral-400 hover:text-indigo-600 transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EvidenceGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-neutral-800 text-sm tracking-wide uppercase flex items-center gap-2 mb-4">
        <ImageIcon className="w-4 h-4 text-indigo-600" />
        Evidence Gallery
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:ring-2 hover:ring-indigo-500/20 transition-all cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="Evidence" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
